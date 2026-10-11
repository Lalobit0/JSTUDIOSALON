import { MessageCircle } from "lucide-react";

import { whatsappBookingLink } from "@/lib/salon";
import type { Locale } from "@/lib/i18n";
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

const copy = {
  es: {
    eyebrow: "Formación profesional y especialización",
    title: "La experiencia se construye con conocimiento",
    institutions: "Instituciones:",
    coursesTitle: "Conoce su formación profesional",
    coursesIntro:
      "Cursos, talleres y certificaciones documentados, del más reciente al más antiguo.",
    open: "Ver cursos y certificaciones",
    close: "Ocultar cursos y certificaciones",
    noDate: "Sin fecha confirmada",
    book: "Agenda tu cita",
  },
  en: {
    eyebrow: "Professional training & specialization",
    title: "Experience is built on knowledge",
    institutions: "Institutions:",
    coursesTitle: "Explore his professional training",
    coursesIntro:
      "Documented courses, workshops and certifications, from most recent to oldest. Course names appear as written on each certificate.",
    open: "View courses and certifications",
    close: "Hide courses and certifications",
    noDate: "Date not confirmed",
    book: "Book your appointment",
  },
} satisfies Record<Locale, unknown>;

/**
 * Formación profesional y especialización. Follows "El Estudio" (which
 * introduces Joaquín) and reuses the site's eyebrow, card and button styles.
 */
export function Training({ lang }: { lang: Locale }) {
  const t = copy[lang];
  const intro = trainingIntro[lang];
  const trust = trustMessage[lang];
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
            {t.eyebrow}
          </p>
          <h2
            id="formacion-title"
            className="font-display text-4xl font-medium leading-tight tracking-tight text-foreground text-balance sm:text-5xl"
          >
            {t.title}
          </h2>
          <div className="mt-6 flex flex-col gap-4 text-base leading-relaxed text-muted-foreground text-pretty">
            <p className="text-lg text-foreground/90">{intro[0]}</p>
            {intro.slice(1).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Reveal>

        {/* Indicators */}
        <ul className="mx-auto mt-14 grid max-w-4xl gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3">
          {trainingStats.map((stat, i) => (
            <Reveal
              as="li"
              key={stat.label.es}
              delay={i * 90}
              className="flex flex-col items-center bg-background px-6 py-8 text-center"
            >
              <p className="font-display text-5xl font-medium leading-none text-gold-gradient lining-nums">
                {stat.value}
                {stat.unit && (
                  <span className="ml-2 text-2xl text-gold">{stat.unit[lang]}</span>
                )}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-foreground/90">
                {stat.label[lang]}
              </p>
              {stat.note && (
                <p className="mt-1 text-xs text-muted-foreground">{stat.note[lang]}</p>
              )}
            </Reveal>
          ))}
        </ul>

        {/* Areas of specialization */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {specialties.map((area, i) => (
            <Reveal
              as="article"
              key={area.number}
              delay={(i % 2) * 90}
              className="group relative flex flex-col rounded-2xl border border-border bg-card/60 p-7 backdrop-blur-sm transition-colors duration-300 hover:border-gold/40 sm:p-8"
            >
              <span
                aria-hidden="true"
                className="font-display text-4xl font-medium text-gold/60 lining-nums transition-colors duration-300 group-hover:text-gold light:text-gold/80"
              >
                {area.number}
              </span>
              <h3 className="mt-4 font-display text-2xl font-medium text-foreground">
                {area.title[lang]}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                {area.description[lang]}
              </p>
              <p className="mt-5 border-t border-border/60 pt-4 text-sm text-foreground/85">
                <span className="mr-1 text-xs tracking-[0.2em] text-gold uppercase">
                  {t.institutions}
                </span>{" "}
                {area.institutions[lang]}
              </p>
            </Reveal>
          ))}
        </div>

        {/* Chronological list of courses, collapsed by default */}
        <Reveal className="mx-auto mt-20 flex max-w-3xl flex-col items-center text-center">
          <h3 className="font-display text-3xl font-medium text-foreground sm:text-4xl">
            {t.coursesTitle}
          </h3>
          <p className="mt-3 text-sm text-muted-foreground">{t.coursesIntro}</p>
          <div className="mt-8 flex w-full flex-col items-center">
            <Collapsible
              id="formacion-cursos"
              openLabel={t.open}
              closeLabel={t.close}
              trackAs="view_training"
            >
              <ol className="relative mt-10 ml-2 border-l border-gold/25 text-left sm:ml-4">
                {courses.map((course) => (
                  <li
                    key={course.title}
                    className="relative pb-9 pl-7 last:pb-1 sm:pl-9"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute top-1.5 -left-[5px] size-2.5 rounded-full bg-gold ring-4 ring-background"
                    />
                    <p className="text-xs font-medium tracking-[0.2em] text-gold uppercase">
                      {course.period ?? t.noDate}
                    </p>
                    <h4 className="mt-1.5 font-display text-xl font-medium text-foreground sm:text-2xl">
                      {course.title}
                    </h4>
                    <p className="mt-1 text-sm text-foreground/85">
                      {course.institution}
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {course.detail[lang]}
                    </p>
                    {course.hours && (
                      <p className="mt-2.5 inline-flex rounded-full border border-gold/30 bg-gold/5 px-3 py-1 text-xs text-gold">
                        {course.hours[lang]}
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
                {trust.title}
              </h3>
              <div className="mx-auto mt-5 flex max-w-2xl flex-col gap-3 text-base leading-relaxed text-muted-foreground">
                {trust.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <Button asChild size="lg" className="mt-8">
                <a href={whatsappBookingLink[lang]} target="_blank" rel="noopener noreferrer">
                  <MessageCircle />
                  {t.book}
                </a>
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
