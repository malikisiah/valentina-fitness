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
      copyright: "© 2026 FitSoulByVal, Inc. All rights reserved.",
    },
    schedule: {
      title: "Schedule an Intro Session",
      description:
        "We can hop on a call to discuss your fitness goals and how we can help you achieve them.",
    },
    confirm: {
      invalidSession:
        "Invalid session details. Please go back and select a valid session.",
      sessionTitle: "90 min intro session",
      duration: "90 min",
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
    mission: {
      title: "My Mission",
      features: [
        {
          name: "Reconnect With Your Power",
          description:
            "My mission is to help people reconnect with their inner power through exercise and sustainable healthy habits.",
        },
        {
          name: "Real Changes",
          description:
            "I focus on creating realistic lifestyle changes, not quick fixes, so you can feel stronger, more confident, and in control of your life.",
        },
        {
          name: "Built Together",
          description:
            "I'm here to guide, support, and remind you that your strongest version is already within you — we just have to build it together.",
        },
      ],
    },
    about: {
      tagline: "About Me",
      p1: "Hi, I'm Valentina Fernandez — originally from Venezuela, now living in the United States.",
      p2: "I hold a degree in Social Communication, but today I express myself in a different and deeply meaningful way: through fitness, health, and transformation.",
      p3: "My journey led me to become a certified personal trainer and a Fuxion associate, where I combine my passion for communication with my purpose of helping others improve their lives from the inside out.",
      p4: "I believe that fitness is not just about physical change — it's about discovering your true strength, both mentally and physically.",
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
      copyright: "© 2026 FitSoulByVal, Inc. Todos los derechos reservados.",
    },
    schedule: {
      title: "Agenda una Sesión Introductoria",
      description:
        "Podemos hacer una llamada para hablar sobre tus metas de fitness y cómo podemos ayudarte a alcanzarlas.",
    },
    confirm: {
      invalidSession:
        "Detalles de sesión inválidos. Por favor regresa y selecciona una sesión válida.",
      sessionTitle: "Sesión introductoria de 90 min",
      duration: "90 min",
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
    mission: {
      title: "Mi Misión",
      features: [
        {
          name: "Reconecta Con Tu Poder",
          description:
            "Mi misión es ayudar a las personas a reconectarse con su poder interior a través del ejercicio y hábitos saludables sostenibles.",
        },
        {
          name: "Cambios Reales y Duraderos",
          description:
            "Me enfoco en crear cambios de estilo de vida realistas, no soluciones rápidas, para que puedas sentirte más fuerte, más seguro y en control de tu vida.",
        },
        {
          name: "Construido Juntos",
          description:
            "Estoy aquí para guiarte, apoyarte y recordarte que tu versión más fuerte ya está dentro de ti — solo tenemos que construirla juntos.",
        },
      ],
    },
    about: {
      tagline: "Sobre Mí",
      p1: "Hola, soy Valentina Fernández — originalmente de Venezuela, ahora viviendo en los Estados Unidos.",
      p2: "Tengo un título en Comunicación Social, pero hoy me expreso de una manera diferente y profundamente significativa: a través del fitness, la salud y la transformación.",
      p3: "Mi camino me llevó a convertirme en entrenadora personal certificada y asociada de Fuxion, donde combino mi pasión por la comunicación con mi propósito de ayudar a otros a mejorar sus vidas desde adentro hacia afuera.",
      p4: "Creo que el fitness no se trata solo de cambio físico — se trata de descubrir tu verdadera fortaleza, tanto mental como físicamente.",
    },
  },
} as const

export type Translations = (typeof translations)[Locale]

export function getTranslations<L extends Locale>(
  locale: L
): (typeof translations)[L] {
  return translations[locale]
}
