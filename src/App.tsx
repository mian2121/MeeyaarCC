import img1 from './assets/slider/1.jpg'
import img2 from './assets/slider/2.jpg'
import img3 from './assets/slider/3.jpg'
import img4 from './assets/slider/4.jpg'
import img5 from './assets/slider/5.jpg'
import img6 from './assets/slider/6.jpg'
import {
  ArrowUpRight,
  CalendarSync,
  PhoneIncoming,
  ThermometerSun,
  UserCheck,
} from 'lucide-react'

const DEMO_MAIL =
  'mailto:meeyaarcc@gmail.com?subject=Book%20a%20Demo%20%E2%80%94%20Meeyaar%20Customer%20Care'

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

function App() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-50 text-slate-900">
      <Header />
      <main>
        <Hero />
        <Gallery />
        <Services />
        <Integrations />
        <FinalCta />
      </main>
      <Footer />
    </div>
  )
}

function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
        <a href="/" className="flex items-center gap-3">
          <span className="inline-flex h-9 items-center justify-center rounded-lg bg-blue-600 px-2.5 font-display text-[12px] font-extrabold tracking-[0.06em] text-white shadow-sm">
            MCC
          </span>
          <span className="font-display text-[15px] font-bold tracking-tight text-white sm:text-base">
            Meeyaar Customer Care
          </span>
        </a>
        <a
          href={DEMO_MAIL}
          className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
        >
          Book a Demo
          <ArrowUpRight className="h-4 w-4" aria-hidden />
        </a>
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

      <div className="relative mx-auto grid min-h-[100svh] max-w-6xl items-center gap-12 px-5 pb-20 pt-28 sm:px-8 lg:grid-cols-[1.15fr_0.95fr] lg:gap-10 lg:pb-24 lg:pt-24">
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
              href={DEMO_MAIL}
              className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 transition hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300"
            >
              Book a Demo
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
          href={DEMO_MAIL}
          className="mt-10 inline-flex items-center gap-2 rounded-md bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
        >
          Book a Demo
          <ArrowUpRight className="h-4 w-4" aria-hidden />
        </a>
        <p className="mt-6 text-sm text-slate-500">
          <a
            href="mailto:meeyaarcc@gmail.com"
            className="text-slate-700 underline decoration-slate-300 underline-offset-4 transition hover:text-blue-600"
          >
            meeyaarcc@gmail.com
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
          <p className="font-display text-lg font-bold text-white">Meeyaar Customer Care</p>
          <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-500">
            US HVAC answering &amp; dispatch
          </p>
        </div>
        <div className="flex flex-col gap-1 text-sm text-slate-400 sm:items-end">
          <a href="https://meeyaarcc.com" className="transition hover:text-white">
            meeyaarcc.com
          </a>
          <a href="mailto:meeyaarcc@gmail.com" className="transition hover:text-white">
            meeyaarcc@gmail.com
          </a>
          <p className="mt-2 text-xs text-slate-500">
            © {new Date().getFullYear()} Meeyaar Customer Care
          </p>
        </div>
      </div>
    </footer>
  )
}

export default App
