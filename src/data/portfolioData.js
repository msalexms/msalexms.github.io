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
      role: "Ingeniero de Software · Visión Artificial · Edge AI · IoT",
      slogan: "From silicon to the cloud, every layer matters.",
      email: "msalejandroms@gmail.com",
      location: "Madrid, España",
    },
    en: {
      name: "Alejandro Martín Sánchez",
      role: "Software Engineer · Computer Vision · Edge AI · IoT",
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
        "Soy ingeniero de software especializado en visión artificial, edge AI y sistemas IoT. Actualmente trabajo en Indra, en el sistema nacional de radares de tráfico del Reino Unido (NECS), un entorno crítico que funciona las 24 horas del día y donde la fiabilidad lo es todo. Mi trabajo se divide en dos frentes: el backend en Java y C++, y los componentes de visión artificial que procesan en tiempo real las imágenes de las cámaras para la lógica de control de velocidad.",
        "Antes de eso, pasé un año en la Universidad de Alcalá investigando cómo desplegar y comprimir modelos CNN de detección y reidentificación de personas en hardware tan limitado como un microcontrolador ESP32. Y en Moeve construí el software de control de un hangar de drones autónomos, además de automatizar de principio a fin una línea de procesamiento químico.",
        "Fuera del trabajo me entretengo trasteando con mi homelab, montando sensores para Home Assistant, siguiendo la Fórmula 1, yendo al gimnasio o saliendo a caminar para despejarme. Y, por supuesto, tengo un gato que supervisa de cerca todo lo que hago.",
      ],
    },
    en: {
      title: "About Me",
      paragraphs: [
        "I'm a software engineer focused on computer vision, edge AI, and IoT systems. Right now I'm working at Indra on the UK's National Enforcement Camera Solution (NECS), a safety-critical system that runs 24/7. My role sits across two layers: backend development in Java and C++, and the computer vision components that process camera feeds in real time to support enforcement logic.",
        "Before that, at Universidad de Alcalá I spent a year researching how to deploy and compress CNN-based detection and re-identification models on hardware as constrained as an ESP32 microcontroller. And at Moeve I built the control software for an autonomous drone hangar and an industrial automation pipeline for a chemical processing line.",
        "Outside of work I tinker with my homelab, build sensors for Home Assistant, follow Formula 1, hit the gym, and go for walks when I need to clear my head. I also have a cat who supervises everything from above.",
      ],
    },
  },

  experience: {
    es: { title: "Experiencia Laboral" },
    en: { title: "Work Experience" },
    items: [
      {
        role: { es: "Ingeniero de Software", en: "Software Engineer" },
        company: "Indra",
        period: { es: "May 2025 – Presente", en: "May 2025 – Present" },
        projectLink: "https://www.indracompany.com/en/mobile-fixed-radars",
        description: {
          es: "Trabajo en el sistema nacional de radares de tráfico del Reino Unido (NECS), una red de radares inteligentes que funciona de forma ininterrumpida las 24 horas. Mi trabajo combina dos partes: por un lado, el backend en Java y Spring Boot, que conecta los distintos componentes del sistema con servicios externos tanto en la nube como on-premise; por otro, los componentes de visión artificial integrados en el sistema de control, que procesan en tiempo real las imágenes de las cámaras situadas en los pórticos de las carreteras para detectar señales de velocidad variable y ajustar los criterios de vigilancia según las condiciones del tráfico.",
          en: "Working on the UK's National Enforcement Camera Solution (NECS), a nationwide intelligent radar network operating 24/7. My role spans two layers: backend services in Java and Spring Boot that connect all system components and external services both in the cloud and on-premise; and computer vision components embedded in the enforcement pipeline, processing overhead gantry camera feeds in real time to detect variable speed signs and dynamically adapt enforcement criteria to road conditions.",
        },
        technologies: ["Java", "Spring Boot", "C++", "OpenCV", "Computer Vision", "Linux"],
      },
      {
        role: { es: "Ingeniero IoT Junior", en: "IoT Junior Engineer" },
        company: "Moeve (Innovation Center)",
        period: { es: "Sep 2024 – Mar 2025", en: "Sep 2024 – Mar 2025" },
        description: {
          es: "Desarrollé el software de control de un hangar de drones autónomos: un backend en Python, ejecutado en una placa SBC, que funciona como una máquina de estados tolerante a fallos e integra protocolos industriales como MQTT, Modbus, RS-485 e I2C. Además, diseñé todo el flujo de automatización de una línea de procesamiento químico con Node-RED e InfluxDB, junto con paneles interactivos en Grafana que los operarios de la planta usan a diario.",
          en: "Built the control software for an autonomous drone hangar: a fault-tolerant state machine managing the full operational lifecycle, from hardware handshakes to safe failure modes, integrating Modbus, RS-485, and I2C protocols into a single Python backend running on an embedded board. Also designed the automation pipeline for a chemical processing line, replacing manual monitoring with a visual control flow and a time-series database feeding Grafana dashboards used daily by plant operators.",
        },
        technologies: ["Python", "MQTT", "Modbus", "RS-485", "I2C", "Node-RED", "InfluxDB", "Grafana"],
      },
      {
        role: { es: "Becario de Investigación – IA Aplicada a IoT", en: "AI Research Intern" },
        company: "Universidad de Alcalá",
        period: { es: "Oct 2023 – Jul 2024", en: "Oct 2023 – Jul 2024" },
        description: {
          es: "Investigué y desplegué modelos CNN de detección de personas en distintas plataformas de hardware edge: ESP32-S3, Raspberry Pi 3 y NVIDIA Jetson Xavier NX, evaluando latencia de inferencia, consumo de memoria y precisión bajo restricciones de tiempo real. Trabajé con arquitecturas como YOLO, ResNet y MobileNet, y evalué y comparé 9 algoritmos de destilación de conocimiento de la librería KD_Lib para comprimir los modelos sin perder precisión. También integré OSNet para reidentificación de personas (ReID), lo que permitía mantener el seguimiento de identidades entre fotogramas de forma consistente. Construí sistemas de inferencia completos para cada dispositivo, con streaming de cámara en vivo y alertas por MQTT.",
          en: "Researched and deployed CNN-based person detection models across heterogeneous edge hardware: ESP32-S3, Raspberry Pi 3, and NVIDIA Jetson Xavier NX, benchmarking inference latency, memory footprint, and accuracy under real-time constraints. Worked with architectures including YOLO, ResNet, and MobileNet. Evaluated and benchmarked 9 knowledge distillation algorithms from the KD_Lib library to compress models without significant accuracy loss. Integrated OSNet for person Re-Identification (ReID), enabling consistent identity matching across camera frames. Built end-to-end inference systems per device with live camera streaming and MQTT-based detection alerts.",
        },
        technologies: ["Python", "PyTorch", "OpenCV", "YOLO", "OSNet", "TensorFlow Lite", "NVIDIA Jetson", "Edge Impulse", "MQTT"],
      },
      {
        role: { es: "Becario de Ingeniería de Software", en: "Software Engineering Intern" },
        company: "Intelligent Data",
        period: { es: "Feb 2024 – May 2024", en: "Feb 2024 – May 2024" },
        description: {
          es: "Desarrollé una aplicación Android en Java que se usaba en la línea de fabricación para ejecutar pruebas de validación de hardware en terminales de pago de la ONCE, garantizando que cada unidad pasara los controles de calidad antes de salir de fábrica. También colaboré en una app Android de teleasistencia para monitorizar en tiempo real a pacientes mayores en situación de riesgo.",
          en: "Developed an Android application in Java used on the factory line to run hardware validation tests on payment terminals for ONCE, ensuring each unit passed quality checks before shipping. Also contributed to a teleassistance Android app for real-time monitoring of at-risk elderly patients.",
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
          es: "El MOTD (Mensaje del Día) de Linux siempre me pareció un espacio desaprovechado, así que decidí convertirlo en algo realmente útil. MoM es una TUI (interfaz de terminal) interactiva escrita en Go que transforma ese aburrido mensaje de bienvenida en un auténtico panel de control del sistema. Tiene 32 módulos configurables, soporte para temas y perfiles, y un sistema de copias de seguridad que revierte automáticamente cualquier cambio si algo falla al configurarlo. Está construido sobre el ecosistema de Charmbracelet, y es la herramienta que uso a diario en mis propios servidores.",
          en: "The default MOTD always felt like a wasted opportunity, so I replaced it with something actually useful. MoM is an interactive TUI written in Go that turns your login terminal into a proper system dashboard. It has 32 configurable modules, themes, preset templates, profiles, and rollback backups for when you inevitably break something. Built with Charmbracelet's Bubble Tea stack — and it's what I run on my own setup.",
        },
        technologies: ["Go", "Bubble Tea", "Lipgloss", "Linux", "TUI", "CLI"],
        github: "https://github.com/msalexms/MoM",
        image: "/mom-demo.gif",
      },
      {
        title: "fin-cli",
        description: {
          es: "Un monitor financiero de terminal que muestra un panel en tiempo real con tu lista de seguimiento de acciones. Lo desarrollé porque quería echar un vistazo rápido al estado del mercado sin salir de la consola. Soporta varios proveedores de datos con un sistema de respaldo automático entre ellos, convierte códigos ISIN en tickers, usa una caché en disco para arrancar al instante, e incluye un menú de ajustes interactivo integrado en la propia TUI.",
          en: "A financial monitor for the terminal that gives you a live dashboard with your stock watchlist. I built it because I wanted to keep an eye on prices without leaving the terminal. Supports multiple providers with automatic fallback, resolves ISINs to tickers, caches data on disk for fast starts, and has an interactive settings panel right inside the TUI.",
        },
        technologies: ["Go", "Bubble Tea", "TUI", "CLI", "Finance", "XDG"],
        github: "https://github.com/msalexms/fin-cli",
        image: "/fin-cli-demo.gif",
      },
      {
        title: "RTL-SDR Analyzer",
        description: {
          es: "Tenía un receptor RTL-SDR por casa y me entró la curiosidad por ver cómo era realmente el espectro de radiofrecuencia a mi alrededor. De ahí salió este analizador de espectro en tiempo real con capacidad para detectar interferencias intencionadas (jamming). Procesa muestras I/Q, calcula la FFT al vuelo y detecta anomalías en la señal mediante umbrales adaptativos. Puede ejecutarse de forma interactiva o en modo silencioso (headless) para monitorizaciones de larga duración, guardando los resultados en SQLite para exportarlos después a CSV o JSON.",
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
          abstract: "La mayoría de las soluciones de seguridad para entornos IoT necesitan enviar el tráfico de red a un servidor centralizado para entrenar los modelos de detección, lo que supone un riesgo de privacidad y genera cuellos de botella. Mi TFM propone un sistema de aprendizaje federado en el que cada dispositivo edge entrena su propio modelo de forma local y solo comparte las actualizaciones de los pesos, sin que los datos en bruto salgan nunca del dispositivo. Usando el framework Flower y algoritmos como XGBoost, el sistema detecta ataques DDoS en tiempo real en redes IoT distribuidas, manteniendo la privacidad en todo momento. Calificación obtenida: 9/10.",
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
          abstract: "Los modelos de visión artificial más avanzados suelen ser demasiado pesados para funcionar con fluidez en microcontroladores o placas SBC pequeñas. En este proyecto exploré la destilación del conocimiento (entrenar un modelo 'alumno' ligero para que imite el comportamiento de un modelo 'profesor' mucho más pesado) con el objetivo de lograr una inferencia de alta precisión en hardware como el ESP32, la Raspberry Pi o la Jetson. El resultado fue un sistema funcional de detección de personas que mejoraba hasta un 20% el rendimiento frente a los modelos comprimidos tradicionales. Calificación obtenida: 10/10.",
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
          es: "Formación avanzada centrada en sistemas embebidos, integración de sensores, protocolos de red IoT, arquitecturas de edge computing y aplicaciones de inteligencia artificial embebida. Trabajo de Fin de Máster (TFM) calificado con Sobresaliente (9/10).",
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