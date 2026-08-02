import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Layout from './components/Layout'
import Preloader from './components/ui/Preloader'
import Home from './pages/Home'
import Features from './pages/Features'
import Safety from './pages/Safety'
import Premium from './pages/Premium'
import About from './pages/About'
import Download from './pages/Download'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import Cookies from './pages/Cookies'
import Blog from './pages/Blog'
import Careers from './pages/Careers'
import Press from './pages/Press'
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
  const [preloaderDone, setPreloaderDone] = useState(
    () => sessionStorage.getItem('rissme_intro') === '1'
  )

  const handleDone = () => {
    sessionStorage.setItem('rissme_intro', '1')
    setPreloaderDone(true)
  }

  return (
    <>
      <AnimatePresence>
        {!preloaderDone && <Preloader key="preloader" onDone={handleDone} />}
      </AnimatePresence>

      <Layout>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/safety" element={<Safety />} />
        <Route path="/premium" element={<Premium />} />
        <Route path="/about" element={<About />} />
        <Route path="/download" element={<Download />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/cookies" element={<Cookies />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/press" element={<Press />} />
        <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </>
  )
}
