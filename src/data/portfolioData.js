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
      role: "Ingeniero de software · Visión artificial · Edge AI · IoT",
      slogan: "From silicon to the cloud, every layer matters.",
      email: "msalejandroms@gmail.com",
      location: "Madrid, España",
    },
    en: {
      name: "Alejandro Martín Sánchez",
      role: "Software engineer · Computer vision · Edge AI · IoT",
      slogan: "From silicon to the cloud, every layer matters.",
      email: "msalejandroms@gmail.com",
      location: "Madrid, Spain",
    },
  },

  social: {
    github: "https://github.com/msalexms",
    linkedin: "https://linkedin.com/in/alejandro-martin-sanchez-ams",
    amstech: "https://amstech.dev",
  },

  hero: {
    es: {
      ctaPrimary: "Ver experiencia",
      ctaProjects: "Ver proyectos",
      ctaSecondary: "Contactar",
    },
    en: {
      ctaPrimary: "View experience",
      ctaProjects: "View projects",
      ctaSecondary: "Contact",
    },
  },

  about: {
    es: {
      title: "Sobre mí",
      lead: "Me gustan los sistemas que tienen que funcionar cuando nadie está mirando.",
      offClockTitle: "Fuera del trabajo",
      offClock: ["homelab", "Home Assistant", "F1", "gimnasio", "paseos", "Thor"],
      catNote: "Thor supervisa el laboratorio. No le impresionan tus tiempos de compilación.",
      paragraphs: [
        "Soy ingeniero de software y me muevo entre capas: del firmware de un microcontrolador al backend y al frontend desde el que se monitoriza todo. Ahora trabajo en Indra, en NECS, la red nacional de radares de tráfico del Reino Unido, un sistema crítico que opera 24/7. Por mi cuenta también experimento con APIs de LLMs y con el Model Context Protocol (MCP).",
        "Antes pasé un año en la Universidad de Alcalá investigando cómo comprimir y desplegar modelos CNN de detección y reidentificación de personas en hardware tan limitado como un ESP32. Y en Moeve construí el software de control de un hangar de drones autónomos y automaticé de principio a fin una línea de procesamiento químico.",
        "Cuando desconecto, me encontrarás con mi homelab, montando sensores para Home Assistant, siguiendo la Fórmula 1, en el gimnasio o dando un paseo para despejarme.",
      ],
    },
    en: {
      title: "About me",
      lead: "I like systems that have to work when nobody is watching.",
      offClockTitle: "Off the clock",
      offClock: ["homelab", "Home Assistant", "F1", "gym", "walks", "Thor"],
      catNote: "Thor supervises the lab. He is not impressed by your compile times.",
      paragraphs: [
        "I'm a software engineer who works across layers, from microcontroller firmware to the backend and the frontend that monitors it all. I currently work at Indra on NECS, the UK's national traffic radar network, a safety-critical system that runs 24/7. On my own time I also experiment with LLM APIs and the Model Context Protocol (MCP).",
        "Before that, at Universidad de Alcalá I spent a year researching how to deploy and compress CNN-based detection and re-identification models on hardware as constrained as an ESP32 microcontroller. And at Moeve I built the control software for an autonomous drone hangar and an industrial automation pipeline for a chemical processing line.",
        "When I switch off, you will find me with my homelab, building sensors for Home Assistant, following Formula 1, at the gym, or out for a walk to clear my head.",
      ],
    },
  },

  experience: {
    es: { title: "Experiencia laboral" },
    en: { title: "Work experience" },
    items: [
      {
        role: { es: "Ingeniero de Software", en: "Software Engineer" },
        company: "Indra",
        period: { es: "May 2025 – Presente", en: "May 2025 – Present" },
        description: {
          es: "Trabajo en NECS, la red nacional de radares del Reino Unido, un sistema que opera 24/7. Me encargo del backend en Java y Spring Boot que conecta los componentes del sistema con servicios cloud y on-premise, de los componentes de visión artificial que leen las cámaras de los pórticos de carretera y detectan señales de velocidad variable en tiempo real, y del frontend en Angular para infracciones, alertas y configuración de cámaras.",
          en: "I work on NECS, the UK's National Enforcement Camera Solution, a radar network that runs 24/7. My work spans the Java and Spring Boot backend that connects system components with cloud and on-premise services, the computer vision components that read gantry cameras and detect variable speed signs in real time, and the Angular frontend for infractions, alerts, and camera configuration.",
        },
        technologies: ["Java", "Spring Boot", "Angular", "C++", "OpenCV", "Computer Vision", "Linux"],
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
          en: "Researched and deployed CNN-based person detection models across different edge hardware: ESP32-S3, Raspberry Pi 3, and NVIDIA Jetson Xavier NX, benchmarking inference latency, memory footprint, and accuracy under real-time constraints. Worked with architectures including YOLO, ResNet, and MobileNet. Evaluated and benchmarked 9 knowledge distillation algorithms from the KD_Lib library to compress models without significant accuracy loss. Integrated OSNet for person Re-Identification (ReID), so identities stay consistent across camera frames. Built end-to-end inference systems per device with live camera streaming and MQTT-based detection alerts.",
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
    es: {
      title: "Proyectos",
      subtitle: "Herramientas open source que uso a diario.",
      moreLabel: "Más en GitHub",
      viewLabel: "Ver proyecto",
    },
    en: {
      title: "Projects",
      subtitle: "Open-source tools I use every day.",
      moreLabel: "More on GitHub",
      viewLabel: "View project",
    },
    // Proyectos insignia de AMS Tech (amstech.dev)
    items: [
      {
        title: "LensPipe",
        emblem: "camera",
        version: "v1.0.0",
        lic: "GPL-3.0",
        description: {
          es: "Tu iPhone o Android como cámara de estudio para PC y OBS por USB o Wi-Fi. Solo navegador en el móvil: sin app, sin cuenta y sin nube.",
          en: "Turn your iPhone or Android phone into a studio camera for PC and OBS over USB or Wi-Fi. Runs straight in the phone's browser. No app, no account, no cloud.",
        },
        stack: "TypeScript · WebCodecs · OBS · Local",
        github: "https://github.com/msalexms/lenspipe",
        site: "https://amstech.dev/proyectos/lenspipe/",
        shot: "/img/proyectos/lenspipe-desktop.jpg",
      },
      {
        title: "CircuitBin",
        emblem: "chip",
        version: "v0.1.0-beta.1",
        lic: "GPL-3.0",
        description: {
          es: "Almacén digital autoalojado de componentes electrónicos con detección automática por foto con IA, pines por color y proyectos según tu stock.",
          en: "Self-hosted electronics parts inventory with automatic AI photo detection, color-coded pinouts, and stock-matched projects.",
        },
        stack: "Node 24 · SQLite · Docker · PWA",
        github: "https://github.com/msalexms/circuitbin",
        site: "https://amstech.dev/proyectos/circuitbin/",
        shot: "/img/proyectos/circuitbin-inventario-claro.jpg",
      },
      {
        title: "mom",
        emblem: "terminal",
        version: "v0.2.0",
        lic: "MIT",
        description: {
          es: "Interfaz de terminal en Go para montar tu MOTD de Linux con 32 módulos en vivo, 7 temas, vista previa exacta y copias automáticas.",
          en: "Lightweight Go terminal interface to build your Linux MOTD from 32 live modules, 7 themes, exact live preview, and automatic backups.",
        },
        stack: "Go 1.25 · Bubble Tea · Linux · TUI",
        github: "https://github.com/msalexms/MoM",
        site: "https://amstech.dev/proyectos/mom/",
        shot: "/img/proyectos/mom-preview.jpg",
      },
    ],
    // Herramientas de terminal, también en amstech.dev
    tools: [
      {
        title: "fin-cli",
        description: {
          es: "Monitor financiero de terminal en tiempo real con caché local y varios proveedores con respaldo.",
          en: "A real-time terminal finance monitor with local caching and multiple providers with automatic fallback.",
        },
        stack: "Go · CLI",
        github: "https://github.com/msalexms/fin-cli",
      },
      {
        title: "RTL-SDR Analyzer",
        description: {
          es: "Analizador de espectro RF en tiempo real con FFT al vuelo y detección de interferencias.",
          en: "A real-time RF spectrum analyzer with on-the-fly FFT and interference detection.",
        },
        stack: "Python · DSP",
        github: "https://github.com/msalexms/rtl-sdr-analyzer",
      },
    ],
  },

  academic: {
    sectionTitle: { es: "Trabajos académicos", en: "Academic papers" },
    documents: [
      {
        id: "tfm",
        es: {
          tabLabel: "TFM",
          documentTitle: "Collaborative and Distributed DoS Detection in IoT Scenarios",
          abstract: "La mayoría de las soluciones de seguridad para entornos IoT necesitan enviar el tráfico de red a un servidor centralizado para entrenar los modelos de detección, lo que supone un riesgo de privacidad y genera cuellos de botella. Mi TFM propone un sistema de aprendizaje federado en el que cada dispositivo edge entrena su propio modelo de forma local y solo comparte las actualizaciones de los pesos, sin que los datos en bruto salgan nunca del dispositivo. Usando el framework Flower y algoritmos como XGBoost, el sistema detecta ataques DDoS en tiempo real en redes IoT distribuidas, manteniendo la privacidad en todo momento. Calificación obtenida: 9/10.",
          downloadLabel: "Descargar PDF",
        },
        en: {
          tabLabel: "Master's thesis",
          documentTitle: "Collaborative and Distributed DoS Detection in IoT Scenarios",
          abstract: "Most IoT security solutions require sending raw network traffic to a central server to train detection models, which is both a privacy risk and a bottleneck. This thesis builds a federated learning system where each edge device trains locally and only shares model updates, not raw data. Using Flower and algorithms like XGBoost, the system detects DDoS attacks in real time across distributed IoT networks without ever centralizing sensitive traffic. Awarded 9/10.",
          downloadLabel: "Download PDF",
        },
        pdfPath: "/tfm-AlejandroMartinSanchez.pdf",
      },
      {
        id: "tfg",
        es: {
          tabLabel: "TFG",
          documentTitle: "Optimización de Modelos de IA mediante Destilación para Dispositivos Edge",
          abstract: "Los modelos de visión artificial más avanzados suelen ser demasiado pesados para funcionar con fluidez en microcontroladores o placas SBC pequeñas. En este proyecto exploré la destilación del conocimiento (entrenar un modelo 'alumno' ligero para que imite el comportamiento de un modelo 'profesor' mucho más pesado) con el objetivo de lograr una inferencia de alta precisión en hardware como el ESP32, la Raspberry Pi o la Jetson. El resultado fue un sistema funcional de detección de personas que mejoraba hasta un 20% el rendimiento frente a los modelos comprimidos tradicionales. Calificación obtenida: 10/10.",
          downloadLabel: "Descargar PDF",
        },
        en: {
          tabLabel: "Bachelor's thesis",
          documentTitle: "AI Model Optimization through Distillation for Edge Devices",
          abstract: "State-of-the-art computer vision models are too heavy to run on microcontrollers or small SBCs. This project explored model distillation, training a small 'student' model to mimic a large 'teacher', to get near-original accuracy on hardware like the ESP32, Raspberry Pi, and Jetson. The result was a working person detection system with up to 20% better performance than baseline compressed models. Awarded 10/10.",
          downloadLabel: "Download PDF",
        },
        pdfPath: "/tfg-AlejandroMartinSanchez.pdf",
      },
    ],
  },

  education: {
    es: { title: "Educación" },
    en: { title: "Education" },
    items: [
      {
        degree: { es: "Grado en Ingeniería Informática", en: "BSc in Computer Science" },
        institution: "Universidad de Alcalá",
        period: { es: "2020 – 2024", en: "2020 – 2024" },
        description: {
          es: "Especialidad en Computación. Trabajo de Fin de Grado (TFG) calificado con Matrícula de Honor (10/10).",
          en: "Specialization in Computing. Final project awarded with 10/10.",
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
    es: { title: "Insignias y certificaciones" },
    en: { title: "Badges and certifications" },
    badges: [
      {
        id: "cce9876a-df8b-46a8-88fb-17943f4452ba",
        image: "/img/insignias/containers-kubernetes.png",
        issuer: "IBM",
        es: { name: "Containers & Kubernetes Essentials" },
        en: { name: "Containers & Kubernetes Essentials" },
      },
      {
        id: "6ada6fe2-ad92-4607-ab80-40d8feb16ad7",
        image: "/img/insignias/docker-essentials.png",
        issuer: "IBM",
        es: { name: "Docker Essentials: A Developer Introduction" },
        en: { name: "Docker Essentials: A Developer Introduction" },
      },
      {
        id: "a55077f9-3dca-4e07-8548-16e5a100c020",
        image: "/img/insignias/linux-unhatched.png",
        issuer: "Cisco",
        es: { name: "Linux Unhatched" },
        en: { name: "Linux Unhatched" },
      },
    ],
  },

  nav: {
    es: {
      about: "Sobre mí",
      experience: "Experiencia",
      projects: "Proyectos",
      academic: "TFM / TFG",
      education: "Educación",
    },
    en: {
      about: "About",
      experience: "Experience",
      projects: "Projects",
      academic: "Theses",
      education: "Education",
    },
  },

  footer: {
    es: {
      contactTitle: "Contacto",
      ctaTitle: "Hablemos.",
      ctaText: "Si tienes un problema difícil, un sistema que no puede fallar o una idea que merece un prototipo, escríbeme.",
      emailCta: "Escríbeme",
      copyLabel: "Copiar email",
      copiedLabel: "Copiado",
      statusValue: "Abierto a conversaciones interesantes",
      builtWith: "Hecho con React y Tailwind CSS",
      backToTop: "Volver arriba",
    },
    en: {
      contactTitle: "Contact",
      ctaTitle: "Let's talk.",
      ctaText: "If you have a hard problem, a system that cannot fail, or an idea that deserves a prototype, get in touch.",
      emailCta: "Email me",
      copyLabel: "Copy email",
      copiedLabel: "Copied",
      statusValue: "Open to interesting conversations",
      builtWith: "Built with React and Tailwind CSS",
      backToTop: "Back to top",
    },
  },
};