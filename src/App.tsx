import { useEffect, useState, type FormEvent, type MouseEvent, type ReactNode } from 'react'
import img1 from './assets/slider/1.jpg'
import img2 from './assets/slider/2.jpg'
import img3 from './assets/slider/3.jpg'
import img4 from './assets/slider/4.jpg'
import img5 from './assets/slider/5.jpg'
import img6 from './assets/slider/6.jpg'
import {
  ArrowUpRight,
  CalendarSync,
  Globe,
  Mail,
  Phone,
  PhoneIncoming,
  ThermometerSun,
  UserCheck,
} from 'lucide-react'

const CONTACT_PHONE = 'tel:+19085048800'
const CONTACT_EMAIL = 'mailto:sales@meeyaarcc.com'
const SITE_URL = 'https://meeyaarcc.com'

const gallery = [
  { src: img1, label: 'Outdoor AC service' },
  { src: img2, label: 'Heating system repair' },
  { src: img3, label: 'Rooftop condensers' },
  { src: img4, label: 'Refrigerant diagnostics' },
  { src: img5, label: 'Commercial cooling' },
  { src: img6, label: 'HVAC plant equipment' },
] as const

const services = [
  {
    num: '01',
    icon: PhoneIncoming,
    title: '24/7 Emergency Dispatching',
    description:
      'Nights, weekends, holidays. We catch every after-hours ring, triage urgency, and get a tech rolling before the homeowner calls your competitor.',
  },
  {
    num: '02',
    icon: UserCheck,
    title: 'Inbound Lead Qualification',
    description:
      'Service area, job type, booking readiness — screened before it hits your board. Your crew talks to real jobs, not tire-kickers.',
  },
  {
    num: '03',
    icon: ThermometerSun,
    title: 'Outbound Seasonal Recall & Maintenance',
    description:
      'Tune-ups and memberships that fill the slow months. We bring past customers back before peak heat and freeze seasons hit.',
  },
] as const

const integrations = [
  'ServiceTitan',
  'Housecall Pro',
  'Jobber',
  'ServiceTitan',
  'Housecall Pro',
  'Jobber',
] as const

const liveCalls = [
  { time: '2:14 AM', type: 'No Heat', city: 'Dallas, TX', status: 'Dispatched' },
  { time: '1:58 AM', type: 'AC Emergency', city: 'Phoenix, AZ', status: 'Qualified' },
  { time: '1:41 AM', type: 'Water Leak', city: 'Austin, TX', status: 'Booked' },
] as const

const contractors = [
  { name: 'New York Heating and Air Conditioning', city: 'New York, NY', focus: 'Heating and air conditioning service' },
  { name: 'Best New York HVAC Repair', city: 'New York, NY', focus: 'Heating and AC repair' },
  { name: '24/7 HVAC of Long Island Inc', city: 'Lawrence, NY', focus: '24/7 emergency HVAC' },
  { name: 'Rescue Plumbing & HVAC', city: 'Haledon, NJ', focus: '24/7 plumbing and HVAC dispatch' },
  { name: 'Dynamic HVAC', city: 'Glenville, PA', focus: '24/7 heating and cooling emergencies' },
] as const

const contactChannels = [
  { label: 'Phone', value: '+1 908 504 8800', href: CONTACT_PHONE, icon: Phone },
  { label: 'Email', value: 'sales@meeyaarcc.com', href: CONTACT_EMAIL, icon: Mail },
  { label: 'Website', value: 'meeyaarcc.com', href: SITE_URL, icon: Globe },
] as const

type Page = 'home' | 'work' | 'contact' | 'terms' | 'privacy'

function pageFromPath(pathname: string): Page {
  if (pathname === '/work') return 'work'
  if (pathname === '/contact') return 'contact'
  if (pathname === '/terms') return 'terms'
  if (pathname === '/privacy') return 'privacy'
  return 'home'
}

function usePage() {
  const [page, setPage] = useState<Page>(() => pageFromPath(window.location.pathname))
  useEffect(() => {
    const sync = () => setPage(pageFromPath(window.location.pathname))
    window.addEventListener('popstate', sync)
    return () => window.removeEventListener('popstate', sync)
  }, [])
  useEffect(() => {
    window.scrollTo(0, 0)
    const titles: Record<Page, string> = {
      home: 'Meeyaar Customer Care | 24/7 HVAC Call Answering',
      work: 'Our Work | Meeyaar Customer Care',
      contact: 'Contact | Meeyaar Customer Care',
      terms: 'Terms and Conditions | Meeyaar Customer Care',
      privacy: 'Privacy Policy | Meeyaar Customer Care',
    }
    document.title = titles[page]
  }, [page])
  return page
}

