import dialixImg from "../assets/dialix.jpg";
import blogImg from "../assets/blog.jpg";
import netflixImg from "../assets/netflix.jpg";
import fetchMeImg from "../assets/fetchme.jpg";
import realImg from "../assets/realestate.jpg";

// Projects are grouped by `category` and rendered as three separate carousels.
// `codeLink` is omitted entirely on client work that must stay private — a
// GitHub 404 reads worse than no link at all.
export const projects = [
  // ── AI & Agents ──────────────────────────────────────────────────────────
  {
    id: "whatsapp-agent",
    category: "ai",
    title: "Dialix — WhatsApp Order Agent",
    tagline: "An LLM agent that is not allowed to be wrong about money.",
    description:
      "Live on Meta's official Cloud API for a Sri Lankan food producer. Takes orders, prices them from a catalog, and escalates to a human — in Sinhala, Tamil and English. A wrong price in production led to a structural fact firewall: the model names the item, pricing.js decides what it costs, so a total cannot drift.",
    image: dialixImg,
    technologies: ["Meta Cloud API", "Gemini", "Node.js", "Redis", "Docker"],
    metrics: ["603 tests", "si / ta / en", "live customers"],
    demoLink: "https://dialix.dev/",
    tryLink: "https://wa.me/94762002689",
    tryLabel: "Message the live agent",
    tryNote: "Live business line for Fathima's Products — a real shop, not a sandbox.",
  },
  {
    id: "voice-agent",
    category: "ai",
    title: "Multilingual Voice Agent",
    tagline: "Four business personas, one runtime, live on Cloud Run.",
    description:
      "Real-time voice over the Gemini Live API with barge-in handling, streaming transcription and tool calling into booking and knowledge-base back ends. One FastAPI service serves four configured agents — car wash, banking, mobility and facilities — each with its own scope and knowledge.",
    image: null,
    technologies: ["FastAPI", "Gemini Live", "WebSocket", "Cloud Run", "Docker"],
    metrics: ["4 agents", "13 voices", "si / ta / en"],
    demoLink: "https://voice-agent-frontend-5mtolu2zcq-uc.a.run.app/",
    tryLink: "https://voice-agent-backend-5mtolu2zcq-uc.a.run.app/docs",
    tryLabel: "Browse the live API",
    codeLink: "https://github.com/devvicha/Prestine_car_wash_Project",
  },
  {
    id: "whisper-lora",
    category: "ai",
    title: "Whisper LoRA Fine-Tune for Sinhala",
    tagline: "Parameter-efficient fine-tuning of a 1.5B speech model on a low-resource language.",
    description:
      "LoRA adapters on openai/whisper-large-v2 for Sinhala transcription — rank 32, alpha 64, targeting the attention projections. Custom batched feature extraction sharded to Arrow files on disk with resume-from-disk, trained to convergence on GPU.",
    image: null,
    technologies: ["PyTorch", "HuggingFace PEFT", "LoRA", "Whisper large-v2"],
    metrics: ["r = 32", "20,244 steps", "loss 2.17 → 0.12"],
    codeLink: "https://github.com/devvicha/Whisper-Fine-Tuning-For-Sinhala",
  },
  {
    id: "garment-cv",
    category: "ai",
    title: "Garment Measurement System",
    tagline: "1mm accuracy from a camera and a calibration board.",
    description:
      "Computer-vision measurement for garment quality control. YOLO pose estimation locates 14 keypoints on a shirt, BiRefNet segments it from the bed, and a Charuco calibration board converts pixels to millimetres. Custom dataset collected and annotated in-house, with a GoPro capture rig and an operator UI.",
    image: null,
    technologies: ["YOLO11 pose", "BiRefNet", "OpenCV", "Charuco", "Roboflow"],
    metrics: ["14 keypoints", "1mm target", "custom dataset"],
  },
  {
    id: "sinhala-rag",
    category: "ai",
    title: "Sinhala RAG Call-Centre Backend",
    tagline: "Retrieval over a curated bilingual banking knowledge base.",
    description:
      "FastAPI service doing vector search with FAISS over a hand-built Sinhala/English banking corpus, embedded with a multilingual sentence transformer and answered by Gemini. Layered architecture, index-build tooling, streaming error taxonomy and an async rate limiter guarding model quota.",
    image: null,
    technologies: ["FastAPI", "FAISS", "sentence-transformers", "Gemini"],
    metrics: ["multilingual MiniLM", "10 req/min limiter", "Dockerised"],
    codeLink: "https://github.com/devvicha/VoIP-RAG-Integration-Calling-sytem",
  },
  {
    id: "bank-simulator",
    category: "ai",
    title: "Bank Voice Agent Simulator",
    tagline: "Schema-constrained LLM output for a regulated domain.",
    description:
      "An internship build: a Sinhala-speaking bank call-centre agent where every turn must return a fixed JSON contract — intent, extracted entities, actions and next step. Splits display_text from speak_text so the screen reads formal written Sinhala while the voice speaks colloquially, with hard safety rules that forbid asking for a full card number or CVV.",
    image: null,
    technologies: ["React", "TypeScript", "Gemini 2.5 Flash"],
    metrics: ["7 intents", "5 actions", "strict JSON contract"],
  },
  {
    id: "retail-bots",
    category: "ai",
    title: "Cosmetics & Bathware WhatsApp Bots",
    tagline: "The same agent platform, redeployed per client.",
    description:
      "Contributor on Idea8's WhatsApp bot platform across cosmetics and bathware retail — catalog handling, multi-image album replies, order capture and human handover. Shared runtime, per-client knowledge and prompts.",
    image: null,
    technologies: ["Node.js", "Gemini", "WhatsApp", "MongoDB"],
    metrics: ["team project", "2 verticals"],
  },

  // ── Systems & Hardware ───────────────────────────────────────────────────
  {
    id: "smart-desk",
    category: "systems",
    title: "Smart Desk Assistant",
    tagline: "Soldered sensor to mobile app, end to end.",
    description:
      "ESP32 firmware reading light, sound and air-quality sensors posts to a typed Express/PostgreSQL backend with JWT auth and per-device keys; an Expo React Native app renders live conditions, insights and reports.",
    image: null,
    technologies: ["ESP32", "Express", "PostgreSQL", "React Native", "Docker"],
    metrics: ["3 sensors", "device-key auth", "full stack"],
    codeLink: "https://github.com/devvicha/Smart-Desk-AI-Assistant-IoT",
  },
  {
    id: "sign-language",
    category: "systems",
    title: "Sign Language Detection",
    tagline: "Collected the dataset, trained the model, shipped the demo.",
    description:
      "YOLOv8 fine-tuned on a self-collected and self-annotated dataset of five signs, exported and served through a Flask app that streams annotated webcam frames live to the browser.",
    image: null,
    technologies: ["YOLOv8", "OpenCV", "Roboflow", "Flask"],
    metrics: ["5 classes", "own dataset", "live webcam"],
    codeLink: "https://github.com/devvicha/SignLanguageDetection",
  },
  {
    id: "scada",
    category: "systems",
    title: "Industrial SCADA Control Panel",
    tagline: "Contributed — OPC UA and Siemens S7 integration.",
    description:
      "Offline-first control panel for solar mini-grids, talking to PLCs over OPC UA and Snap7. Config-driven UI where every PLC tag maps to a widget, shipped as web, PWA, Electron desktop and mobile. My contribution was onboarding the Snap7 and OPC UA loading path.",
    image: null,
    technologies: ["Next.js", "OPC UA", "Snap7", "Electron", "TypeScript"],
    metrics: ["contributed", "4 site configs"],
  },

  // ── Web ──────────────────────────────────────────────────────────────────
  {
    id: "fetch-me-home",
    category: "web",
    title: "Fetch Me Home",
    tagline: "Team project — pet adoption platform.",
    description:
      "A pet adoption platform connecting adopters with animals in need: registration, listings, search and admin control over a Spring Boot and MongoDB backend. Built as a team project.",
    image: fetchMeImg,
    technologies: ["React", "TypeScript", "Tailwind CSS", "Spring Boot", "MongoDB", "AWS"],
    metrics: ["team project"],
    demoLink: "https://fetch-me-home-front-end.vercel.app/",
  },
  {
    id: "real-estate",
    category: "web",
    title: "Real Estate",
    tagline: "Team project — property browsing and enquiry.",
    description:
      "A responsive property site for browsing, searching and enquiring about listings, with EmailJS handling the contact flow. Built as a team project.",
    image: realImg,
    technologies: ["ReactJS", "Tailwind CSS", "EmailJS"],
    metrics: ["team project"],
  },
  {
    id: "netflix-clone",
    category: "web",
    title: "Netflix Clone",
    tagline: "Full-stack streaming platform.",
    description:
      "A Netflix-inspired streaming platform with authentication, video playback and content served from MongoDB through a Spring Boot API.",
    image: netflixImg,
    technologies: ["React.js", "Spring Boot", "MongoDB"],
    metrics: [],
    demoLink: "https://netflix-clone-frontend-hiup.vercel.app/",
    codeLink: "https://github.com/devvicha/Netflix",
  },
  {
    id: "personal-blog",
    category: "web",
    title: "Personal Blog",
    tagline: "First portfolio — hand-written HTML and CSS.",
    description:
      "An early portfolio site built without a framework, to showcase projects and experience with a clean responsive layout.",
    image: blogImg,
    technologies: ["HTML", "CSS", "JavaScript"],
    metrics: [],
    demoLink: "https://devvicha.github.io/Portfolio_Assignment1/",
    codeLink:
      "https://github.com/devvicha/Personal-Portfolio--html-css-javascript/tree/main",
  },
];

export const PROJECT_GROUPS = [
  {
    key: "ai",
    heading: "AI & Agents",
    accent: "Agents",
    blurb:
      "Production LLM systems — conversational agents, speech models and computer vision.",
  },
  {
    key: "systems",
    heading: "Systems & Hardware",
    accent: "Hardware",
    blurb: "Embedded, industrial protocols and full-stack IoT.",
  },
  {
    key: "web",
    heading: "Earlier Web Work",
    accent: "Web",
    blurb: "Full-stack web projects, including team builds from university.",
  },
];

export const byCategory = (key) => projects.filter((p) => p.category === key);
