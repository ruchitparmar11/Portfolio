const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Mock Data
const projects = [
    {
        id: 1,
        title: "OMNIDOC AI Multimodal System",
        description: "Multimodal AI platform processing 6+ data formats (text, PDF, video). Integrated Gemini 2.0 Pro API & Transformer LLMs. Improved quality by 22%.",
        tech_stack: "Python, Gemini 2.0 Pro, Streamlit, LLMs, MySQL",
        image_url: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1932&auto=format&fit=crop",
        link: "https://omnidoc-ai-k09z.onrender.com"
    },
    {
        id: 2,
        title: "React Native Restaurant App",
        description: "Full-stack ordering app. Reduced latency by 35% and increased engagement by 25%. Custom RESTful APIs with Node.js & MongoDB.",
        tech_stack: "React Native, Node.js, Express.js, MongoDB, REST API",
        image_url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop",
        link: "https://github.com/ruchitparmar11/restaurant-ordering-system"
    },
    {
        id: 3,
        title: "LeetCode Profile",
        description: "Active problem solver with demonstrated proficiency in Data Structures and Algorithms. Solved complex problems using Java and C++.",
        tech_stack: "Java, C++, Data Structures, Algorithms",
        image_url: "/images/leetcode_profile.png",
        link: "https://leetcode.com/u/ruchitparmar11/"
    },
    {
        id: 4,
        title: "Real Estate Platform",
        description: "Modern real estate marketplace with property listings, advanced filtering, and immersive property details. Built for seamless user experience.",
        tech_stack: "React, Node.js, MongoDB, Express, TailwindCSS",
        image_url: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073&auto=format&fit=crop",
        link: "https://real-estate-phi-murex.vercel.app/"
    },
    {
        id: 5,
        title: "OpsAssistant",
        description: "Intelligent DevOps assistant for automating infrastructure tasks and monitoring system health. Streamlines operational workflows.",
        tech_stack: "Python, FastAPI, Shell, Docker, AWS, CI/CD",
        image_url: "/images/ops_assistant.png",
        link: "https://github.com/ruchitparmar11/OpsAssitant"
    },
    {
        id: 6,
        title: "Retain AI",
        description: "AI-powered customer retention engine. Analyzes user behavior patterns to predict churn and suggest retention strategies.",
        tech_stack: "Python, FastAPI, Machine Learning, Scikit-learn, Pandas, API",
        image_url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
        link: "https://github.com/ruchitparmar11/Retain-AI"
    }
];

const skills = [
    { id: 1, name: "Python", proficiency: 95, category: "ML/AI" },
    { id: 2, name: "Machine Learning", proficiency: 90, category: "ML/AI" },
    { id: 3, name: "React.js / React Native", proficiency: 92, category: "Frontend" },
    { id: 4, name: "Fastapi", proficiency: 88, category: "Backend" },
    { id: 5, name: "Node.js / Express", proficiency: 88, category: "Backend" },
    { id: 6, name: "MongoDB / MySQL", proficiency: 85, category: "Database" },
    { id: 7, name: "Java / C++", proficiency: 80, category: "Languages" },
    { id: 8, name: "Github/Git", proficiency: 80, category: "Version Control" }
];

const education = [
    {
        degree: "B.Tech in Computer Science",
        institution: "Dr. Kiran & Pallavi Patel Global University",
        year: "Expected 2026",
        score: "CGPA: 8.6/10"
    },
    {
        degree: "Higher Secondary (12th Science)",
        institution: "Parth Institute, Vadodara",
        year: "2022",
        score: "50%"
    },
    {
        degree: "Secondary (10th Science)",
        institution: "Utkarsh Vidhyalaya, Vadodara",
        year: "2020",
        score: "78%"
    }
];

const certifications = [
    { name: "Deloitte Data Analytics", issuer: "Deloitte" },
    { name: "AWS Generative AI with Diffusion Models", issuer: "AWS" },
    { name: "Code Unnati Program", issuer: "Edunate Foundation" },
    { name: "AWS Foundation of Prompt Engineering", issuer: "AWS" },
    { name: "Introduction to Applied Data Science with Python", issuer: "Unknown" }
];

// In-memory storage for contacts
let contacts = [];

// Routes
app.get('/', (req, res) => {
    res.json({ message: "Welcome to the Interstellar Portfolio API (Node.js)" });
});

app.get('/projects', (req, res) => {
    // Basic pagination support to match Python API signature mock
    const { skip = 0, limit = 100 } = req.query;
    const startIndex = parseInt(skip);
    const endIndex = startIndex + parseInt(limit);
    res.json(projects.slice(startIndex, endIndex));
});

app.get('/skills', (req, res) => {
    const { skip = 0, limit = 100 } = req.query;
    const startIndex = parseInt(skip);
    const endIndex = startIndex + parseInt(limit);
    res.json(skills.slice(startIndex, endIndex));
});

app.get('/education', (req, res) => {
    res.json(education);
});

app.get('/certifications', (req, res) => {
    res.json(certifications);
});

app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const newContact = {
        id: contacts.length + 1,
        name,
        email,
        message,
        timestamp: new Date().toISOString()
    };

    contacts.push(newContact);
    console.log("New Contact Received:", newContact);

    res.status(201).json(newContact);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
