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
      role: "Desarrollador Full Stack",
      slogan: "Transformando ideas en experiencias digitales excepcionales",
      email: "msalejandroms@gmail.com",
      location: "Madrid, España",
    },
    en: {
      name: "Alejandro Martín Sánchez",
      role: "Full Stack Developer",
      slogan: "Transforming ideas into exceptional digital experiences",
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
      ctaPrimary: "Ver Proyectos",
      ctaSecondary: "Contactar",
    },
    en: {
      greeting: "Hello! I'm",
      ctaPrimary: "View Projects",
      ctaSecondary: "Get in Touch",
    },
  },

  about: {
    es: {
      title: "Sobre Mí",
      paragraphs: [
        "Soy un desarrollador apasionado por crear soluciones tecnológicas que marquen la diferencia. Con experiencia en desarrollo web full stack, me especializo en construir aplicaciones modernas, escalables y centradas en el usuario.",
        "Mi enfoque combina sólidos fundamentos técnicos con una atención meticulosa al diseño y la experiencia de usuario. Creo firmemente que el mejor software es aquel que no solo funciona bien, sino que también se siente intuitivo y agradable de usar.",
        "Cuando no estoy programando, me encontrarás explorando nuevas tecnologías, contribuyendo a proyectos open source o disfrutando de un buen café mientras leo sobre arquitectura de software.",
      ],
    },
    en: {
      title: "About Me",
      paragraphs: [
        "I'm a developer passionate about creating technological solutions that make a difference. With experience in full stack web development, I specialize in building modern, scalable, and user-centered applications.",
        "My approach combines solid technical foundations with meticulous attention to design and user experience. I firmly believe that the best software is not only functional but also intuitive and pleasant to use.",
        "When I'm not coding, you'll find me exploring new technologies, contributing to open source projects, or enjoying a good coffee while reading about software architecture.",
      ],
    },
  },

  experience: {
    es: { title: "Experiencia Laboral" },
    en: { title: "Work Experience" },
    items: [
      {
        role: { es: "Desarrollador Frontend Senior", en: "Senior Frontend Developer" },
        company: "TechCorp Solutions",
        period: { es: "Ene 2023 – Presente", en: "Jan 2023 – Present" },
        description: {
          es: "Lideré el desarrollo del frontend de la plataforma principal usando React y TypeScript. Implementé un sistema de diseño que redujo el tiempo de desarrollo en un 40%. Mentoría a desarrolladores junior.",
          en: "Led frontend development of the main platform using React and TypeScript. Implemented a design system that reduced development time by 40%. Mentored junior developers.",
        },
        technologies: ["React", "TypeScript", "Tailwind CSS", "Next.js"],
      },
      {
        role: { es: "Desarrollador Full Stack", en: "Full Stack Developer" },
        company: "StartupXYZ",
        period: { es: "Mar 2021 – Dic 2022", en: "Mar 2021 – Dec 2022" },
        description: {
          es: "Desarrollé APIs RESTful con Node.js y Express. Construí interfaces de usuario responsivas con React. Implementé pipelines CI/CD y optimicé el rendimiento de la base de datos.",
          en: "Developed RESTful APIs with Node.js and Express. Built responsive user interfaces with React. Implemented CI/CD pipelines and optimized database performance.",
        },
        technologies: ["Node.js", "Express", "React", "MongoDB", "Docker"],
      },
      {
        role: { es: "Becario de Desarrollo Web", en: "Web Development Intern" },
        company: "Digital Agency Co.",
        period: { es: "Sep 2020 – Feb 2021", en: "Sep 2020 – Feb 2021" },
        description: {
          es: "Colaboré en el desarrollo de sitios web para clientes diversos. Aprendí metodologías ágiles y mejores prácticas de desarrollo. Participé en revisiones de código y planificación de sprints.",
          en: "Collaborated on website development for diverse clients. Learned agile methodologies and development best practices. Participated in code reviews and sprint planning.",
        },
        technologies: ["HTML/CSS", "JavaScript", "WordPress", "Git"],
      },
    ],
  },

  projects: {
    es: { title: "Proyectos Destacados", subtitle: "Una selección de mis trabajos más recientes" },
    en: { title: "Featured Projects", subtitle: "A selection of my most recent work" },
    items: [
      {
        title: "E-Commerce Platform",
        description: {
          es: "Plataforma de comercio electrónico completa con carrito de compras, pasarela de pagos y panel de administración. Arquitectura microservicios.",
          en: "Complete e-commerce platform with shopping cart, payment gateway, and admin dashboard. Microservices architecture.",
        },
        technologies: ["Next.js", "Stripe", "PostgreSQL", "Redis"],
        github: "https://github.com/tu-usuario/ecommerce",
        demo: "https://ecommerce-demo.com",
        image: "https://via.placeholder.com/600x400/1e1b4b/818cf8?text=E-Commerce",
      },
      {
        title: "Task Manager App",
        description: {
          es: "Aplicación de gestión de tareas con tableros Kanban, colaboración en tiempo real y notificaciones push. Integración con calendarios.",
          en: "Task management application with Kanban boards, real-time collaboration, and push notifications. Calendar integration.",
        },
        technologies: ["React", "Firebase", "Tailwind CSS", "PWA"],
        github: "https://github.com/tu-usuario/task-manager",
        demo: "https://taskmanager-demo.com",
        image: "https://via.placeholder.com/600x400/1e1b4b/818cf8?text=Task+Manager",
      },
      {
        title: "Weather Dashboard",
        description: {
          es: "Dashboard meteorológico con visualizaciones interactivas, pronóstico extendido y alertas personalizadas. Datos en tiempo real vía API.",
          en: "Weather dashboard with interactive visualizations, extended forecast, and custom alerts. Real-time data via API.",
        },
        technologies: ["Vue.js", "D3.js", "OpenWeather API", "Chart.js"],
        github: "https://github.com/tu-usuario/weather-app",
        demo: "https://weather-demo.com",
        image: "https://via.placeholder.com/600x400/1e1b4b/818cf8?text=Weather+App",
      },
      {
        title: "AI Chat Interface",
        description: {
          es: "Interfaz de chat inteligente con integración de modelos de IA, historial de conversaciones y soporte multimodal. Diseño conversacional.",
          en: "Smart chat interface with AI model integration, conversation history, and multimodal support. Conversational design.",
        },
        technologies: ["React", "OpenAI API", "WebSocket", "Framer Motion"],
        github: "https://github.com/tu-usuario/ai-chat",
        demo: "https://aichat-demo.com",
        image: "https://via.placeholder.com/600x400/1e1b4b/818cf8?text=AI+Chat",
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
                title: "Trabajo de Fin de Máster",
                documentTitle: "Collaborative and Distributed DoS Detection in IoT Scenarios",
                abstract: "Este trabajo propone un marco basado en aprendizaje federado utilizando el framework Flower para la detección de ataques DDoS en tiempo real en redes IoT. Facilita el entrenamiento colaborativo entre dispositivos en el borde (edge) sin centralizar datos privados, logrando una alta precisión y eficiencia con algoritmos como XGBoost.",
                downloadLabel: "Descargar PDF",
              },
              en: {
                tabLabel: "TFM",
                title: "Master's Thesis",
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
                title: "Trabajo de Fin de Grado",
                documentTitle: "Optimización de Modelos de IA mediante Destilación para Dispositivos Edge",
                abstract: "Investigación sobre la integración de IA en dispositivos de bajo consumo (Edge Computing) mediante técnicas de compresión como la destilación de modelos (Teacher-Student). Se implementó un sistema de detección de personas en hardware limitado (ESP32, Raspberry Pi y Nvidia Jetson), logrando mejoras de rendimiento de hasta un 20% respecto a los modelos originales.",
                downloadLabel: "Descargar PDF",
              },
              en: {
                tabLabel: "Bachelor's Thesis",
                title: "Bachelor's Thesis",
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
          es: "Formación avanzada en sistemas embebidos, integración de sensores, protocolos de red IoT y arquitectura de edge computing, incluyendo aplicaciones de edge AI.",
          en: "Advanced training in embedded systems, sensor integration, IoT networking protocols, and edge computing architecture, including edge AI applications.",
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