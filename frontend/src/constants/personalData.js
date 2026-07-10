// Central source of truth for static personal/profile content.
// Dynamic content (projects, certificates, experience) comes from the backend API.

export const personalInfo = {
  name: 'Lobaz Richit J',
  title: 'IoT & AI/ML Engineer',
  taglineRoles: [
    'IoT Engineer',
    'AI/ML Enthusiast',
    'Full Stack Developer',
    'Embedded Systems Builder',
  ],
  location: 'Coimbatore, Tamil Nadu, India',
  phone: '+91-9629343387',
  email: 'lobazrichitksrceiot@gmail.com',
  linkedin: 'https://linkedin.com/in/lobaz-richit-j',
  github: 'https://github.com/JLobazRichit',
  githubUsername: 'JLobazRichit',
  resumeUrl: '/resume.pdf',
  objective:
    'Aspiring AI/Software Development Engineer with a strong foundation in IoT, full-stack development, and machine learning, seeking an internship where I can apply my skills in Python, embedded systems, and AI/ML to build practical, real-world solutions — while growing toward a long-term goal of working as an AI engineer or researcher at a leading technology company.',
  bio: "I'm a third-year Computer Science & Engineering (IoT) student who likes building things that sense the real world and respond to it intelligently — from ESP32 sensor networks that catch spoilage before it happens, to exploring how AI/ML can add a predictive layer to embedded systems. I care about shipping working systems, not just prototypes: dashboards that update live, alerts that actually reach someone, and code that's clean enough to hand off.",
  aboutbio:"Lobaz Richit is a Computer Science & Engineering (IoT) student at K.S.R. College of Engineering, Coimbatore, passionate about building systems that bridge the physical and digital worlds. His projects range from an ESP32-based onion storage monitor that alerts farmers before spoilage sets in, to a smart plant-watering system and a wireless RC car — alongside strong full-stack development skills built through complete MERN applications. He holds 15+ certifications in Deep Learning, Computer Vision, NLP, and Generative AI, and has completed virtual internships with Deloitte and Tata. His time in the National Cadet Corps, including national and state-level camps, has shaped a disciplined, methodical approach to problem-solving. He's now working toward a career as an AI engineer or researcher — building things that hold up in the real world, not just in theory."
};

export const education = [
  {
    degree: 'B.E. Computer Science & Engineering (Internet of Things)',
    institution: 'K.S.R. College of Engineering, Coimbatore, Tamil Nadu',
    duration: 'Aug 2024 – May 2028',
    score: 'CGPA: 8.56 / 10.0 (till 3rd Sem)',
    details:
      'Relevant Coursework: Data Structures & Algorithms, Database Management, Object-Oriented Programming, IoT Systems, Computer Networks, Embedded Systems',
  },
  {
    degree: 'Higher Secondary (Class XII) – CBSE',
    institution: 'Lisieux CMI Public School, Coimbatore',
    duration: 'June 2024',
    score: 'Grade: 81.8%',
    details: '',
  },
];

export const skills = {
  Languages: [
    { name: 'Python', level: 85 },
    { name: 'Java', level: 75 },
    { name: 'C', level: 75 },
    { name: 'SQL', level: 70 },
  ],
  Frontend: [
    { name: 'HTML5', level: 85 },
    { name: 'CSS3', level: 80 },
    { name: 'React', level: 65 },
    { name: 'Tailwind CSS', level: 65 },
  ],
  Backend: [
    { name: 'Node.js', level: 60 },
    { name: 'Express', level: 60 },
  ],
  Database: [
    { name: 'MongoDB', level: 65 },
    { name: 'MySQL', level: 65 },
  ],
  'IoT & Embedded': [
    { name: 'ESP32 / Arduino', level: 85 },
    { name: 'MQTT Protocol', level: 75 },
    { name: 'ThingSpeak', level: 80 },
    { name: 'Blynk', level: 75 },
  ],
  'Data & AI/ML': [
    { name: 'Pandas / NumPy', level: 70 },
    { name: 'Deep Learning', level: 60 },
    { name: 'Computer Vision', level: 55 },
    { name: 'NLP', level: 55 },
    { name: 'Generative AI / Prompt Engineering', level: 75 },
  ],
  Tools: [
    { name: 'Git & GitHub', level: 80 },
    { name: 'VS Code', level: 90 },
    { name: 'MATLAB', level: 60 },
    { name: 'Postman', level: 65 },
  ],
  'Soft Skills': [
    { name: 'Leadership', level: 85 },
    { name: 'Communication', level: 80 },
    { name: 'Teamwork', level: 85 },
    { name: 'Problem Solving', level: 85 },
  ],
};

export const languages = ['English', 'Tamil'];

export const interests = [
  'IoT & Embedded Systems',
  'AI/ML Research',
  'Competitive Hackathons',
  'NCC & Leadership Activities',
];

export const achievements = [
  'Represented at AIVSC-2025 (All India Vayu Sainik Camp), Bangalore — National-level NCC selection',
  'Represented at IASC-2025 (State Level Camp), Tambaram — selected among top cadets statewide',
  '15+ Infosys Springboard certifications across AI, Deep Learning, NLP, and Generative AI',
  '5 Forage virtual internship simulations completed (Deloitte Australia x3, Tata Group x2)',
];

export const socialLinks = {
  github: 'https://github.com/JLobazRichit',
  linkedin: 'https://linkedin.com/in/lobaz-richit-j',
  instagram: '',
  email: 'mailto:lobazrichitksrceiot@gmail.com',
  phone: 'tel:+919629343387',
};
