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
      role: "Software Engineer · Embedded Systems & Edge AI",
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
        "Soy un ingeniero de software con una sólida formación en sistemas embebidos, IoT y desarrollo backend. Actualmente trabajo en Indra en el proyecto NECS para el sistema nacional de control de velocidad del Reino Unido, donde combino C++, Java y visión por computador en entornos de misión crítica.",
        "Me apasiona la intersección entre el hardware y el software: desde programar microcontroladores con ESP-IDF hasta desplegar modelos de Machine Learning optimizados para dispositivos edge con recursos limitados. He trabajado tanto en investigación aplicada como en entornos industriales reales, lo que me da una visión práctica y orientada a resultados.",
        "Fuera del trabajo me encontrarás trasteando con nuevas tecnologías, explorando proyectos de Edge AI o leyendo sobre arquitectura de sistemas distribuidos.",
      ],
    },
    en: {
      title: "About Me",
      paragraphs: [
        "I'm a software engineer with a strong background in embedded systems, IoT, and backend development. I currently work at Indra on the NECS project for the UK's National Enforcement Camera System, combining C++, Java, and computer vision in mission-critical environments.",
        "I'm passionate about the intersection of hardware and software — from programming microcontrollers with ESP-IDF to deploying optimized Machine Learning models on resource-constrained edge devices. I've worked in both applied research and real industrial settings, giving me a hands-on, results-driven perspective.",
        "Outside of work you'll find me tinkering with new technologies, exploring Edge AI projects, or reading about distributed systems architecture.",
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
          es: "Desarrollo backend con Java y Spring Boot para el sistema nacional de cámaras de control de velocidad del Reino Unido (NECS), integrando los radares con sistemas cloud y on-premise de gestión de infracciones. Implementación de procesos de bajo nivel y tiempo real en C++ para el firmware crítico del radar. Trabajo íntegramente sobre Linux y aplicación de técnicas de visión por computador para la detección y clasificación de vehículos.",
          en: "Backend development using Java and Spring Boot for the UK's National Enforcement Camera System (NECS), connecting radar hardware to cloud and on-premise traffic management platforms. Implementation of low-level, real-time processes in C++ for the radar's critical firmware. Full Linux environment and application of computer vision techniques for vehicle detection and classification.",
        },
        technologies: ["Java", "Spring Boot", "C++", "Linux", "Computer Vision"],
      },
      {
        role: { es: "Ingeniero IoT Junior", en: "IoT Junior Engineer" },
        company: "Moeve (Innovation Center)",
        period: { es: "Sep 2024 – Mar 2025", en: "Sep 2024 – Mar 2025" },
        description: {
          es: "Desarrollo de una máquina de estados robusta y tolerante a fallos para el control de un hangar autónomo de drones. Integración de múltiples protocolos industriales (MQTT, Modbus, RS-485, I2C) en un backend Python, desplegado sobre SBCs. También construí pipelines de automatización para líneas de procesado químico con Node-RED e InfluxDB, con dashboards en Grafana.",
          en: "Developed a fault-tolerant state machine for controlling an autonomous drone hangar, integrating multiple industrial protocols (MQTT, Modbus, RS-485, I2C) into a Python backend deployed on SBCs. Also built automation pipelines for chemical processing lines using Node-RED and InfluxDB, with real-time Grafana dashboards.",
        },
        technologies: ["Python", "Java", "MQTT", "Modbus", "I2C", "Node-RED", "InfluxDB", "Grafana"],
      },
      {
        role: { es: "Investigador – IA Aplicada a IoT", en: "AI Applied to IoT Researcher" },
        company: "Colaboración con Moeve",
        period: { es: "Oct 2023 – Jul 2024", en: "Oct 2023 – Jul 2024" },
        description: {
          es: "Investigación y despliegue de modelos de visión por computador optimizados para dispositivos edge con recursos limitados. Implementación sobre SBCs (Raspberry Pi, Jetson) y microcontroladores ESP32 utilizando ESP-IDF. Aplicación de técnicas de compresión de modelos con PyTorch para lograr inferencia eficiente en el edge manteniendo bajo consumo energético.",
          en: "Research and deployment of optimized computer vision models for resource-constrained edge devices. Implementation on SBCs (Raspberry Pi, Jetson) and ESP32 microcontrollers using ESP-IDF. Applied model compression techniques with PyTorch to achieve efficient edge inference while keeping power consumption low.",
        },
        technologies: ["Python", "PyTorch", "C++", "ESP-IDF", "Edge AI", "Raspberry Pi", "Jetson"],
      },
      {
        role: { es: "Becario de Ingeniería de Software", en: "Software Engineering Intern" },
        company: "Intelligent Data",
        period: { es: "Feb 2024 – May 2024", en: "Feb 2024 – May 2024" },
        description: {
          es: "Desarrollo de aplicaciones Android en Java para sistemas sanitarios, con integración de dispositivos IoT para monitorización de pacientes en tiempo real.",
          en: "Developed Android applications in Java for healthcare systems, integrating IoT devices for real-time patient monitoring.",
        },
        technologies: ["Java", "Android", "IoT"],
      },
    ],
  },

  projects: {
    es: { title: "Proyectos Destacados", subtitle: "Una selección de mis trabajos más recientes" },
    en: { title: "Featured Projects", subtitle: "A selection of my most recent work" },
    items: [
      {
        title: "RTL-SDR Analyzer",
        description: {
          es: "Analizador de espectro en tiempo real y detector de jamming para hardware RTL-SDR. Procesa muestras I/Q vía RTL-TCP, calcula la FFT en tiempo real y detecta anomalías estadísticas con umbrales adaptativos. Soporta modos interactivo (GUI) y headless, exportación a CSV/JSON, persistencia en SQLite y barrido de frecuencias.",
          en: "Real-time spectrum analyzer and jamming detector for RTL-SDR hardware. Processes I/Q samples via RTL-TCP, computes FFT in real time, and detects statistical anomalies with adaptive thresholds. Supports interactive (GUI) and headless modes, CSV/JSON export, SQLite persistence, and frequency sweeping.",
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
      es: "Visualiza y explora mis trabajos de fin de grado y máster",
      en: "View and explore my bachelor's and master's theses",
    },
    documents: [
      {
      id: "tfm",
              es: {
                tabLabel: "TFM",
                title: "Trabajo de Fin de Máster 2025",
                documentTitle: "Collaborative and Distributed DoS Detection in IoT Scenarios",
                abstract: "Este trabajo propone un marco basado en aprendizaje federado utilizando el framework Flower para la detección de ataques DDoS en tiempo real en redes IoT. Facilita el entrenamiento colaborativo entre dispositivos en el borde (edge) sin centralizar datos privados, logrando una alta precisión y eficiencia con algoritmos como XGBoost.",
                downloadLabel: "Descargar PDF",
              },
              en: {
                tabLabel: "TFM",
                title: "Master's Thesis 2025",
                documentTitle: "Collaborative and Distributed DoS Detection in IoT Scenarios",
                abstract: "This thesis proposes a federated learning-based framework using the Flower framework for real-time DDoS detection in IoT networks. It enables collaborative model training across distributed edge devices without centralizing sensitive data, achieving high accuracy and efficiency through feature selection and algorithms like XGBoost.",
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
                abstract: "Investigación sobre la integración de IA en dispositivos de bajo consumo (Edge Computing) mediante técnicas de compresión como la destilación de modelos (Teacher-Student). Se implementó un sistema de detección de personas en hardware limitado (ESP32, Raspberry Pi y Nvidia Jetson), logrando mejoras de rendimiento de hasta un 20% respecto a los modelos originales.",
                downloadLabel: "Descargar PDF",
              },
              en: {
                tabLabel: "Bachelor's Thesis",
                title: "Bachelor's Thesis 2024",
                documentTitle: "AI Model Optimization through Distillation for Edge Devices",
                abstract: "Research on integrating AI into low-power devices (Edge Computing) using compression techniques such as model distillation (Teacher-Student). A person detection system was implemented on constrained hardware (ESP32, Raspberry Pi, and Nvidia Jetson), achieving performance improvements of up to 20% compared to the original models.",
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
          es: "Mención en computación. Proyecto final calificado con 10/10.",
          en: "Mention in Computer Science. Final project awarded with 10/10.",
        },
      },
      {
        degree: { es: "Máster Universitario en Internet de las Cosas (IoT)", en: "MSc in Internet of Things (IoT)" },
        institution: "Universidad Politécnica de Madrid",
        period: { es: "2024 – 2025", en: "2024 – 2025" },
        description: {
          es: "Formación avanzada en sistemas embebidos, integración de sensores, protocolos de red IoT y arquitectura de edge computing, incluyendo aplicaciones de edge AI. Proyecto final calificado con 9/10.",
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
academic: "TFM/TFG",
      education: "Educación",
    },
    en: {
      about: "About",
      experience: "Experience",
      projects: "Projects",
      academic: "Thesis/TFG",
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