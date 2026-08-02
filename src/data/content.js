import {
  BadgeCheck,
  MessageCircleHeart,
  Flame,
  Sparkles,
  ShieldCheck,
  MapPin,
  Clock4,
  EyeOff,
  Undo2,
  Zap,
  Heart,
  Lock,
  UserRoundCheck,
  Bell,
  Users,
  Camera,
  Eye,
  Cherry,
  Headphones,
  Award,
  HeartHandshake,
  PartyPopper,
  Unlock,
  Star,
} from 'lucide-react'

// ── Social-proof stats ────────────────────────────────────────────────
export const stats = [
  { value: '10K+', label: 'verified humans' },
  { value: '88%', label: 'match → first message' },
  { value: '0', label: 'bots tolerated' },
  { value: '4.5', label: 'on the app store', icon: Star },
]

// ── Rotating marquee words ────────────────────────────────────────────
export const marqueeWords = [
  'no bots',
  'no catfish',
  'no ick',
  'real humans only',
  'verified or it doesn’t count',
  'made to make you blush',
  'slide in, for real',
  'green flags only',
]

// ── Home feature teasers ──────────────────────────────────────────────
export const featureTeasers = [
  {
    id: 1,
    icon: BadgeCheck,
    title: 'Everyone’s verified',
    category: 'trust',
    content: 'A quick selfie check means the person in the pics is the person in the chat. No catfish, no surprises.',
    energy: 96,
    relatedIds: [3],
  },
  {
    id: 2,
    icon: Clock4,
    title: 'The 24-hour rule',
    category: 'pacing',
    content: 'Match, then make a move. Conversations have a heartbeat - no more matches rotting in the void for weeks.',
    energy: 88,
    relatedIds: [3, 4],
  },
  {
    id: 3,
    icon: MessageCircleHeart,
    title: 'Chat that flirts back',
    category: 'chat',
    content: 'Live typing, read receipts, presence dots and openers that actually start something. Awkward silence, cancelled.',
    energy: 91,
    relatedIds: [1, 2],
  },
  {
    id: 4,
    icon: Flame,
    title: 'Matches near you',
    category: 'discovery',
    content: 'Distance + interest matching surfaces people you’d actually run into - and actually like.',
    energy: 85,
    relatedIds: [2],
  },
]

// ── How it works steps ────────────────────────────────────────────────
export const steps = [
  {
    n: '01',
    icon: Camera,
    title: 'Make it you',
    body: 'Drop your best pics, verify with a 5-second selfie, and answer a couple prompts that show your personality (not just your jawline).',
  },
  {
    n: '02',
    icon: Eye,
    title: 'Meet your deck',
    body: 'We surface verified people near you that match your vibe. Like, pass, or super-like - your feed, your rules.',
  },
  {
    n: '03',
    icon: Heart,
    title: 'It’s a vibe',
    body: 'When the like is mutual, you’ve got 24 hours to break the ice. Send the first riss and see where it goes.',
  },
]

// ── Full features (Features page) ─────────────────────────────────────
export const featureSections = [
  {
    icon: BadgeCheck,
    title: 'Verified-only swiping',
    blurb: 'Every profile passes a live selfie check before it ever hits your deck. Turn on “verified only” and the unverified literally can’t reach you.',
    points: ['Live selfie + face match', 'Verified badge on every card', '“Verified only” discovery toggle'],
    accent: 'peach',
  },
  {
    icon: Flame,
    title: 'Smarter discovery',
    blurb: 'A deck ranked by distance, shared interests and who’s actually active - not a random firehose. Filter by age, distance, and vibe.',
    points: ['Distance + interest ranking', 'Age & distance filters', 'Surfaces active people first'],
    accent: 'blush',
  },
  {
    icon: Undo2,
    title: 'Rewind the oops',
    blurb: 'Passed on someone by accident? One tap brings them back. (A little Premium magic.)',
    points: ['Undo your last swipe', 'No more “wait, who was that”', 'Premium perk'],
    accent: 'lilac',
  },
  {
    icon: MessageCircleHeart,
    title: 'Real-time chat',
    blurb: 'Typing dots, read receipts, online presence and a 24-hour spark timer. It feels alive because it is.',
    points: ['Live typing + read receipts', 'Online / last-active dots', 'First-message timer keeps it moving'],
    accent: 'peach',
  },
  {
    icon: Sparkles,
    title: 'Openers that land',
    blurb: 'Stuck on what to say? Tap a prompt-based opener pulled from their profile. Conversations start themselves.',
    points: ['Profile-prompt openers', 'Super-like to stand out', 'No “hey” energy allowed'],
    accent: 'blush',
  },
  {
    icon: Bell,
    title: 'Notifications, not noise',
    blurb: 'Get pinged for the stuff that matters - new matches, messages, likes - and mute the rest. You’re in control.',
    points: ['Match & message alerts', 'Granular notification settings', 'Quiet mode whenever'],
    accent: 'lilac',
  },
]

