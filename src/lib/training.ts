/**
 * Formación profesional de Joaquín, transcrita de sus constancias.
 *
 * Solo datos documentados: no agregar fechas, horas, niveles ni títulos que no
 * aparezcan en las constancias, ni cambiar los nombres de las instituciones.
 * Haber tomado un curso no implica alianza comercial con la institución, y
 * estas capacitaciones privadas no son títulos oficiales.
 *
 * Los nombres de los cursos se dejan como aparecen en la constancia también
 * en inglés; solo se traduce la descripción.
 */

import type { Localized } from "@/lib/i18n";

export const trainingIntro: Localized<string[]> = {
  es: [
    "En Joaquín Studio Salon creemos que cada transformación comienza con conocimiento, técnica y creatividad.",
    "Joaquín Victorio Alonzo Gaytán ha desarrollado su preparación profesional mediante cursos, talleres y certificaciones en instituciones especializadas de estilismo, corte, colorimetría, barbería y tratamientos capilares.",
    "Su formación documentada desde 2012 incluye programas de Pivot Point, Paul Mitchell / SGI Focus School, LeBlanc Educación, Tec Italy, Verenize y otras instituciones del sector de la belleza.",
  ],
  en: [
    "At Joaquín Studio Salon, we believe every transformation starts with knowledge, technique and creativity.",
    "Joaquín Victorio Alonzo Gaytán has built his professional preparation through courses, workshops and certifications at institutions specializing in styling, cutting, color theory, barbering and hair treatments.",
    "His documented training since 2012 includes programs from Pivot Point, Paul Mitchell / SGI Focus School, LeBlanc Educación, Tec Italy, Verenize and other beauty-industry institutions.",
  ],
};

export type Specialty = {
  number: string;
  title: Localized;
  description: Localized;
  institutions: Localized;
};

export const specialties: Specialty[] = [
  {
    number: "01",
    title: { es: "Corte y Arquitectura Capilar", en: "Cutting & Hair Architecture" },
    description: {
      es: "Formación especializada en diseño de cortes femeninos y masculinos, escultura capilar, barbería y arquitectura capilar.",
      en: "Specialized training in women's and men's haircut design, hair sculpting, barbering and hair architecture.",
    },
    institutions: {
      es: "Pivot Point, LeBlanc Educación y Paul Mitchell / SGI Focus School.",
      en: "Pivot Point, LeBlanc Educación and Paul Mitchell / SGI Focus School.",
    },
  },
  {
    number: "02",
    title: { es: "Colorimetría y Mechas", en: "Color Theory & Highlights" },
    description: {
      es: "Preparación en diseño de color, técnicas de mechas y aplicación de métodos de coloración capilar.",
      en: "Training in color design, highlighting techniques and hair coloring methods.",
    },
    institutions: {
      es: "Pivot Point y Mechas y Mechas.",
      en: "Pivot Point and Mechas y Mechas.",
    },
  },
  {
    number: "03",
    title: { es: "Tratamientos Capilares", en: "Hair Treatments" },
    description: {
      es: "Capacitación en técnicas de aplicación de productos de keratina y tratamientos de belleza capilar.",
      en: "Training in keratin product application techniques and hair beauty treatments.",
    },
    institutions: {
      es: "Verenize y Brazilian Blowout.",
      en: "Verenize and Brazilian Blowout.",
    },
  },
  {
    number: "04",
    title: { es: "Estilismo y Desarrollo Artístico", en: "Styling & Artistic Development" },
    description: {
      es: "Participación en programas de formación artística, especialización en estilismo y simposios internacionales del sector.",
      en: "Participation in artistic training programs, styling specialization and international industry symposiums.",
    },
    institutions: {
      es: "Tec Italy y SGI Focus School / Paul Mitchell.",
      en: "Tec Italy and SGI Focus School / Paul Mitchell.",
    },
  },
];

export type Course = {
  /** Año o periodo tal como aparece en la constancia; sin él, "sin fecha" */
  period?: string;
  title: string;
  institution: string;
  detail: Localized;
  hours?: Localized;
};

const pivotHours = { es: "40 horas acreditadas.", en: "40 accredited hours." };

