import { Routes, Route, Link } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Features from './pages/Features'
import Safety from './pages/Safety'
import Premium from './pages/Premium'
import About from './pages/About'
import Download from './pages/Download'
import { Button } from './components/ui'
import { Heart, FloatingBlobs } from './components/Decor'
import { HeartCrack } from 'lucide-react'

function NotFound() {
  return (
    <section className="relative grid min-h-[70vh] place-items-center overflow-hidden dreamy-bg px-5 text-center">
      <FloatingBlobs />
      <div className="relative">
        <p className="font-display text-8xl font-semibold text-gradient sm:text-9xl">404</p>
        <h1 className="mt-4 inline-flex items-center gap-2 font-display text-3xl font-semibold text-mist-100 sm:text-4xl">
          this page got left on read <HeartCrack className="h-6 w-6 text-blush-300" />
        </h1>
        <p className="mx-auto mt-4 max-w-md text-lg text-mist-300/85">
          The match you’re looking for doesn’t exist (or unmatched you). Let’s get you back to the good stuff.
        </p>
        <div className="mt-8 flex justify-center">
          <Button to="/">
            <Heart className="h-4 w-4" /> Take me home
          </Button>
        </div>
      </div>
    </section>
  )
}

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/safety" element={<Safety />} />
        <Route path="/premium" element={<Premium />} />
        <Route path="/about" element={<About />} />
        <Route path="/download" element={<Download />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  )
}