// ── Safety pillars (Safety page) ──────────────────────────────────────
export const safetyPillars = [
  {
    icon: UserRoundCheck,
    title: 'Selfie verification',
    body: 'A quick liveness check matches a real-time selfie to your photos. Verified humans only - catfish need not apply.',
  },
  {
    icon: ShieldCheck,
    title: 'Block & report, instantly',
    body: 'One tap removes someone from your world - match gone, chat gone, hidden both ways. Reports go straight to our moderation team.',
  },
  {
    icon: EyeOff,
    title: 'Your data, minimised',
    body: 'We strip personal info before anything touches AI, never sell your data, and let you delete everything for good - gone in 30 days, fully.',
  },
  {
    icon: Lock,
    title: 'Privacy you control',
    body: 'Hide your distance, turn off read receipts, go incognito, control who sees you online. Your visibility is a dial, not a default.',
  },
]

export const safetyPromises = [
  'Auto-suspend on repeat reports',
  'No screenshots of verification selfies - ever',
  'Photos & messages purged on account deletion',
  'Human moderators, not just bots',
  'Age-gated 18+ with checks',
  'Encrypted in transit & at rest',
]

// ── Premium plans (Premium page) ────────────────────────────────────────
// One subscription, three durations. Pricing isn't locked yet, so each card
// shows a "reveal soon" teaser instead of digits. The 30-day plan always
// ships with 3 extra days on the house.
export const plans = [
  { duration: '3 Days', tag: 'try the vibe', days: 3, bonusDays: 0, highlight: false, cta: 'Get 3 days' },
  { duration: '10 Days', tag: 'for the regulars', days: 10, bonusDays: 0, highlight: false, cta: 'Get 10 days' },
  { duration: '30 Days', tag: 'maximum rizz', days: 30, bonusDays: 3, highlight: true, cta: 'Get 30 days' },
]

export const planPerks = [
  'See everyone who likes you',
  'Unlimited rewinds',
  'Extend the 24h timer',
  'Weekly priority Boosts',
  '5 Super Likes a day',
  'Travel mode - swipe anywhere',
]

export const premiumPerks = [
  { icon: EyeOff, title: 'See your likes', body: 'No more blurred mystery - see everyone who already swiped right on you.' },
  { icon: Undo2, title: 'Unlimited rewinds', body: 'Take back every accidental pass, as many times as your thumb slips.' },
  { icon: Clock4, title: 'Extend the timer', body: 'Need a few more hours to find the perfect opener? Stretch the 24h window.' },
  { icon: Zap, title: 'Weekly boosts', body: 'Jump to the front of the deck in your area when it counts most.' },
  { icon: MapPin, title: 'Travel mode', body: 'Swipe in any city before you even land. Romanticise the layover.' },
  { icon: Heart, title: 'More super likes', body: 'Stand out from the deck with super likes that get 3x more replies.' },
]

// ── FAQ ───────────────────────────────────────────────────────────────
export const faqs = [
  {
    q: 'Wait, what does “Rissme” even mean?',
    a: 'It’s “kiss me” with a little more rizz. Also the sound your heart makes when a verified cutie super-likes you. Mostly the first thing.',
  },
  {
    q: 'Is everyone really verified?',
    a: 'Yep. A live selfie check matches the person to their photos before they can show up in your deck. Flip on “verified only” and you’ll never see an unverified profile.',
  },
  {
    q: 'What’s the 24-hour thing?',
    a: 'When you match, you’ve got 24 hours to send the first message before it gently expires. It keeps conversations alive instead of letting matches collect dust. Premium can extend it.',
  },
  {
    q: 'Is Rissme free?',
    a: '100%. Swiping, matching and chatting are free forever. Premium adds extras like seeing your likes, rewinds and boosts - but you never need it to meet someone.',
  },
  {
    q: 'How do you keep it safe?',
    a: 'Verification, instant block & report, human moderators, auto-suspend on repeat reports, and privacy controls for everything. Your data is minimised and fully deletable. More on the Safety page.',
  },
  {
    q: 'When can I download it?',
    a: 'Soon™ - and it’ll be worth the wait. Join the list and you’ll be first through the door (with a little launch-day surprise).',
  },
]

