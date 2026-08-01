import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BadgeCheck, Send } from 'lucide-react'

const CONVERSATION = [
  { id: 1, from: 'mara', text: 'ok your prompt about ranch dressing was unhinged 😊' },
  { id: 2, from: 'me',   text: 'and yet here you are, replying' },
  { id: 3, from: 'mara', text: 'fair. coffee sat?' },
  { id: 4, from: 'me',   text: 'only if you bring the ranch 📍' },
]

const bubble = {
  hidden: { opacity: 0, y: 10, scale: 0.93 },
  show:   { opacity: 1, y: 0,  scale: 1,   transition: { type: 'spring', stiffness: 340, damping: 26 } },
}

export default function IphoneChat() {
  const [count, setCount]     = useState(0)
  const [typing, setTyping]   = useState(false)
  const timers                = useRef([])

  useEffect(() => {
    const q = (fn, ms) => { const t = setTimeout(fn, ms); timers.current.push(t) }

    let t = 400
    CONVERSATION.forEach((msg, i) => {
      if (i > 0 && msg.from === 'mara') {
        q(() => setTyping(true),  t);        t += 700
      }
      q(() => { setTyping(false); setCount(i + 1) }, t); t += 1400
    })
    // keep typing indicator after final message
    q(() => setTyping(true), t)

    return () => timers.current.forEach(clearTimeout)
  }, [])

  return (
    <div className="relative mx-auto w-[260px] select-none">
      {/* Outer shell */}
      <div className="rounded-[2.8rem] bg-gradient-to-b from-plum-900 to-plum-900/90 p-[3px] shadow-[0_36px_88px_-12px_rgba(16,13,24,0.65)]">

        {/* Physical side buttons */}
        <div className="absolute -left-[3px] top-20 h-7 w-[3px] rounded-l bg-plum-800" />
        <div className="absolute -left-[3px] top-32 h-10 w-[3px] rounded-l bg-plum-800" />
        <div className="absolute -left-[3px] top-48 h-10 w-[3px] rounded-l bg-plum-800" />
        <div className="absolute -right-[3px] top-28 h-14 w-[3px] rounded-r bg-plum-800" />

        {/* Screen */}
        <div className="flex h-[510px] flex-col overflow-hidden rounded-[2.5rem] bg-[#fdf4f7]">

          {/* Status bar */}
          <div className="relative flex h-11 shrink-0 items-center justify-between px-5 bg-[#fdf4f7]">
            <span className="text-[10px] font-bold text-plum-900/80">9:41</span>
            {/* Dynamic island */}
            <div className="absolute left-1/2 top-2 h-[22px] w-[88px] -translate-x-1/2 rounded-full bg-plum-900" />
            <div className="flex items-center gap-[3px]">
              <div className="h-[10px] w-[14px] rounded-[3px] border border-plum-900/60 p-px">
                <div className="h-full w-[70%] rounded-[2px] bg-plum-900/60" />
              </div>
            </div>
          </div>

          {/* Chat header */}
          <div className="flex shrink-0 items-center gap-3 border-b border-plum-700/20 px-4 pb-3">
            <div className="relative shrink-0">
              <img
                src="/realones/mara.jpg"
                alt="Mara"
                className="h-10 w-10 rounded-full border-2 border-white object-cover shadow-sm"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-[#fdf4f7]" />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-sm font-semibold text-plum-900">Mara</span>
                <BadgeCheck className="h-3.5 w-3.5 fill-lilac-400 text-white" />
              </div>
              <span className="text-[11px] font-medium text-emerald-500">● online now</span>
            </div>
          </div>

          {/* Message list */}
          <div className="flex flex-1 flex-col gap-2 overflow-hidden px-3 py-3">
            <AnimatePresence initial={false}>
              {CONVERSATION.slice(0, count).map((msg) => (
                <motion.div
                  key={msg.id}
                  variants={bubble}
                  initial="hidden"
                  animate="show"
                  className={`flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}
                >
                  <span
                    className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-[13px] leading-snug shadow-sm ${
                      msg.from === 'me'
                        ? 'rounded-br-[4px] bg-gradient-to-br from-peach-400 to-blush-400 text-white'
                        : 'rounded-bl-[4px] bg-white text-plum-900'
                    }`}
                  >
                    {msg.text}
                  </span>
                </motion.div>
              ))}

              {typing && (
                <motion.div
                  key="typing"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex justify-start"
                >
                  <span className="rounded-2xl rounded-bl-[4px] bg-white px-4 py-2.5 shadow-sm">
                    <span className="flex items-center gap-[5px]">
                      {['-0.2s', '-0.1s', '0s'].map((d, i) => (
                        <span
                          key={i}
                          className="h-[6px] w-[6px] animate-bounce rounded-full bg-blush-300"
                          style={{ animationDelay: d }}
                        />
                      ))}
                    </span>
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Input bar */}
          <div className="m-3 flex shrink-0 items-center gap-2 rounded-full border border-plum-700/15 bg-white px-4 py-2 shadow-sm">
            <span className="flex-1 text-[12px] text-plum-700/40">type something cute…</span>
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gradient-to-br from-peach-400 to-blush-400 text-white">
              <Send className="h-3 w-3" />
            </span>
          </div>

          {/* Home indicator */}
          <div className="flex h-5 shrink-0 items-center justify-center">
            <div className="h-1 w-20 rounded-full bg-plum-900/15" />
          </div>

        </div>
      </div>
    </div>
  )
}
