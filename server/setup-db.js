/**
 * One-time setup: creates the rissmewaitlistdb database and the waitlist
 * table. Safe to re-run — everything is CREATE IF NOT EXISTS / idempotent.
 *
 * Usage:  node server/setup-db.js
 */
import 'dotenv/config'
import pg from 'pg'

const { Client } = pg

const { DB_HOST = 'localhost', DB_PORT = 5432, DB_USER = 'postgres', DB_PASSWORD = '' } = process.env

// Connect to the default 'postgres' database first so we can create our DB.
async function run() {
  const admin = new Client({
    host: DB_HOST, port: Number(DB_PORT),
    user: DB_USER, password: DB_PASSWORD,
    database: 'postgres',
  })

  await admin.connect()
  console.log('Connected to postgres')

  // Create database (fails silently if it already exists)
  const exists = await admin.query(
    `SELECT 1 FROM pg_database WHERE datname = $1`, ['rissmewaitlistdb']
  )
  if (exists.rowCount === 0) {
    await admin.query(`CREATE DATABASE rissmewaitlistdb`)
    console.log('Created database: rissmewaitlistdb')
  } else {
    console.log('Database rissmewaitlistdb already exists — skipping create')
  }
  await admin.end()

  // Now connect to rissmewaitlistdb and create the table
  const db = new Client({
    host: DB_HOST, port: Number(DB_PORT),
    user: DB_USER, password: DB_PASSWORD,
    database: 'rissmewaitlistdb',
  })
  await db.connect()

  await db.query(`
    CREATE TABLE IF NOT EXISTS waitlist (
      id         SERIAL PRIMARY KEY,
      email      VARCHAR(255) UNIQUE NOT NULL,
      joined_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      source     VARCHAR(100)
    )
  `)
  console.log('Table waitlist is ready')

  // Migrate any existing CSV rows into the DB
  const { default: fs } = await import('fs')
  const { default: path } = await import('path')
  const { fileURLToPath } = await import('url')
  const __dirname = path.dirname(fileURLToPath(import.meta.url))
  const csvPath = path.join(__dirname, 'data', 'waitlist.csv')

  if (fs.existsSync(csvPath)) {
    const lines = fs.readFileSync(csvPath, 'utf8').split('\n').slice(1).filter(Boolean)
    let migrated = 0
    for (const line of lines) {
      const [email, joined_at] = line.split(',')
      if (!email) continue
      try {
        await db.query(
          `INSERT INTO waitlist (email, joined_at, source)
           VALUES ($1, $2, 'csv_migration')
           ON CONFLICT (email) DO NOTHING`,
          [email.trim(), joined_at ? joined_at.trim() : new Date().toISOString()]
        )
        migrated++
      } catch { /* skip bad rows */ }
    }
    if (migrated) console.log(`Migrated ${migrated} row(s) from waitlist.csv`)
  }

  await db.end()
  console.log('\nSetup complete. Run: npm run server')
}

run().catch(err => { console.error(err); process.exit(1) })
