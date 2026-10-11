/**
 * Formación profesional de Joaquín, transcrita de sus constancias.
 *
 * Solo datos documentados: no agregar fechas, horas, niveles ni títulos que no
 * aparezcan en las constancias, ni cambiar los nombres de las instituciones.
 * Haber tomado un curso no implica alianza comercial con la institución, y
 * estas capacitaciones privadas no son títulos oficiales.
 */

export const trainingIntro = [
  "En Joaquín Studio Salon creemos que cada transformación comienza con conocimiento, técnica y creatividad.",
  "Joaquín Victorio Alonzo Gaytán ha desarrollado su preparación profesional mediante cursos, talleres y certificaciones en instituciones especializadas de estilismo, corte, colorimetría, barbería y tratamientos capilares.",
  "Su formación documentada desde 2012 incluye programas de Pivot Point, Paul Mitchell / SGI Focus School, LeBlanc Educación, Tec Italy, Verenize y otras instituciones del sector de la belleza.",
];

export type Specialty = {
  number: string;
  title: string;
  description: string;
  institutions: string;
};

export const specialties: Specialty[] = [
  {
    number: "01",
    title: "Corte y Arquitectura Capilar",
    description:
      "Formación especializada en diseño de cortes femeninos y masculinos, escultura capilar, barbería y arquitectura capilar.",
    institutions: "Pivot Point, LeBlanc Educación y Paul Mitchell / SGI Focus School.",
  },
  {
    number: "02",
    title: "Colorimetría y Mechas",
    description:
      "Preparación en diseño de color, técnicas de mechas y aplicación de métodos de coloración capilar.",
    institutions: "Pivot Point y Mechas y Mechas.",
  },
  {
    number: "03",
    title: "Tratamientos Capilares",
    description:
      "Capacitación en técnicas de aplicación de productos de keratina y tratamientos de belleza capilar.",
    institutions: "Verenize y Brazilian Blowout.",
  },
  {
    number: "04",
    title: "Estilismo y Desarrollo Artístico",
    description:
      "Participación en programas de formación artística, especialización en estilismo y simposios internacionales del sector.",
    institutions: "Tec Italy y SGI Focus School / Paul Mitchell.",
  },
];

export type Course = {
  /** Año o periodo tal como aparece en la constancia */
  period: string;
  title: string;
  institution: string;
  detail: string;
  hours?: string;
};

/** Del más reciente al más antiguo; los cursos sin fecha van al final. */
export const courses: Course[] = [
  {
    period: "2024",
    title: "El Arte del Corte",
    institution: "SGI Advance Focus School / Paul Mitchell.",
    detail:
      "Taller realizado los días 26 y 27 de febrero de 2024 en Tijuana, Baja California.",
  },
  {
    period: "2023–2024",
    title: "Técnicas de Mechas, Nivel Black",
    institution: "Mechas y Mechas.",
    detail: "Formación especializada en técnicas de mechas y tendencias de coloración.",
  },
  {
    period: "2021",
    title: "Escultura Dama",
    institution: "Pivot Point.",
    detail: "Módulo de escultura capilar femenina con enfoque de diseñador.",
    hours: "40 horas acreditadas.",
  },
  {
    period: "2019",
    title: "Escultura Capilar Caballero / Barbería",
    institution: "Pivot Point.",
    detail:
      "Capacitación en escultura capilar masculina y barbería con enfoque de diseñador.",
    hours: "40 horas acreditadas.",
  },
  {
    period: "2018",
    title: "Diseño de Color",
    institution: "Pivot Point.",
    detail: "Módulo de diseño de color con enfoque de diseñador.",
    hours: "40 horas acreditadas.",
  },
  {
    period: "2018",
    title: "Master Certificación Keratin Series",
    institution: "Verenize.",
    detail: "Formación sobre técnicas de uso y aplicación de productos.",
  },
  {
    period: "2016",
    title: "V International Artistic Symposium",
    institution: "Tec Italy Hair Dimension.",
    detail: "Participación en el V Simposio Artístico Internacional.",
  },
  {
    period: "2014",
    title: "Arquitectura Capilar",
    institution: "LeBlanc Educación — Academy & Salon.",
    detail: "Curso concluido satisfactoriamente.",
  },
  {
    period: "2013",
    title: "Brazilian Blowout Academy Training",
    institution: "Brazilian Blowout.",
    detail: "Capacitación profesional documentada.",
  },
  {
    period: "2012–2013",
    title: "Estilismo, Arte, Negocio y Cultura",
    institution: "SGI Focus School / Paul Mitchell.",
    detail:
      "Programa de formación que comprendió tres fases de teoría, práctica y aprendizaje.",
  },
  {
    period: "Sin fecha confirmada",
    title: "Extensiones de Pestañas Mink J.Eyelash",
    institution: "J. Denis.",
    detail:
      "Capacitación en extensiones de pestañas Mink con adhesivo Supreme Quirúrgico.",
  },
];

export type TrainingStat = {
  value: string;
  unit?: string;
  label: string;
  /** Aclaración visible bajo la etiqueta */
  note?: string;
};

export const trainingStats: TrainingStat[] = [
  // Counted from the list so the number never drifts from the timeline.
  { value: String(courses.length), label: "Cursos, programas y formaciones documentadas." },
  {
    value: "120",
    unit: "horas",
    label: "Capacitación acreditada en Pivot Point.",
    // The 120 hours are only the three Pivot Point modules, not all training.
    note: "Tres módulos de 40 horas.",
  },
  { value: "2012–2024", label: "Periodo de formación documentada." },
];

export const trustMessage = {
  title: "Preparación que inspira confianza",
  paragraphs: [
    "Cada técnica aprendida y cada capacitación forman parte del compromiso de Joaquín Studio Salon con la calidad, la creatividad y la atención personalizada.",
    "Nuestro objetivo es comprender tu estilo y ofrecerte una experiencia profesional adaptada a ti.",
  ],
};
