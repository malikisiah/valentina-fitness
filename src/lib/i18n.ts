import { headers } from "next/headers"

export type Locale = "en" | "es"

export async function getLocale(): Promise<Locale> {
  const h = await headers()
  const lang = h.get("accept-language") ?? ""
  return lang.startsWith("es") ? "es" : "en"
}

const translations = {
  en: {
    nav: {
      home: "Home",
      schedule: "Schedule",
      about: "About Me",
    },
    hero: {
      tagline: "By Val",
      description:
        "A new way to build your body and mind. Get fit, stay healthy, and feel great with our expert-led fitness programs and personalized coaching.",
      learnMore: "Learn More",
      bookSession: "Book Session",
    },
    footer: {
      about: "About",
      contact: "Contact",
      privacy: "Privacy",
      copyright: "© 2026 Valentina Fitness, Inc. All rights reserved.",
    },
    schedule: {
      title: "Schedule an Intro Session",
      description:
        "We can hop on a call to discuss your fitness goals and how we can help you achieve them.",
    },
    confirm: {
      invalidSession:
        "Invalid session details. Please go back and select a valid session.",
      sessionTitle: "30 min intro session",
      duration: "30 min",
      videoCall: "Video call",
      nameLabel: "Name",
      namePlaceholder: "Your name",
      emailLabel: "Email",
      emailPlaceholder: "you@example.com",
      notesLabel: "Notes",
      notesPlaceholder: "Anything you'd like me to know before our session?",
      back: "Back",
      toCalendly: "To Calendly",
      calendlyNotice:
        "Clicking To Calendly will open Calendly in a new tab with your name, email, and selected time pre-filled — you won't need to re-enter anything. Review the details there and confirm to finalize your booking.",
    },
  },
  es: {
    nav: {
      home: "Inicio",
      schedule: "Agenda",
      about: "Sobre Mí",
    },
    hero: {
      tagline: "Por Val",
      description:
        "Una nueva forma de desarrollar tu cuerpo y mente. Ponte en forma, mantente saludable y siéntete genial con nuestros programas de fitness dirigidos por expertos y coaching personalizado.",
      learnMore: "Saber Más",
      bookSession: "Reservar Sesión",
    },
    footer: {
      about: "Acerca de",
      contact: "Contacto",
      privacy: "Privacidad",
      copyright:
        "© 2026 Valentina Fitness, Inc. Todos los derechos reservados.",
    },
    schedule: {
      title: "Agenda una Sesión Introductoria",
      description:
        "Podemos hacer una llamada para hablar sobre tus metas de fitness y cómo podemos ayudarte a alcanzarlas.",
    },
    confirm: {
      invalidSession:
        "Detalles de sesión inválidos. Por favor regresa y selecciona una sesión válida.",
      sessionTitle: "Sesión introductoria de 30 min",
      duration: "30 min",
      videoCall: "Videollamada",
      nameLabel: "Nombre",
      namePlaceholder: "Tu nombre",
      emailLabel: "Correo electrónico",
      emailPlaceholder: "tu@ejemplo.com",
      notesLabel: "Notas",
      notesPlaceholder: "¿Algo que quieras que sepa antes de nuestra sesión?",
      back: "Regresar",
      toCalendly: "Ir a Calendly",
      calendlyNotice:
        "Al hacer clic en Ir a Calendly se abrirá Calendly en una nueva pestaña con tu nombre, correo y hora seleccionada ya ingresados — no necesitarás volver a escribir nada. Revisa los detalles allí y confirma para finalizar tu reserva.",
    },
  },
} as const

export type Translations = (typeof translations)[Locale]

export function getTranslations<L extends Locale>(locale: L): (typeof translations)[L] {
  return translations[locale]
}
