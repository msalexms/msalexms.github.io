/**
 * portfolioData.js
 *
 * ARCHIVO CENTRAL DE DATOS DEL PORTAFOLIO
 * Toda la información personal, proyectos, experiencia, etc.
 * se define aquí en ambos idiomas (ES/EN).
 *
 * Para personalizar: modifica los valores dentro de cada objeto.
 * Los campos con { es: "...", en: "..." } son bilingües.
 */

export const portfolioData = {
  general: {
    es: {
      name: "Alejandro Martín Sánchez",
      role: "Ingeniero de Software · Sistemas Embebidos y Edge AI",
      slogan: "From silicon to the cloud, every layer matters.",
      email: "msalejandroms@gmail.com",
      location: "Madrid, España",
    },
    en: {
      name: "Alejandro Martín Sánchez",
      role: "Software Engineer · Embedded Systems & Edge AI",
      slogan: "From silicon to the cloud, every layer matters.",
      email: "msalejandroms@gmail.com",
      location: "Madrid, Spain",
    },
  },

  social: {
    github: "https://github.com/msalexms",
    linkedin: "https://linkedin.com/in/alejandro-martin-sanchez-ams",
  },

  hero: {
    es: {
      greeting: "¡Hola! Soy",
      ctaPrimary: "Ver Experiencia",
      ctaSecondary: "Contactar",
    },
    en: {
      greeting: "Hello! I'm",
      ctaPrimary: "View Experience",
      ctaSecondary: "Get in Touch",
    },
  },

  about: {
    es: {
      title: "Sobre Mí",
      paragraphs: [
        "Soy ingeniero de software especializado en backend, sistemas embebidos e IA aplicada. Actualmente trabajo en Indra desarrollando el sistema nacional de radares de tráfico del Reino Unido (NECS), un entorno crítico de alta disponibilidad (24/7) donde la fiabilidad es fundamental y no hay margen de error.",
        "Me apasiona la intersección entre el software y el hardware: programar microcontroladores, desplegar modelos de Machine Learning en dispositivos edge con recursos limitados (tanto de memoria como de energía) y hacer que las cosas funcionen más allá de la nube. He trabajado en investigación aplicada, automatización industrial y sistemas de misión crítica, y si algo he aprendido en todos estos entornos es la importancia de entender a fondo el problema antes de escribir una sola línea de código.",
        "Fuera del trabajo me entretengo trasteando con mi homelab, montando sensores para Home Assistant, siguiendo la Fórmula 1, entrenando en el gimnasio o dando un paseo para desconectar. Y, por supuesto, tengo un gato que se encarga de supervisar atentamente todo lo que hago.",
      ],
    },
    en: {
      title: "About Me",
      paragraphs: [
        "I'm a software engineer focused on backend development, embedded systems, and applied AI. Right now I'm working at Indra on the UK's National Enforcement Camera System (NECS) — a safety-critical system that runs 24/7, where reliability isn't optional.",
        "What draws me most is where software meets real hardware: programming microcontrollers, deploying ML models on memory and power-constrained edge devices, making things work outside the cloud. I've gone through applied research, industrial automation, and mission-critical systems — and in every case what I've enjoyed most is understanding the actual problem before writing a single line of code.",
        "Outside of work I tinker with my homelab, build sensors for Home Assistant, follow Formula 1, hit the gym, and go for walks when I need to clear my head. I also have a cat who supervises everything from above.",
      ],
    },
  },

  experience: {
    es: { title: "Experiencia Laboral" },
    en: { title: "Work Experience" },
    items: [
      {
        role: { es: "Desarrollador de Software", en: "Software Developer" },
        company: "Indra",
        period: { es: "May 2025 – Presente", en: "May 2025 – Present" },
        projectLink: "https://www.indracompany.com/en/mobile-fixed-radars",
        description: {
          es: "Desarrollo y mantenimiento del backend para el sistema nacional de radares de tráfico del Reino Unido (NECS). Utilizo Java y Spring Boot para conectar el hardware de los radares con las plataformas de gestión de infracciones (cloud y on-premise), mientras que empleo C++ para los procesos de bajo nivel y tiempo real, donde la precisión es innegociable. Todo el entorno funciona sobre Linux, e integro algoritmos de visión artificial para la detección y clasificación de vehículos en un sistema que procesa datos de forma ininterrumpida en todo el país.",
          en: "Working on the backend that keeps the UK's National Enforcement Camera System running. Java and Spring Boot connect the radar hardware to cloud and on-premise traffic management platforms, while C++ handles the low-level, real-time parts where errors aren't an option. Everything runs on Linux, and I use computer vision techniques for vehicle detection and classification — a system processing real enforcement data, continuously, across the country.",
        },
        technologies: ["Java", "Spring Boot", "C++", "Linux", "Computer Vision"],
      },
      {
        role: { es: "Ingeniero IoT Junior", en: "IoT Junior Engineer" },
        company: "Moeve (Innovation Center)",
        period: { es: "Sep 2024 – Mar 2025", en: "Sep 2024 – Mar 2025" },
        description: {
          es: "Desarrollé el software de control para un hangar de drones autónomos: un backend en Python ejecutado en una SBC que actúa como máquina de estados tolerante a fallos, integrando protocolos industriales como MQTT, Modbus, RS-485 e I2C. Además, diseñé el pipeline de automatización para una línea de procesamiento químico utilizando Node-RED e InfluxDB, junto con paneles interactivos en Grafana que los operarios de la planta utilizan en su día a día.",
          en: "Built the control software for an autonomous drone hangar — a fault-tolerant state machine handling everything from hardware handshakes to safe failure modes, pulling together MQTT, Modbus, RS-485, and I2C into a single Python backend on an SBC. I also designed the automation pipeline for a chemical processing line: Node-RED for the logic, InfluxDB for storage, and Grafana dashboards that plant operators now check every day.",
        },
        technologies: ["Python", "Java", "MQTT", "Modbus", "I2C", "Node-RED", "InfluxDB", "Grafana"],
      },
      {
        role: { es: "Investigador – IA Aplicada a IoT", en: "AI Applied to IoT Researcher" },
        company: "Colaboración con Moeve",
        period: { es: "Oct 2023 – Jul 2024", en: "Oct 2023 – Jul 2024" },
        description: {
          es: "Optimización y despliegue de modelos de visión por computador en hardware con recursos muy limitados, como Raspberry Pi, Jetson y microcontroladores ESP32. Apliqué técnicas de compresión de modelos usando PyTorch para exprimir al máximo el rendimiento en el edge sin disparar el consumo energético. El objetivo principal fue lograr inferencia en tiempo real en entornos inteligentes donde depender de la nube no era viable.",
          en: "Researched and deployed computer vision models on hardware that wasn't designed for them — Raspberry Pi, Jetson, and ESP32 microcontrollers with tight power and memory budgets. Used model compression techniques in PyTorch to squeeze performance out of edge devices without killing efficiency. The goal was making real-time inference work where cloud connectivity isn't an option.",
        },
        technologies: ["Python", "PyTorch", "C++", "ESP-IDF", "Edge AI", "Raspberry Pi", "Jetson"],
      },
      {
        role: { es: "Becario de Ingeniería de Software", en: "Software Engineering Intern" },
        company: "Intelligent Data",
        period: { es: "Feb 2024 – May 2024", en: "Feb 2024 – May 2024" },
        description: {
          es: "Desarrollo de aplicaciones Android en Java orientadas al sector sanitario. Me encargué de la integración con dispositivos médicos IoT para la monitorización de constantes vitales de los pacientes en tiempo real.",
          en: "Developed Android apps in Java for healthcare, integrating IoT medical devices for real-time patient monitoring.",
        },
        technologies: ["Java", "Android", "IoT"],
      },
    ],
  },

  projects: {
    es: { title: "Proyectos Destacados", subtitle: "Herramientas que he construido por curiosidad, pura necesidad o porque no existía nada parecido" },
    en: { title: "Featured Projects", subtitle: "Things I built out of curiosity, necessity, or because something didn't exist yet" },
    items: [
      {
        title: "MoM — Message Of the Day Manager",
        description: {
          es: "El MOTD (Mensaje del Día) por defecto de Linux siempre me pareció un espacio desaprovechado, así que decidí crear algo realmente útil. MoM es una TUI (Interfaz de Terminal) interactiva escrita en Go que transforma el aburrido mensaje de bienvenida en un completo panel de control del sistema. Cuenta con 32 módulos configurables, soporte para temas, perfiles y un sistema de rollback automático por si algo se rompe al configurar. Está construido sobre el ecosistema de Charmbracelet y es la herramienta principal que uso en mis propios servidores.",
          en: "The default MOTD always felt like a wasted opportunity, so I replaced it with something actually useful. MoM is an interactive TUI written in Go that turns your login terminal into a proper system dashboard. It has 32 configurable modules, themes, preset templates, profiles, and rollback backups for when you inevitably break something. Built with Charmbracelet's Bubble Tea stack — and it's what I run on my own setup.",
        },
        technologies: ["Go", "Bubble Tea", "Lipgloss", "Linux", "TUI", "CLI"],
        github: "https://github.com/msalexms/MoM",
        image: "/mom-demo.gif",
      },
      {
        title: "fin-cli",
        description: {
          es: "Un monitor financiero de terminal que ofrece un panel en tiempo real con tu lista de seguimiento de acciones. Lo desarrollé porque quería consultar el estado del mercado de un vistazo rápido sin tener que salir de la consola. Soporta múltiples proveedores de datos con sistema de fallback automático, traduce códigos ISIN a tickers, utiliza caché en disco para cargar al instante e incluye un menú de ajustes interactivo totalmente integrado.",
          en: "A financial monitor for the terminal that gives you a live dashboard with your stock watchlist. I built it because I wanted to keep an eye on prices without leaving the terminal. Supports multiple providers with automatic fallback, resolves ISINs to tickers, caches data on disk for fast starts, and has an interactive settings panel right inside the TUI.",
        },
        technologies: ["Go", "Bubble Tea", "TUI", "CLI", "Finance", "XDG"],
        github: "https://github.com/msalexms/fin-cli",
        image: "/fin-cli-demo.gif",
      },
      {
        title: "RTL-SDR Analyzer",
        description: {
          es: "Tenía un receptor RTL-SDR por casa y sentía curiosidad por analizar el espectro de radiofrecuencia de mi entorno. El resultado de esa curiosidad es este analizador de espectro en tiempo real con capacidad para detectar inhibidores de frecuencia (jamming). Procesa muestras I/Q, calcula la FFT al vuelo y detecta anomalías en la señal mediante umbrales adaptativos. Puede ejecutarse de forma interactiva o en modo silencioso (headless) para monitorizaciones de larga duración, almacenando los resultados en SQLite para exportarlos después a CSV o JSON.",
          en: "I had an RTL-SDR dongle and was curious about what the RF environment around me actually looked like. That's how this started. The result is a real-time spectrum analyzer with jamming detection: processes I/Q samples, runs FFT on the fly, and flags anomalies using adaptive thresholds. Runs headless for long monitoring sessions, stores data in SQLite, and exports to CSV or JSON.",
        },
        technologies: ["Python", "NumPy", "RTL-SDR", "SQLite", "Docker", "Pydantic"],
        github: "https://github.com/msalexms/rtl-sdr-analyzer",
        image: "/spectrogram.png",
      },
    ],
  },

  academic: {
    sectionTitle: { es: "Trabajos Académicos", en: "Academic Papers" },
    sectionSubtitle: {
      es: "Visualiza y explora mis trabajos de Fin de Grado y Fin de Máster",
      en: "View and explore my bachelor's and master's theses",
    },
    documents: [
      {
        id: "tfm",
        es: {
          tabLabel: "TFM",
          title: "Trabajo de Fin de Máster 2025",
          documentTitle: "Collaborative and Distributed DoS Detection in IoT Scenarios",
          abstract: "La mayoría de las soluciones de seguridad para entornos IoT requieren enviar el tráfico de red a un servidor centralizado para entrenar los modelos de detección, lo que supone un claro riesgo de privacidad y genera cuellos de botella. Mi TFM propone un sistema de aprendizaje federado en el que cada dispositivo edge entrena su propio modelo localmente y únicamente comparte las actualizaciones de los pesos, manteniendo ocultos los datos en bruto. Utilizando el framework Flower y algoritmos como XGBoost, el sistema es capaz de detectar ataques DDoS en tiempo real en redes IoT distribuidas de forma totalmente privada. Calificación obtenida: 9/10.",
          downloadLabel: "Descargar PDF",
        },
        en: {
          tabLabel: "TFM",
          title: "Master's Thesis 2025",
          documentTitle: "Collaborative and Distributed DoS Detection in IoT Scenarios",
          abstract: "Most IoT security solutions require sending raw network traffic to a central server to train detection models — which is both a privacy risk and a bottleneck. This thesis builds a federated learning system where each edge device trains locally and only shares model updates, not raw data. Using Flower and algorithms like XGBoost, the system detects DDoS attacks in real time across distributed IoT networks without ever centralizing sensitive traffic. Awarded 9/10.",
          downloadLabel: "Download PDF",
        },
        pdfPath: "/tfm-AlejandroMartinSanchez.pdf",
      },
      {
        id: "tfg",
        es: {
          tabLabel: "TFG",
          title: "Trabajo de Fin de Grado 2024",
          documentTitle: "Optimización de Modelos de IA mediante Destilación para Dispositivos Edge",
          abstract: "Los modelos de visión artificial más avanzados suelen ser demasiado pesados para ejecutarse de forma fluida en microcontroladores o pequeñas SBCs. En este proyecto exploré la técnica de destilación del conocimiento (entrenar a un modelo 'alumno' ligero para que replique el comportamiento de un modelo 'profesor' mucho más pesado) para lograr inferencia de alta precisión en hardware como ESP32, Raspberry Pi y Jetson. El resultado fue un sistema funcional de detección de personas que mejoró hasta un 20% el rendimiento respecto a los modelos comprimidos tradicionales. Calificación obtenida: 10/10.",
          downloadLabel: "Descargar PDF",
        },
        en: {
          tabLabel: "Bachelor's Thesis",
          title: "Bachelor's Thesis 2024",
          documentTitle: "AI Model Optimization through Distillation for Edge Devices",
          abstract: "State-of-the-art computer vision models are too heavy to run on microcontrollers or small SBCs. This project explored model distillation — training a small 'student' model to mimic a large 'teacher' — to get near-original accuracy on hardware like the ESP32, Raspberry Pi, and Jetson. The result was a working person detection system with up to 20% better performance than baseline compressed models. Awarded 10/10.",
          downloadLabel: "Download PDF",
        },
        pdfPath: "/tfg-AlejandroMartinSanchez.pdf",
      },
    ],
  },

  education: {
    es: { title: "Educación", enTitle: "Education" },
    items: [
      {
        degree: { es: "Grado en Ingeniería Informática", en: "BSc in Computer Science" },
        institution: "Universidad de Alcalá",
        period: { es: "2020 – 2024", en: "2020 – 2024" },
        description: {
          es: "Especialidad en Computación. Trabajo de Fin de Grado (TFG) calificado con Matrícula de Honor (10/10).",
          en: "Mention in Computer Science. Final project awarded with 10/10.",
        },
      },
      {
        degree: { es: "Máster Universitario en Internet de las Cosas (IoT)", en: "MSc in Internet of Things (IoT)" },
        institution: "Universidad Politécnica de Madrid",
        period: { es: "2024 – 2025", en: "2024 – 2025" },
        description: {
          es: "Formación avanzada centrada en sistemas embebidos, integración de sensores, protocolos de red IoT, arquitecturas de edge computing y aplicaciones de IA en el edge. Trabajo de Fin de Máster (TFM) calificado con Sobresaliente (9/10).",
          en: "Advanced training in embedded systems, sensor integration, IoT networking protocols, and edge computing architecture, including edge AI applications. Final project awarded with 9/10.",
        },
      },
    ],
  },

  certifications: {
    es: { title: "Insignias y Certificaciones" },
    en: { title: "Badges & Certifications" },
    badges: [
      {
        id: "cce9876a-df8b-46a8-88fb-17943f4452ba",
        es: { name: "Containers & Kubernetes Essentials" },
        en: { name: "Containers & Kubernetes Essentials" },
      },
      {
        id: "6ada6fe2-ad92-4607-ab80-40d8feb16ad7",
        es: { name: "Docker Essentials: A Developer Introduction" },
        en: { name: "Docker Essentials: A Developer Introduction" },
      },
      {
        id: "a55077f9-3dca-4e07-8548-16e5a100c020",
        es: { name: "Linux Unhatched" },
        en: { name: "Linux Unhatched" },
      },
    ],
  },

  nav: {
    es: {
      about: "Sobre Mí",
      experience: "Experiencia",
      projects: "Proyectos",
      academic: "TFM / TFG",
      education: "Educación",
    },
    en: {
      about: "About",
      experience: "Experience",
      projects: "Projects",
      academic: "Thesis / TFG",
      education: "Education",
      contact: "Contact",
    },
  },

  footer: {
    es: {
      contactTitle: "Contacto",
      rights: "Todos los derechos reservados.",
      builtWith: "Construido con React y Tailwind CSS",
    },
    en: {
      contactTitle: "Contact",
      rights: "All rights reserved.",
      builtWith: "Built with React and Tailwind CSS",
    },
  },
};