// ── Testimonials ──────────────────────────────────────────────────────
export const testimonials = [
  { name: 'Ananya, 24', icon: Sparkles, text: 'first app where every match was actually a real person. wild concept honestly.', tone: 'from-lilac-200 to-sky-200' },
  { name: 'Dev, 27', icon: Zap, text: 'the 24h timer made me stop overthinking and just say hi. met my gf in week one.', tone: 'from-peach-200 to-blush-200' },
  { name: 'Sim, 22', icon: Cherry, text: 'the openers slap. no more staring at “hey” for nine business days.', tone: 'from-blush-200 to-lilac-200' },
  { name: 'Kabir, 25', icon: Headphones, text: 'verified-only is elite. deleted three other apps the day I joined.', tone: 'from-peach-200 to-lilac-200' },
]

// ── Real Ones scroll wall (verified-humans showcase) ──────────────────
// Drop matching image files into `public/realones/` (see the filename in
// each `src` below). Square / portrait crops look best; darker, photographic
// faces make the big "real ones" title invert dramatically as they pass.
export const realOnes = [
  { name: 'Ananya', role: 'no ick detected', src: '/realones/ananya.webp' },
  { name: 'Dev', role: 'green flag energy', src: '/realones/dev.webp' },
  { name: 'Sim', role: 'certified cutie', src: '/realones/sim.webp' },
  { name: 'Kabir', role: 'verified flirt', src: '/realones/kabir.jpg' },
  { name: 'Mara', role: 'down for ranch talk', src: '/realones/mara.jpg' },
  { name: 'Zoya', role: 'main character', src: '/realones/zoya.jpg' },
  { name: 'Rhea', role: 'actually replies', src: '/realones/rhea.avif' },
  { name: 'Arjun', role: '10/10 banter', src: '/realones/arjun.avif' },
  { name: 'Tara', role: 'soft launch ready', src: '/realones/tara.webp' },
  { name: 'Vihaan', role: 'no cap, real one', src: '/realones/vihaan.webp' },
  { name: 'Aisha', role: 'elite texter', src: '/realones/aisha.avif' },
  { name: 'Rohan', role: 'actual gentleman', src: '/realones/rohan.avif' },
  { name: 'Naina', role: 'chaotic good', src: '/realones/naina.jpeg' },
  { name: 'Ishaan', role: 'rizz certified', src: '/realones/ishaan.jpeg' },
  { name: 'Diya', role: 'soft girl era', src: '/realones/diya.jpg' },
  { name: 'Kiaan', role: 'gym bro but sweet', src: '/realones/kiaan.jpg' },
  { name: 'Meher', role: 'unfiltered, iconic', src: '/realones/meher.jpg' },
  { name: 'Aryan', role: 'main character syndrome', src: '/realones/aryan.jpeg' },
  { name: 'Ria', role: 'professional flirt', src: '/realones/ria.jpeg' },
  { name: 'Yash', role: 'low-key simp', src: '/realones/yash.jpg' },
  { name: 'Anaya', role: 'delulu but make it cute', src: '/realones/anaya.avif' },
  { name: 'Veer', role: 'tall, dark, decent', src: '/realones/veer.jpeg' },
  { name: 'Sana', role: 'menace (affectionate)', src: '/realones/sana.jpeg' },
  { name: 'Nikhil', role: 'would 10/10 recommend', src: '/realones/nikhil.jpeg' },
  { name: 'Priya', role: 'green flag farm', src: '/realones/priya.avif' },
  { name: 'Aditya', role: 'talks with his hands', src: '/realones/aditya.avif' },
  { name: 'Mira', role: 'unreasonably hot', src: '/realones/mira.jpg' },
  { name: 'Karan', role: 'secretly soft', src: '/realones/karan.jpg' },
  { name: 'Tanvi', role: 'main character, no plot', src: '/realones/tanvi.jpeg' },
  { name: 'Rishi', role: 'certified cutie pt 2', src: '/realones/rishi.jpeg' },
]

// ── About values ──────────────────────────────────────────────────────
export const values = [
  { icon: Award, title: 'Realness over reach', body: 'We’d rather have fewer, verified humans than a billion bots. Quality of connection beats vanity numbers, every time.' },
  { icon: HeartHandshake, title: 'Kindness is the algorithm', body: 'Safety, consent and good vibes aren’t features we bolted on - they’re the foundation everything else stands on.' },
  { icon: PartyPopper, title: 'Dating should be fun', body: 'Less doomscroll, more butterflies. If it doesn’t make you smile, we’ll keep building until it does.' },
  { icon: Unlock, title: 'Your data is yours', body: 'We minimise what we collect, never sell it, and make it one tap to take it all back. Trust is earned, not assumed.' },
]
