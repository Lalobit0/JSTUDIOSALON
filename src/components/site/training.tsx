import { MessageCircle } from "lucide-react";

import { whatsappBookingLink } from "@/lib/salon";
import {
  courses,
  specialties,
  trainingIntro,
  trainingStats,
  trustMessage,
} from "@/lib/training";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/reveal";
import { Collapsible } from "@/components/site/collapsible";

/**
 * Formación profesional y especialización. Follows "El Estudio" (which
 * introduces Joaquín) and reuses the site's eyebrow, card and button styles.
 */
export function Training() {
  return (
    <section
      id="formacion"
      aria-labelledby="formacion-title"
      className="relative px-5 py-24 sm:px-8 sm:py-32"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="mx-auto max-w-6xl">
        {/* Heading + introduction */}
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="mb-4 inline-flex items-center gap-2 text-xs font-medium tracking-[0.22em] text-gold uppercase sm:tracking-[0.3em]">
            {/* The rule only fits when the eyebrow stays on one line. */}
            <span className="hidden h-px w-8 bg-gold-gradient sm:inline-block" />
            Formación profesional y especialización
          </p>
          <h2
            id="formacion-title"
            className="font-display text-4xl font-medium leading-tight tracking-tight text-foreground text-balance sm:text-5xl"
          >
            La experiencia se construye con conocimiento
          </h2>
          <div className="mt-6 flex flex-col gap-4 text-base leading-relaxed text-muted-foreground text-pretty">
            <p className="text-lg text-foreground/90">{trainingIntro[0]}</p>
            {trainingIntro.slice(1).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Reveal>

        {/* Indicators */}
        <ul className="mx-auto mt-14 grid max-w-4xl gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3">
          {trainingStats.map((stat, i) => (
            <Reveal
              as="li"
              key={stat.label}
              delay={i * 90}
              className="flex flex-col items-center bg-background px-6 py-8 text-center"
            >
              <p className="font-display text-5xl font-medium leading-none text-gold-gradient lining-nums">
                {stat.value}
                {stat.unit && (
                  <span className="ml-2 text-2xl text-gold">{stat.unit}</span>
                )}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-foreground/90">
                {stat.label}
              </p>
              {stat.note && (
                <p className="mt-1 text-xs text-muted-foreground">{stat.note}</p>
              )}
            </Reveal>
          ))}
        </ul>

        {/* Areas of specialization */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {specialties.map((area, i) => (
            <Reveal
              as="article"
              key={area.title}
              delay={(i % 2) * 90}
              className="group relative flex flex-col rounded-2xl border border-border bg-card/60 p-7 backdrop-blur-sm transition-colors duration-300 hover:border-gold/40 sm:p-8"
            >
              <span
                aria-hidden="true"
                className="font-display text-4xl font-medium text-gold/60 lining-nums transition-colors duration-300 group-hover:text-gold"
              >
                {area.number}
              </span>
              <h3 className="mt-4 font-display text-2xl font-medium text-foreground">
                {area.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                {area.description}
              </p>
              <p className="mt-5 border-t border-border/60 pt-4 text-sm text-foreground/85">
                <span className="mr-1 text-xs tracking-[0.2em] text-gold uppercase">
                  Instituciones:
                </span>{" "}
                {area.institutions}
              </p>
            </Reveal>
          ))}
        </div>

        {/* Chronological list of courses, collapsed by default */}
        <Reveal className="mx-auto mt-20 flex max-w-3xl flex-col items-center text-center">
          <h3 className="font-display text-3xl font-medium text-foreground sm:text-4xl">
            Conoce su formación profesional
          </h3>
          <p className="mt-3 text-sm text-muted-foreground">
            Cursos, talleres y certificaciones documentados, del más reciente al
            más antiguo.
          </p>
          <div className="mt-8 flex w-full flex-col items-center">
            <Collapsible
              id="formacion-cursos"
              openLabel="Ver cursos y certificaciones"
              closeLabel="Ocultar cursos y certificaciones"
              trackAs="view_training"
            >
              <ol className="relative mt-10 ml-2 border-l border-gold/25 text-left sm:ml-4">
                {courses.map((course) => (
                  <li
                    key={`${course.period}-${course.title}`}
                    className="relative pb-9 pl-7 last:pb-1 sm:pl-9"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute top-1.5 -left-[5px] size-2.5 rounded-full bg-gold ring-4 ring-background"
                    />
                    <p className="text-xs font-medium tracking-[0.2em] text-gold uppercase">
                      {course.period}
                    </p>
                    <h4 className="mt-1.5 font-display text-xl font-medium text-foreground sm:text-2xl">
                      {course.title}
                    </h4>
                    <p className="mt-1 text-sm text-foreground/85">
                      {course.institution}
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {course.detail}
                    </p>
                    {course.hours && (
                      <p className="mt-2.5 inline-flex rounded-full border border-gold/30 bg-gold/5 px-3 py-1 text-xs text-gold">
                        {course.hours}
                      </p>
                    )}
                  </li>
                ))}
              </ol>
            </Collapsible>
          </div>
        </Reveal>

        {/* Trust message + booking */}
        <Reveal className="mx-auto mt-20 max-w-3xl">
          <div className="relative overflow-hidden rounded-3xl border border-gold/25 bg-card/60 p-8 text-center backdrop-blur-sm sm:p-12">
            <div className="pointer-events-none absolute inset-0 radial-glow" />
            <div className="relative">
              <h3 className="font-display text-3xl font-medium text-gold-gradient sm:text-4xl">
                {trustMessage.title}
              </h3>
              <div className="mx-auto mt-5 flex max-w-2xl flex-col gap-3 text-base leading-relaxed text-muted-foreground">
                {trustMessage.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <Button asChild size="lg" className="mt-8">
                <a href={whatsappBookingLink} target="_blank" rel="noopener noreferrer">
                  <MessageCircle />
                  Agenda tu cita
                </a>
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
