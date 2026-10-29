import { lazy, Suspense, useEffect, useId, useRef, useState } from 'react'
import condenser from './photos/hvac-condenser.jpg'
import furnace from './photos/hvac-furnace.jpg'
import houseNight from './photos/hvac-house-night.jpg'
import outdoor from './photos/hvac-outdoor.jpg'
import twilight from './photos/twilight-ridge.jpg'
const NightScene = lazy(() =>
  import('./scene/NightScene').then((m) => ({ default: m.NightScene })),
)
import {
  CALLS,
  beatAt,
  clamp01,
  sceneState,
  type CallId,
} from './scene/path'

const DEMO_MAIL =
  'mailto:meeyaarcc@gmail.com?subject=Book%20a%20demo%20%E2%80%94%20Meeyaar%20Customer%20Care&body=I%20run%20an%20HVAC%20shop%20and%20want%20a%20walkthrough%20of%20after-hours%20dispatch.'

const CAPTIONS = [
  'The phone rings at 2:14 AM.',
  'We qualify the job.',
  'A tech is rolling.',
] as const

const SERVICES = [
  {
    title: 'Emergency dispatch',
    text: 'Nights, weekends, holidays. Every after-hours ring is triaged and a tech is rolling before the homeowner calls someone else.',
    src: houseNight,
    alt: 'Suburban house at night with one window lit',
    wide: true,
  },
  {
    title: 'Inbound qualification',
    text: 'Service area, job type, booking readiness — screened before it hits the board. Crews talk to real jobs.',
    src: outdoor,
    alt: 'Outdoor condenser beside a brick house wall',
    wide: false,
  },
  {
    title: 'Seasonal recall',
    text: 'Tune-ups and memberships that fill the slow months, before peak heat and freeze.',
    src: furnace,
    alt: 'Basement furnace and ductwork',
    wide: false,
  },
] as const

const CALENDARS = [
  {
    name: 'ServiceTitan',
    text: 'Emergency jobs land on the board your techs already open in the truck.',
    src: condenser,
    alt: 'Rooftop condenser farm',
  },
  {
    name: 'Housecall Pro',
    text: 'After-hours bookings write into the same calendar as the day shift.',
    src: outdoor,
    alt: 'Residential outdoor condenser',
  },
  {
    name: 'Jobber',
    text: 'Qualified leads and recalls without a second inbox to babysit.',
    src: furnace,
    alt: 'Furnace in a utility room',
  },
] as const

