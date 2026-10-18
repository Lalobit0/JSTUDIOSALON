import { ClipboardCheck, MessageCircle } from "lucide-react";

import { whatsappBookingLink, whatsappDiagnosisLink } from "@/lib/salon";
import type { Locale } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/reveal";

const copy = {
  es: {
    title: "Color y tratamientos: precio exacto tras un diagnóstico",
    text: "Cada cabello es distinto. Por eso no damos precios ni diagnósticos de color y tratamientos por WhatsApp, teléfono o redes sociales. Agenda tu cita de diagnóstico: en el salón revisamos el estado de tu cabello, te decimos si el servicio que buscas es el adecuado y te damos el precio exacto.",
    diagnosis: "Agendar diagnóstico",
    other: "Agendar otro servicio",
  },
  en: {
    title: "Color and treatments: an exact price after a diagnosis",
    text: "Every head of hair is different. That's why we don't give color or treatment prices or diagnoses over WhatsApp, phone or social media. Book your diagnosis appointment: at the salon we check your hair's condition, tell you whether the service you want is right for you and give you the exact price.",
    diagnosis: "Book a diagnosis",
    other: "Book another service",
  },
} satisfies Record<Locale, unknown>;

/**
 * Color and treatments are not quoted by message: the exact price comes after
 * an in-salon diagnosis (confirmed by the owner). Shown under the price list.
 */
export function PriceNotice({
  lang,
  withOtherService = true,
  className,
}: {
  lang: Locale;
  /** Second button for services that are booked straight from the list */
  withOtherService?: boolean;
  className?: string;
}) {
  const t = copy[lang];
  return (
    <Reveal className={className}>
      <div className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl border border-gold/25 bg-card/60 p-7 text-center backdrop-blur-sm sm:p-10">
        <div className="pointer-events-none absolute inset-0 radial-glow" />
        <div className="relative flex flex-col items-center">
          <span className="flex size-12 items-center justify-center rounded-full border border-gold/30 bg-gold/5 text-gold">
            <ClipboardCheck className="size-5" />
          </span>
          <h3 className="mt-5 font-display text-2xl font-medium text-foreground text-balance sm:text-3xl">
            {t.title}
          </h3>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground text-pretty sm:text-base">
            {t.text}
          </p>
          <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row">
            <Button asChild size="lg">
              <a href={whatsappDiagnosisLink[lang]} target="_blank" rel="noopener noreferrer">
                <MessageCircle />
                {t.diagnosis}
              </a>
            </Button>
            {withOtherService && (
              <Button asChild size="lg" variant="outline">
                <a href={whatsappBookingLink[lang]} target="_blank" rel="noopener noreferrer">
                  {t.other}
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </Reveal>
  );
}