function go(event: MouseEvent<HTMLAnchorElement>) {
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return
  const href = event.currentTarget.getAttribute('href')
  if (!href?.startsWith('/')) return
  event.preventDefault()
  if (window.location.pathname !== href) {
    window.history.pushState(null, '', href)
    window.dispatchEvent(new PopStateEvent('popstate'))
  } else {
    window.scrollTo(0, 0)
  }
}

function App() {
  const page = usePage()
  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-50 text-slate-900">
      <Header solid={page !== 'home'} page={page} />
      <main>
        {page === 'work' ? (
          <WorkPage />
        ) : page === 'contact' ? (
          <ContactPage />
        ) : page === 'terms' ? (
          <TermsPage />
        ) : page === 'privacy' ? (
          <PrivacyPage />
        ) : (
          <>
            <Hero />
            <Gallery />
            <Services />
            <Integrations />
            <FinalCta />
          </>
        )}
      </main>
      <Footer />
    </div>
  )
}

function Header({ solid, page }: { solid: boolean; page: Page }) {
  const linkClass = (id: Page) =>
    `text-sm font-medium transition hover:text-white ${page === id ? 'text-white' : 'text-white/75'}`
  return (
    <header className={solid ? 'bg-slate-900' : 'absolute inset-x-0 top-0 z-30'}>
      <div className="mx-auto max-w-6xl px-5 py-4 sm:px-8">
        <div className="flex items-center justify-between gap-4">
          <a href="/" onClick={go} className="inline-flex items-center">
            <img
              src="/logo-banner.png"
              alt="Meeyaar Customer Care"
              width={1316}
              height={265}
              className="h-auto max-h-10 w-auto max-w-[calc(100vw-12.5rem)] sm:h-14 sm:max-h-none sm:max-w-none"
            />
          </a>
          <div className="flex items-center gap-5 sm:gap-7">
            <nav className="hidden items-center gap-6 md:flex">
              <a href="/" onClick={go} className={linkClass('home')} aria-current={page === 'home' ? 'page' : undefined}>
                Home
              </a>
              <a href="/work" onClick={go} className={linkClass('work')} aria-current={page === 'work' ? 'page' : undefined}>
                Our work
              </a>
              <a href="/contact" onClick={go} className={linkClass('contact')} aria-current={page === 'contact' ? 'page' : undefined}>
                Contact
              </a>
            </nav>
            <a
              href={CONTACT_PHONE}
              className="inline-flex shrink-0 items-center gap-2 rounded-md bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
            >
              Contact now
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </a>
          </div>
        </div>
        <nav className="mt-3 flex gap-5 md:hidden">
          <a href="/" onClick={go} className={linkClass('home')} aria-current={page === 'home' ? 'page' : undefined}>
            Home
          </a>
          <a href="/work" onClick={go} className={linkClass('work')} aria-current={page === 'work' ? 'page' : undefined}>
            Our work
          </a>
          <a href="/contact" onClick={go} className={linkClass('contact')} aria-current={page === 'contact' ? 'page' : undefined}>
            Contact
          </a>
        </nav>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden">
      <img
        src={img1}
        alt=""
        className="absolute inset-0 h-full w-full scale-105 object-cover object-[center_30%]"
      />
      <div className="absolute inset-0 bg-slate-900/55" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/85 via-slate-900/50 to-slate-900/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-slate-900/40" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_40%,rgb(37_99_235_/_0.25),transparent_55%)]" />

      <div className="relative mx-auto grid min-h-[100svh] max-w-6xl items-center gap-12 px-5 pb-20 pt-36 sm:px-8 lg:grid-cols-[1.15fr_0.95fr] lg:gap-10 lg:pb-24 lg:pt-32">
        <div>
          <p className="animate-fade-up flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-sky-300">
            <span className="live-blink h-1.5 w-1.5 rounded-full bg-emerald-400" />
            After-hours. On duty. Always.
          </p>

          <p className="animate-fade-up-delay-1 mt-6 font-display text-4xl font-extrabold leading-none tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Meeyaar
            <span className="mt-1 block font-serif text-3xl font-normal italic tracking-normal text-slate-200 sm:text-4xl md:text-5xl">
              Customer Care
            </span>
          </p>

          <h1 className="animate-fade-up-delay-2 mt-8 max-w-xl text-2xl font-semibold leading-[1.2] tracking-tight text-white sm:text-3xl md:text-[2.15rem]">
            Never Lose an Emergency HVAC Call to a Competitor Again.
          </h1>

          <p className="animate-fade-up-delay-3 mt-5 max-w-md text-base leading-relaxed text-slate-200 sm:text-lg">
            24/7 call answering, emergency dispatch, and lead qualification for
            US HVAC contractors — every missed ring becomes a booked job.
          </p>

          <div className="animate-fade-up-delay-3 mt-9 flex flex-wrap items-center gap-5">
            <a
              href={CONTACT_PHONE}
              className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 transition hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300"
            >
              Contact now
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </a>
            <a
              href="#services"
              className="text-sm font-medium text-white/85 underline decoration-white/40 underline-offset-4 transition hover:text-white"
            >
              See how it works
            </a>
          </div>
        </div>

        <div className="animate-fade-up-delay-2 relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
          <div
            className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 md:h-36 md:w-36"
            aria-hidden
          >
            <span className="ring-wave absolute inset-0 rounded-full border border-sky-300/50" />
            <span className="ring-wave-delay absolute inset-0 rounded-full border border-blue-400/35" />
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/40 bg-white/90 shadow-xl shadow-slate-900/20 backdrop-blur-md">
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="live-blink h-2 w-2 rounded-full bg-emerald-500" />
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-700">
                  Live board
                </span>
              </div>
              <span className="font-mono text-[11px] text-slate-500">Tonight · CST</span>
            </div>

            <ul className="divide-y divide-slate-100">
              {liveCalls.map((call) => (
                <li
                  key={call.time + call.city}
                  className="grid grid-cols-[4.5rem_1fr_auto] items-center gap-3 px-4 py-3.5"
                >
                  <span className="font-mono text-xs text-slate-500">{call.time}</span>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{call.type}</p>
                    <p className="text-xs text-slate-500">{call.city}</p>
                  </div>
                  <span className="rounded-sm bg-blue-600 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
                    {call.status}
                  </span>
                </li>
              ))}
            </ul>

            <div className="border-t border-slate-200 bg-blue-50 px-4 py-3">
              <p className="text-xs leading-relaxed text-slate-600">
                Incoming answered in{' '}
                <span className="font-semibold text-slate-900">&lt; 3 rings</span>
                {' · '}synced to your calendar
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Gallery() {
  const rowA = [...gallery, ...gallery]
  const rowB = [...gallery.slice().reverse(), ...gallery.slice().reverse()]

  return (
    <section
      id="gallery"
      className="relative -mt-8 overflow-hidden bg-slate-50 pb-16 pt-6 sm:-mt-10 sm:pb-24 sm:pt-8"
      aria-label="HVAC work gallery"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-blue-600">
          Real HVAC work
        </p>
        <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          The calls we keep moving — emergencies, installs, peak season.
        </h2>
      </div>

      <div className="mt-10 space-y-4 sm:mt-14 sm:space-y-5">
        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-slate-50 to-transparent sm:w-24" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-slate-50 to-transparent sm:w-24" />
          <div className="marquee-track-slow flex w-max gap-4 px-4">
            {rowA.map((item, i) => (
              <figure
                key={`a-${item.label}-${i}`}
                className="gallery-frame relative h-48 w-72 shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-white sm:h-56 sm:w-80"
              >
                <img
                  src={item.src}
                  alt=""
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900/80 to-transparent px-4 pb-3 pt-10 text-xs font-medium text-white">
                  {item.label}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-slate-50 to-transparent sm:w-24" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-slate-50 to-transparent sm:w-24" />
          <div className="marquee-track-reverse flex w-max gap-4 px-4">
            {rowB.map((item, i) => (
              <figure
                key={`b-${item.label}-${i}`}
                className="gallery-frame relative h-40 w-64 shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-white sm:h-48 sm:w-72"
              >
                <img
                  src={item.src}
                  alt=""
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900/80 to-transparent px-4 pb-3 pt-10 text-xs font-medium text-white">
                  {item.label}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Services() {
  return (
    <section id="services" className="relative border-t border-slate-200 bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-blue-600">
            What we run for you
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            Built for shops that can&apos;t miss a ring.
          </h2>
        </div>

        <ul className="mt-14 divide-y divide-slate-200 border-y border-slate-200">
          {services.map(({ num, icon: Icon, title, description }) => (
            <li
              key={title}
              className="service-row group grid gap-6 px-1 py-10 sm:grid-cols-[5rem_1fr] sm:gap-10 md:grid-cols-[5rem_1.1fr_1.4fr] md:items-start"
            >
              <span className="font-display text-3xl font-bold text-blue-600 transition group-hover:text-blue-500">
                {num}
              </span>
              <div>
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="font-display text-xl font-bold text-slate-900 sm:text-2xl">
                  {title}
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-slate-600 sm:text-base md:pt-1">
                {description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Integrations() {
  return (
    <section
      id="integrations"
      className="relative overflow-hidden border-t border-slate-200 bg-slate-100 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="max-w-xl">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm">
            <CalendarSync className="h-5 w-5" aria-hidden />
          </div>
          <h2 className="font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Books straight into your calendar.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            Direct sync with the platforms your techs already live in — no
            double-entry, no lost appointments.
          </p>
        </div>
      </div>

      <div className="relative mt-14 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-slate-100 to-transparent sm:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-slate-100 to-transparent sm:w-28" />
        <div className="marquee-track flex w-max gap-4 px-4">
          {integrations.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="inline-flex shrink-0 items-center rounded-lg border border-slate-200 bg-white px-8 py-4 font-display text-lg font-semibold tracking-wide text-slate-800 shadow-sm"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

function FinalCta() {
  return (
    <section className="relative border-t border-slate-200 bg-white py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_100%,rgb(37_99_235_/_0.12),transparent)]" />
      <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-blue-600">
          Ready when the phone rings
        </p>
        <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Own every emergency call
          <span className="mt-2 block font-serif text-3xl font-normal italic text-slate-600 sm:text-4xl">
            in your market.
          </span>
        </h2>
        <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-slate-600">
          A short walkthrough tailored to US HVAC shops — see how Meeyaar plugs
          into your dispatch workflow.
        </p>
        <a
          href={CONTACT_PHONE}
          className="mt-10 inline-flex items-center gap-2 rounded-md bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
        >
          Contact now
          <ArrowUpRight className="h-4 w-4" aria-hidden />
        </a>
        <p className="mt-6 text-sm text-slate-500">
          <a
            href={CONTACT_EMAIL}
            className="text-slate-700 underline decoration-slate-300 underline-offset-4 transition hover:text-blue-600"
          >
            sales@meeyaarcc.com
          </a>
        </p>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-900 py-10 text-slate-300">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div>
          <img
            src="/logo.png"
            alt="Meeyaar Customer Care"
            width={639}
            height={486}
            className="h-20 w-auto"
          />
          <p className="mt-3 text-xs uppercase tracking-[0.2em] text-slate-500">
            US HVAC answering &amp; dispatch
          </p>
        </div>
        <div className="flex flex-col gap-1 text-sm text-slate-400 sm:items-end">
          <a href="/" onClick={go} className="transition hover:text-white">
            Home
          </a>
          <a href="/work" onClick={go} className="transition hover:text-white">
            Our work
          </a>
          <a href="/contact" onClick={go} className="transition hover:text-white">
            Contact
          </a>
          <a href="/terms" onClick={go} className="transition hover:text-white">
            Terms
          </a>
          <a href="/privacy" onClick={go} className="transition hover:text-white">
            Privacy
          </a>
          <a href={CONTACT_PHONE} className="transition hover:text-white">
            +1 908 504 8800
          </a>
          <a href={SITE_URL} className="transition hover:text-white">
            meeyaarcc.com
          </a>
          <a href={CONTACT_EMAIL} className="transition hover:text-white">
            sales@meeyaarcc.com
          </a>
          <p className="mt-2 text-xs text-slate-500">
            © {new Date().getFullYear()} Meeyaar Customer Care
          </p>
        </div>
      </div>
    </footer>
  )
}

function WorkPage() {
  return (
    <>
      <section className="bg-slate-900 px-5 pb-16 pt-8 text-white sm:px-8 sm:pb-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-sky-300">
            Our work
          </p>
          <h1 className="mt-4 max-w-2xl font-display text-4xl font-bold tracking-tight sm:text-5xl">
            HVAC shops we answer for.
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-300">
            New York, New Jersey, and Pennsylvania shops whose after-hours and overflow calls land on our desk.
          </p>
        </div>
      </section>
      <section className="px-5 py-16 sm:px-8 sm:py-20">
        <ul className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2">
          {contractors.map((shop) => (
            <li key={shop.name} className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-600">
                {shop.city}
              </p>
              <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-slate-900">
                {shop.name}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">{shop.focus}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}

function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [sent, setSent] = useState(false)

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!agreed) return
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      '',
      message,
      '',
      'Consented to SMS contact from Meeyaar and agreed to the privacy policy.',
    ].join('\n')
    window.location.href = `${CONTACT_EMAIL}?subject=${encodeURIComponent(`Contact from ${name || 'website'}`)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  return (
    <>
      <section className="bg-slate-900 px-5 pb-16 pt-8 text-white sm:px-8 sm:pb-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-sky-300">
            Contact
          </p>
          <h1 className="mt-4 max-w-2xl font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Reach the desk.
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-300">
            Call, email, or send the form below. The phone line opens the dialer.
          </p>
        </div>
      </section>
      <section className="px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
          <ul className="grid gap-4 content-start">
            {contactChannels.map(({ label, value, href, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  className="flex items-center gap-5 rounded-xl border border-slate-200 bg-white p-6 transition hover:border-blue-200 hover:bg-blue-50 sm:p-8"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <span>
                    <span className="block text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-600">
                      {label}
                    </span>
                    <span className="mt-1 block font-display text-xl font-bold text-slate-900 sm:text-2xl">
                      {value}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <form
            onSubmit={submit}
            className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8"
            noValidate
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-600">
              Terms &amp; contact
            </p>
            <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-slate-900">
              Send a message
            </h2>
            <div className="mt-8 grid gap-5">
              <label className="grid gap-2 text-sm font-medium text-slate-700">
                Name
                <input
                  type="text"
                  name="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="rounded-md border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20"
                />
              </label>
              <label className="grid gap-2 text-sm font-medium text-slate-700">
                Email
                <input
                  type="email"
                  name="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-md border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20"
                />
              </label>
              <label className="grid gap-2 text-sm font-medium text-slate-700">
                Phone
                <input
                  type="tel"
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="rounded-md border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20"
                />
              </label>
              <label className="grid gap-2 text-sm font-medium text-slate-700">
                Message
                <textarea
                  name="message"
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="resize-y rounded-md border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20"
                />
              </label>
              <label className="flex items-start gap-3 text-sm leading-relaxed text-slate-600">
                <input
                  type="checkbox"
                  name="terms"
                  required
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-1 h-4 w-4 shrink-0 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <span>
                  By providing a telephone number and submitting the form, you are consenting to
                  be contacted by SMS text message and agreeing to our{' '}
                  <a
                    href="/privacy"
                    onClick={go}
                    className="font-medium text-slate-900 underline decoration-slate-300 underline-offset-4 hover:text-blue-600"
                  >
                    privacy policy
                  </a>
                  . Message frequency may vary. Message and data rates may apply. Reply STOP to
                  opt out of further messaging. Reply HELP for more information.
                </span>
              </label>
            </div>
            <button
              type="submit"
              disabled={!agreed}
              className="mt-8 inline-flex items-center gap-2 rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
            >
              Send message
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </button>
            {sent ? (
              <p className="mt-4 text-sm text-slate-500">
                Opening your email app with the message…
              </p>
            ) : null}
          </form>
        </div>
      </section>
    </>
  )
}

function LegalPage({
  kicker,
  title,
  children,
}: {
  kicker: string
  title: string
  children: ReactNode
}) {
  return (
    <>
      <section className="bg-slate-900 px-5 pb-16 pt-8 text-white sm:px-8 sm:pb-20">
        <div className="mx-auto max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-sky-300">
            {kicker}
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">{title}</h1>
        </div>
      </section>
      <section className="px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-3xl space-y-8 text-sm leading-relaxed text-slate-600 sm:text-base [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-slate-900">
          {children}
        </div>
      </section>
    </>
  )
}

function TermsPage() {
  return (
    <LegalPage kicker="Legal" title="Terms and conditions">
      <p>
        These terms apply to meeyaarcc.com and to messages you agree to receive from Meeyaar
        Customer Care (“Meeyaar”). By using the site or submitting the contact form, you agree to
        these terms and to our{' '}
        <a href="/privacy" onClick={go} className="text-slate-900 underline underline-offset-4 hover:text-blue-600">
          privacy policy
        </a>
        .
      </p>
      <div>
        <h2>Services</h2>
        <p className="mt-3">
          Meeyaar is a professional services business. We provide customer care support, including
          call answering, dispatch coordination, and follow-up, as described on this website. A
          specific engagement starts only when we confirm it with you.
        </p>
      </div>
      <div>
        <h2>Contact form and text messages</h2>
        <p className="mt-3">
          By providing a telephone number and submitting the form, you are consenting to be
          contacted by SMS text message and agreeing to our privacy policy. Messages may include
          customer support and follow-up about your inquiry. Message frequency may vary. Message
          and data rates may apply. Reply STOP to opt out of further messaging. Reply HELP for more
          information. Consent to texts is not a condition of purchase.
        </p>
      </div>
      <div>
        <h2>Acceptable use</h2>
        <p className="mt-3">
          Do not misuse the site or the form, including by sending unlawful, misleading, or harmful
          content, or by attempting to disrupt the service.
        </p>
      </div>
      <div>
        <h2>Contact</h2>
        <p className="mt-3">
          Questions about these terms:{' '}
          <a href={CONTACT_EMAIL} className="text-slate-900 underline underline-offset-4 hover:text-blue-600">
            sales@meeyaarcc.com
          </a>{' '}
          or{' '}
          <a href={CONTACT_PHONE} className="text-slate-900 underline underline-offset-4 hover:text-blue-600">
            +1 908 504 8800
          </a>
          .
        </p>
      </div>
    </LegalPage>
  )
}

function PrivacyPage() {
  return (
    <LegalPage kicker="Legal" title="Privacy policy">
      <p>
        This policy explains what Meeyaar Customer Care (“Meeyaar”) collects through meeyaarcc.com
        and how we use it. It also covers text messages you agree to receive.
      </p>
      <div>
        <h2>Information we collect</h2>
        <p className="mt-3">
          If you submit the contact form, we collect your name, email address, telephone number, and
          message. We also receive the fact that you consented to SMS. The site host may collect
          basic technical data such as browser type and pages viewed.
        </p>
      </div>
      <div>
        <h2>How we use it</h2>
        <p className="mt-3">
          We use this information to respond to you, provide customer support, and send the
          communications you opted into. We do not sell your personal information.
        </p>
      </div>
      <div>
        <h2>Text messages</h2>
        <p className="mt-3">
          Messages are sent only to individuals who have provided consent to receive SMS
          communications from Meeyaar. Message frequency varies. Message and data rates may apply.
          Reply STOP to opt out or HELP for assistance. We may use a messaging provider to deliver
          those texts. Phone numbers and consent records are not shared for another company’s
          marketing.
        </p>
      </div>
      <div>
        <h2>How long we keep it</h2>
        <p className="mt-3">
          We keep contact details and messages for as long as needed to handle your request, keep a
          record of consent, and meet legal obligations. You can ask us to delete your information,
          except where we must retain it.
        </p>
      </div>
      <div>
        <h2>Contact</h2>
        <p className="mt-3">
          Privacy questions or deletion requests:{' '}
          <a href={CONTACT_EMAIL} className="text-slate-900 underline underline-offset-4 hover:text-blue-600">
            sales@meeyaarcc.com
          </a>{' '}
          or{' '}
          <a href={CONTACT_PHONE} className="text-slate-900 underline underline-offset-4 hover:text-blue-600">
            +1 908 504 8800
          </a>
          . See also our{' '}
          <a href="/terms" onClick={go} className="text-slate-900 underline underline-offset-4 hover:text-blue-600">
            terms and conditions
          </a>
          .
        </p>
      </div>
    </LegalPage>
  )
}

export default App