function App() {
  const sceneRef = useRef<HTMLElement>(null)
  const [progress, setProgress] = useState(0)
  const [call, setCall] = useState<CallId>('heat')
  const [reduced, setReduced] = useState(false)
  const liveId = useId()

  useEffect(() => {
    sceneState.call = call
  }, [call])

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const reducedMotion = motion.matches
    sceneState.reduced = reducedMotion
    setReduced(reducedMotion)
    const onScroll = () => {
      const el = sceneRef.current
      if (!el) return
      const total = el.offsetHeight - window.innerHeight
      const p = clamp01((-el.getBoundingClientRect().top) / Math.max(1, total))
      sceneState.progress = p
      setProgress(p)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  useEffect(() => {
    const targets = document.querySelectorAll('[data-reveal]')
    if (!targets.length) return
    if (!('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-in'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('is-in')
          io.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.1 },
    )
    targets.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  const beat = beatAt(progress)
  const panelHidden = progress > 0.16

  return (
    <>
      <a className="skip" href="#work">
        Skip to content
      </a>
      <Suspense fallback={null}>
        <NightScene />
      </Suspense>

      <header className="site-header wrap">
        <div className="nav">
          <a className="brand" href="/">
            <span className="brand-mark" aria-hidden="true">
              M
            </span>
            <span className="brand-name">Meeyaar Customer Care</span>
          </a>
          <nav className="nav-links" aria-label="Primary">
            <a href="#work">Work</a>
            <a href="#dispatch">Dispatch</a>
            <a href="#calendar">Calendar</a>
          </nav>
          <a className="button" href={DEMO_MAIL}>
            Book a demo
          </a>
        </div>
      </header>

      <main>
        <section
          ref={sceneRef}
          className="fly"
          aria-label="From ring to driveway"
        >
          <div className="scene-stage">
            <div
              className="hero-panel"
              hidden={panelHidden}
            >
              <div className="hero-copy">
                <h1 className="display" data-rise style={{ '--i': 0 } as never}>
                  Night dispatch
                </h1>
                <p className="lead" data-rise style={{ '--i': 1 } as never}>
                  Meeyaar Customer Care answers the 2 AM no-heat ring for US HVAC
                  shops and gets a tech on the driveway.
                </p>
                <fieldset className="hero-live" data-rise style={{ '--i': 2 } as never}>
                  <legend id={liveId}>Tonight’s call</legend>
                  {CALLS.map((item) => (
                    <label key={item.id}>
                      <input
                        type="radio"
                        name="tonight"
                        value={item.id}
                        checked={call === item.id}
                        onChange={() => setCall(item.id)}
                        aria-describedby={liveId}
                      />
                      <span>{item.label}</span>
                      <span className="nums muted">{item.time}</span>
                    </label>
                  ))}
                </fieldset>
              </div>
              <div className="hero-actions" data-rise style={{ '--i': 3 } as never}>
                <a className="link-plain" href="#dispatch">
                  See dispatch
                </a>
              </div>
            </div>

            <div
              className="captions"
              aria-live="polite"
              hidden={!panelHidden && !reduced}
            >
              <h2 className="caption-title">From ring to driveway</h2>
              {reduced ? (
                CAPTIONS.map((line) => (
                  <p key={line} className="caption is-on">
                    {line}
                  </p>
                ))
              ) : (
                <p className="caption is-on">{CAPTIONS[beat]}</p>
              )}
            </div>
          </div>
        </section>

        <section id="dispatch" className="paper features wrap">
          <div className="grid">
            <div className="features-head" data-reveal>
              <h2 className="head">What we run at night</h2>
              <p className="lead" style={{ marginTop: '1.25rem' }}>
                Three desks, one night: the emergency ring, the inbound job, and
                the recall that fills the slow months.
              </p>
            </div>
            <ul className="tiles">
              {SERVICES.map((item, i) => (
                <li
                  key={item.title}
                  className={item.wide ? 'tile tile-wide' : 'tile'}
                  data-reveal
                  style={{ transitionDelay: `${i * 70}ms` }}
                >
                  <figure className="tile-frame shutter">
                    <img
                      src={item.src}
                      alt={item.alt}
                      width={1200}
                      height={item.wide ? 750 : 1500}
                    />
                  </figure>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="work" className="paper showcase wrap">
          <div className="grid">
            <figure className="showcase-photo shutter" data-reveal>
              <div className="plate">
                <img
                  src={condenser}
                  alt="Rows of rooftop air-conditioner condensers"
                  width={1600}
                  height={1600}
                />
              </div>
            </figure>
            <div className="showcase-copy" data-reveal>
              <div>
                <h2 className="head">What we keep moving</h2>
                <p className="lead" style={{ marginTop: '1.5rem' }}>
                  Emergencies, installs, peak season. The work on the roof is
                  yours. The 2 AM phone is ours.
                </p>
              </div>
              <div className="showcase-actions">
                <a className="cell cell-ink" href={DEMO_MAIL}>
                  Book a demo
                </a>
                <a className="cell cell-soft" href="#calendar">
                  See calendar
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="calendar" className="paper list wrap">
          <div className="grid">
            <div className="list-head" data-reveal>
              <h2 className="head">Lands in your calendar</h2>
              <p className="list-count">3 boards</p>
            </div>
            <ul className="menu">
              {CALENDARS.map((item, i) => (
                <li
                  key={item.name}
                  className="menu-item"
                  data-reveal
                  style={{ transitionDelay: `${i * 70}ms` }}
                >
                  <span className="bullet">
                    <img src={item.src} alt="" width={128} height={128} />
                  </span>
                  <div>
                    <h3>{item.name}</h3>
                    <p>{item.text}</p>
                  </div>
                </li>
              ))}
            </ul>
            <figure className="list-plate shutter" data-reveal>
              <img
                src={condenser}
                alt="Rooftop condensers waiting on a commercial roof"
                width={1200}
                height={1500}
              />
            </figure>
          </div>
        </section>

        <section className="paper wrap rest" aria-label="Night">
          <figure className="rest-sky shutter" data-reveal>
            <img
              src={twilight}
              alt="Silhouetted ridge under a twilight sky"
              width={1600}
              height={1000}
            />
          </figure>
        </section>

        <a className="cta-band" href={DEMO_MAIL} aria-label="Book a demo">
          <div className="cta-top">
            <p>A short walkthrough for HVAC shops.</p>
            <svg className="arrow" viewBox="0 0 48 48" aria-hidden="true">
              <path
                d="M12 36 L36 12 M20 12 H36 V28"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              />
            </svg>
          </div>
          <p className="cta-word">Book</p>
        </a>
      </main>

      <footer className="site-footer">
        <p className="sr-only">Meeyaar</p>
        <div className="mark" aria-hidden="true">
          {'MEEYAAR'.split('').map((ch, i) => (
            <span key={i}>{ch}</span>
          ))}
        </div>
        <div className="foot-grid">
          <nav className="foot-links" aria-label="Footer">
            <a href="#work">Work</a>
            <a href="#dispatch">Dispatch</a>
            <a href="#calendar">Calendar</a>
            <a href={DEMO_MAIL}>Book a demo</a>
          </nav>
          <div className="foot-contact">
            <a href="https://meeyaarcc.com">meeyaarcc.com</a>
            <a href="mailto:meeyaarcc@gmail.com">meeyaarcc@gmail.com</a>
          </div>
        </div>
        <div className="foot-end">
          <p className="credits">
            Night skies: Lee Scott, Grant McIver, Josh Felise, Marcelo Quinan
            (Unsplash). HVAC stills generated for this page. ©{' '}
            {new Date().getFullYear()} Meeyaar Customer Care
          </p>
          <a className="button button-mint" href={DEMO_MAIL}>
            Book a demo
          </a>
        </div>
      </footer>
    </>
  )
}

export default App
