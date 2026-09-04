import {
  ArrowRight,
  CalendarSync,
  Headphones,
  PhoneCall,
  ShieldCheck,
  ThermometerSun,
  UserCheck,
} from 'lucide-react'

const DEMO_MAIL =
  'mailto:admin@meeyaarcc.com?subject=Book%20a%20Demo%20%E2%80%94%20Meeyar%20Customer%20Care'

const services = [
  {
    icon: PhoneCall,
    title: '24/7 Emergency Dispatching',
    description:
      'Nights, weekends, and holidays covered. We answer every emergency call, triage urgency, and get your tech on the road before the homeowner dials the next contractor.',
  },
  {
    icon: UserCheck,
    title: 'Inbound Lead Qualification',
    description:
      'We screen every caller for service area, job type, and readiness to book — so your team only talks to real jobs, not tire-kickers.',
  },
  {
    icon: ThermometerSun,
    title: 'Outbound Seasonal Recall & Maintenance',
    description:
      'Fill the slow months. We run tune-up and membership campaigns that bring past customers back before peak heat and freeze seasons hit.',
  },
] as const

const integrations = ['ServiceTitan', 'Housecall Pro', 'Jobber'] as const

function App() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-900 text-slate-50">
      <Header />
      <main>
        <Hero />
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
    <header className="absolute inset-x-0 top-0 z-20">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
        <a href="/" className="group flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white transition group-hover:bg-blue-500">
            M
          </span>
          <span className="font-display text-xl tracking-tight text-white sm:text-2xl">
            Meeyar Customer Care
          </span>
        </a>
        <a
          href={DEMO_MAIL}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
        >
          Book a Demo
          <ArrowRight className="h-4 w-4" aria-hidden />
        </a>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=2400&q=80')",
        }}
        role="img"
        aria-label="HVAC technician working on outdoor AC unit"
      />
      <div className="absolute inset-0 bg-slate-950/80" />
      <div className="hero-mesh absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-slate-950/50" />

      <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-5 pb-16 pt-28 sm:px-8 sm:pb-24 lg:justify-center lg:pb-28 lg:pt-32">
        <p className="animate-fade-up font-display text-3xl text-white sm:text-4xl md:text-5xl">
          Meeyar Customer Care
        </p>
        <h1 className="animate-fade-up-delay-1 mt-5 max-w-3xl text-3xl font-semibold leading-[1.15] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[3.25rem]">
          Never Lose an Emergency HVAC Call to a Competitor Again.
        </h1>
        <p className="animate-fade-up-delay-2 mt-5 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
          24/7 call answering, emergency dispatch, and lead qualification built
          for US HVAC contractors — so every after-hours call becomes a booked
          job, not a missed opportunity.
        </p>
        <div className="animate-fade-up-delay-3 mt-8 flex flex-wrap items-center gap-4">
          <a
            href={DEMO_MAIL}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
          >
            Book a Demo
            <ArrowRight className="h-4 w-4" aria-hidden />
          </a>
          <p className="flex items-center gap-2 text-sm text-slate-400">
            <span className="live-dot inline-block h-2 w-2 rounded-full bg-emerald-400" />
            Live US-based answering · meeyaarcc.com
          </p>
        </div>
      </div>
    </section>
  )
}

function Services() {
  return (
    <section id="services" className="relative border-t border-slate-800 bg-slate-900 py-20 sm:py-28">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Built for contractors who can&apos;t afford a missed ring.
        </h2>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg">
          One partner for the calls that matter most — emergencies, inbound
          leads, and seasonal maintenance demand.
        </p>

        <ul className="mt-14 grid gap-12 sm:grid-cols-3 sm:gap-10">
          {services.map(({ icon: Icon, title, description }) => (
            <li key={title} className="group">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600/15 text-blue-400 transition group-hover:bg-blue-600 group-hover:text-white">
                <Icon className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="text-lg font-semibold text-white">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400 sm:text-[0.95rem]">
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
      className="relative border-t border-slate-800 bg-slate-950/60 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600/15 text-blue-400">
              <CalendarSync className="h-5 w-5" aria-hidden />
            </div>
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Books straight into your calendar.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-400 sm:text-lg">
              Direct calendar sync with the platforms your techs already live
              in — no double-entry, no lost appointments.
            </p>
          </div>

          <ul className="flex flex-wrap gap-3 sm:gap-4">
            {integrations.map((name) => (
              <li
                key={name}
                className="rounded-lg border border-slate-700/80 bg-slate-900/80 px-5 py-3 text-sm font-medium tracking-wide text-slate-200 transition hover:border-blue-500/50 hover:text-white"
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function FinalCta() {
  return (
    <section className="relative border-t border-slate-800 py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgb(37_99_235_/_0.15),transparent_60%)]" />
      <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
        <ShieldCheck className="mx-auto h-10 w-10 text-blue-500" aria-hidden />
        <h2 className="mt-6 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Own every emergency call in your market.
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-slate-400 sm:text-lg">
          See how Meeyar Customer Care plugs into your dispatch workflow in a
          short walkthrough tailored to US HVAC shops.
        </p>
        <a
          href={DEMO_MAIL}
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
        >
          Book a Demo
          <ArrowRight className="h-4 w-4" aria-hidden />
        </a>
        <p className="mt-5 text-sm text-slate-500">
          Or email{' '}
          <a
            href="mailto:admin@meeyaarcc.com"
            className="text-slate-300 underline decoration-slate-600 underline-offset-4 transition hover:text-white"
          >
            admin@meeyaarcc.com
          </a>
        </p>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div className="flex items-center gap-2.5">
          <Headphones className="h-4 w-4 text-blue-500" aria-hidden />
          <span className="font-display text-lg text-white">Meeyar Customer Care</span>
        </div>
        <div className="flex flex-col gap-1 text-sm text-slate-500 sm:items-end">
          <a
            href="https://meeyaarcc.com"
            className="transition hover:text-slate-300"
          >
            meeyaarcc.com
          </a>
          <a
            href="mailto:admin@meeyaarcc.com"
            className="transition hover:text-slate-300"
          >
            admin@meeyaarcc.com
          </a>
          <p className="mt-2 text-xs text-slate-600">
            © {new Date().getFullYear()} Meeyar Customer Care. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default App