/** Del más reciente al más antiguo; los cursos sin fecha van al final. */
export const courses: Course[] = [
  {
    period: "2024",
    title: "El Arte del Corte",
    institution: "SGI Advance Focus School / Paul Mitchell.",
    detail: {
      es: "Taller realizado los días 26 y 27 de febrero de 2024 en Tijuana, Baja California.",
      en: "Workshop held on February 26 and 27, 2024, in Tijuana, Baja California.",
    },
  },
  {
    period: "2023–2024",
    title: "Técnicas de Mechas, Nivel Black",
    institution: "Mechas y Mechas.",
    detail: {
      es: "Formación especializada en técnicas de mechas y tendencias de coloración.",
      en: "Specialized training in highlighting techniques and color trends.",
    },
  },
  {
    period: "2021",
    title: "Escultura Dama",
    institution: "Pivot Point.",
    detail: {
      es: "Módulo de escultura capilar femenina con enfoque de diseñador.",
      en: "Women's hair sculpting module with a designer approach.",
    },
    hours: pivotHours,
  },
  {
    period: "2019",
    title: "Escultura Capilar Caballero / Barbería",
    institution: "Pivot Point.",
    detail: {
      es: "Capacitación en escultura capilar masculina y barbería con enfoque de diseñador.",
      en: "Training in men's hair sculpting and barbering with a designer approach.",
    },
    hours: pivotHours,
  },
  {
    period: "2018",
    title: "Diseño de Color",
    institution: "Pivot Point.",
    detail: {
      es: "Módulo de diseño de color con enfoque de diseñador.",
      en: "Color design module with a designer approach.",
    },
    hours: pivotHours,
  },
  {
    period: "2018",
    title: "Master Certificación Keratin Series",
    institution: "Verenize.",
    detail: {
      es: "Formación sobre técnicas de uso y aplicación de productos.",
      en: "Training in product use and application techniques.",
    },
  },
  {
    period: "2016",
    title: "V International Artistic Symposium",
    institution: "Tec Italy Hair Dimension.",
    detail: {
      es: "Participación en el V Simposio Artístico Internacional.",
      en: "Participation in the 5th International Artistic Symposium.",
    },
  },
  {
    period: "2014",
    title: "Arquitectura Capilar",
    institution: "LeBlanc Educación — Academy & Salon.",
    detail: {
      es: "Curso concluido satisfactoriamente.",
      en: "Course successfully completed.",
    },
  },
  {
    period: "2013",
    title: "Brazilian Blowout Academy Training",
    institution: "Brazilian Blowout.",
    detail: {
      es: "Capacitación profesional documentada.",
      en: "Documented professional training.",
    },
  },
  {
    period: "2012–2013",
    title: "Estilismo, Arte, Negocio y Cultura",
    institution: "SGI Focus School / Paul Mitchell.",
    detail: {
      es: "Programa de formación que comprendió tres fases de teoría, práctica y aprendizaje.",
      en: "Training program made up of three phases of theory, practice and learning.",
    },
  },
  {
    title: "Extensiones de Pestañas Mink J.Eyelash",
    institution: "J. Denis.",
    detail: {
      es: "Capacitación en extensiones de pestañas Mink con adhesivo Supreme Quirúrgico.",
      en: "Training in mink eyelash extensions with Supreme Quirúrgico adhesive.",
    },
  },
];

export type TrainingStat = {
  value: string;
  unit?: Localized;
  label: Localized;
  /** Aclaración visible bajo la etiqueta */
  note?: Localized;
};

export const trainingStats: TrainingStat[] = [
  // Counted from the list so the number never drifts from the timeline.
  {
    value: String(courses.length),
    label: {
      es: "Cursos, programas y formaciones documentadas.",
      en: "Documented courses, programs and trainings.",
    },
  },
  {
    value: "120",
    unit: { es: "horas", en: "hours" },
    label: {
      es: "Capacitación acreditada en Pivot Point.",
      en: "Accredited training at Pivot Point.",
    },
    // The 120 hours are only the three Pivot Point modules, not all training.
    note: { es: "Tres módulos de 40 horas.", en: "Three 40-hour modules." },
  },
  {
    value: "2012–2024",
    label: {
      es: "Periodo de formación documentada.",
      en: "Period of documented training.",
    },
  },
];

export const trustMessage: Localized<{ title: string; paragraphs: string[] }> = {
  es: {
    title: "Preparación que inspira confianza",
    paragraphs: [
      "Cada técnica aprendida y cada capacitación forman parte del compromiso de Joaquín Studio Salon con la calidad, la creatividad y la atención personalizada.",
      "Nuestro objetivo es comprender tu estilo y ofrecerte una experiencia profesional adaptada a ti.",
    ],
  },
  en: {
    title: "Preparation you can trust",
    paragraphs: [
      "Every technique learned and every training is part of Joaquín Studio Salon's commitment to quality, creativity and personal attention.",
      "Our goal is to understand your style and offer you a professional experience tailored to you.",
    ],
  },
};
