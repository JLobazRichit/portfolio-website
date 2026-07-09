// Optional convenience script: populates the database with the projects, certificates,
// and experience entries from Lobaz's resume, so the site isn't empty on first run.
// Run with: node seedData.js
// Safe to run multiple times - skips seeding if data already exists in each collection.

require('dotenv').config();
const mongoose = require('mongoose');
const Project = require('./models/Project');
const Certificate = require('./models/Certificate');
const Experience = require('./models/Experience');

const projects = [
  {
    title: 'Smart Onion Storage Monitoring System',
    description:
      'Designed and deployed an IoT-based storage monitoring system using ESP32 and environmental sensors to monitor humidity, temperature, light, and gas levels across warehouse environments. Integrated a ThingSpeak cloud dashboard delivering live alerts and analytics, eliminating manual inspection cycles by automating spoilage risk detection.',
    technologies: ['ESP32', 'IoT Sensors', 'ThingSpeak', 'Cloud Dashboard'],
    category: 'IoT',
    date: new Date('2026-01-01'),
    githubLink: '',
    liveDemo: '',
    featured: true,
  },
  {
    title: 'Smart Plant Watering System',
    description:
      'Built an automated crop irrigation system using ESP32 and soil moisture sensors that triggers precise watering cycles only when needed, reducing water usage by up to 30%. Integrated a real-time Blynk cloud dashboard for remote soil condition monitoring, maintaining stable operation across 10+ test scenarios.',
    technologies: ['ESP32', 'IoT Sensors', 'Blynk', 'Cloud Dashboard'],
    category: 'IoT',
    date: new Date('2025-01-01'),
    githubLink: '',
    liveDemo: '',
    featured: true,
  },
  {
    title: 'Wireless RC Car',
    description:
      'Engineered a remotely controlled car using ESP32 supporting both Bluetooth and Wi-Fi communication protocols, achieving stable wireless control at 15m range. Implemented MQTT for Wi-Fi control mode enabling low-latency command transmission, validated across 50+ functional and stress tests.',
    technologies: ['ESP32', 'Bluetooth', 'Wi-Fi', 'MQTT'],
    category: 'Embedded Systems',
    date: new Date('2024-01-01'),
    githubLink: '',
    liveDemo: '',
    featured: false,
  },
];

const certificates = [
  { title: 'Deep Learning', organization: 'Infosys Springboard', date: new Date('2026-01-01'), category: 'AI/ML' },
  { title: 'Generative AI Unleashing', organization: 'Infosys Springboard', date: new Date('2026-01-01'), category: 'AI/ML' },
  { title: 'Computer Vision', organization: 'Infosys Springboard', date: new Date('2026-01-01'), category: 'AI/ML' },
  { title: 'Natural Language Processing (NLP)', organization: 'Infosys Springboard', date: new Date('2026-01-01'), category: 'AI/ML' },
  { title: 'Prompt Engineering', organization: 'Infosys Springboard', date: new Date('2026-01-01'), category: 'AI/ML' },
  { title: 'Python Programming', organization: 'Infosys Springboard', date: new Date('2025-01-01'), category: 'Programming' },
  { title: 'C Programming', organization: 'Infosys Springboard', date: new Date('2024-01-01'), category: 'Programming' },
  { title: 'Deloitte Australia – Cyber Security Job Simulation', organization: 'Forage', date: new Date('2026-01-01'), category: 'Virtual Internship' },
  { title: 'Deloitte Australia – Data Analysis Job Simulation', organization: 'Forage', date: new Date('2026-01-01'), category: 'Virtual Internship' },
  { title: 'Tata Group – GenAI Data Analytics Job Simulation', organization: 'Forage', date: new Date('2026-01-01'), category: 'Virtual Internship' },
  { title: 'HTML Certificate', organization: 'Great Learning', date: new Date('2024-01-01'), category: 'Programming' },
  { title: 'MATLAB Onramp', organization: 'MathWorks', date: new Date('2024-01-01'), category: 'Other' },
];

const experiences = [
  {
    title: 'AIVSC-2025 (All India Vayu Sainik Camp)',
    organization: 'National Cadet Corps (NCC)',
    type: 'NCC',
    description: 'Represented at the National-level NCC camp in Bangalore, selected among top cadets nationwide, demonstrating leadership, discipline, and teamwork.',
    startDate: new Date('2025-06-01'),
    location: 'Bangalore, India',
  },
  {
    title: 'IASC-2025 (State Level Camp)',
    organization: 'National Cadet Corps (NCC)',
    type: 'NCC',
    description: 'Represented at the State-level NCC camp, selected among top cadets statewide.',
    startDate: new Date('2025-03-01'),
    location: 'Tambaram, India',
  },
  {
    title: 'SDG Hackathon',
    organization: 'K.S.R. College of Engineering',
    type: 'Hackathon',
    description: 'Developed a solution addressing a UN Sustainable Development Goal in a competitive team environment.',
    startDate: new Date('2025-08-01'),
    location: 'Tiruchengode, India',
  },
  {
    title: 'Odoo x KAHE Virtual Hackathon',
    organization: 'Odoo x KAHE',
    type: 'Hackathon',
    description: 'Collaborated on an ERP-integrated application challenge.',
    startDate: new Date('2025-09-01'),
    location: 'Virtual',
  },
  {
    title: 'IBM Dev Day Bob Edition Virtual Hackathon',
    organization: 'IBM',
    type: 'Hackathon',
    description: 'Engaged with IBM Cloud technologies in a developer challenge.',
    startDate: new Date('2025-10-01'),
    location: 'Virtual',
  },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    if ((await Project.countDocuments()) === 0) {
      await Project.insertMany(projects);
      console.log(`Seeded ${projects.length} projects`);
    } else {
      console.log('Projects already exist, skipping');
    }

    if ((await Certificate.countDocuments()) === 0) {
      await Certificate.insertMany(certificates);
      console.log(`Seeded ${certificates.length} certificates`);
    } else {
      console.log('Certificates already exist, skipping');
    }

    if ((await Experience.countDocuments()) === 0) {
      await Experience.insertMany(experiences);
      console.log(`Seeded ${experiences.length} experience entries`);
    } else {
      console.log('Experience entries already exist, skipping');
    }

    console.log('Seeding complete');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error.message);
    process.exit(1);
  }
};

seed();
