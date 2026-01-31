export const projects = [
    {
        id: 1,
        title: "OMNIDOC AI Multimodal System",
        description: "Multimodal AI platform processing 6+ data formats (text, PDF, video). Integrated Gemini 2.0 Pro API & Transformer LLMs. Improved quality by 22%.",
        tech_stack: "Python, Gemini 2.0 Pro, Streamlit, LLMs, MySQL",
        image_url: "/images/omnidoc_visual.png",
        link: "https://github.com/ruchitparmar11/OMNIDOC-AI",
        live_link: "https://omnidoc-ai-k09z.onrender.com"
    },
    {
        id: 2,
        title: "OpsAssistant",
        description: "Intelligent DevOps assistant for automating infrastructure tasks and monitoring system health. Streamlines operational workflows.",
        tech_stack: "Python, FastAPI, Shell, Docker, AWS, CI/CD",
        image_url: "/images/ops_assistant_visual.png",
        link: "https://github.com/ruchitparmar11/OpsAssitant",
        live_link: "https://ops-assitant.vercel.app/"
    },
    {
        id: 3,
        title: "Retain AI",
        description: "AI-powered customer retention engine. Analyzes user behavior patterns to predict churn and suggest retention strategies.",
        tech_stack: "Python, FastAPI, Machine Learning, Scikit-learn, Pandas, API",
        image_url: "/images/retain_ai_visual.png",
        link: "https://github.com/ruchitparmar11/Retain-AI",
        live_link: "https://retain-ai-mu.vercel.app/"
    },
    {
        id: 4,
        title: "DocHealth AI",
        description: "Healthcare document analysis system powered by AI. Faciliates processing of medical records with React Native interface.",
        tech_stack: "React Native, React.js, AI, Healthcare",
        image_url: "/images/dochealth_visual.png",
        link: "https://github.com/ruchitparmar11/DocHealthAI",
        live_link: "https://doc-health-ai.vercel.app/"
    },
    {
        id: 5,
        title: "Real Estate Platform",
        description: "Modern real estate marketplace with property listings, advanced filtering, and immersive property details. Built for seamless user experience.",
        tech_stack: "React, Node.js, MongoDB, Express, TailwindCSS",
        image_url: "/images/real_estate_visual.png",
        link: "https://github.com/ruchitparmar11/Real_Estate-",
        live_link: "https://real-estate-phi-murex.vercel.app/"
    },
    {
        id: 6,
        title: "React Native Restaurant App",
        description: "Full-stack ordering app. Reduced latency by 35% and increased engagement by 25%. Custom RESTful APIs with Node.js & MongoDB.",
        tech_stack: "React Native, Node.js, Express.js, MongoDB, REST API",
        image_url: "/images/restaurant_visual.png",
        link: "https://github.com/ruchitparmar11/restaurant-ordering-system"
    },
    {
        id: 7,
        title: "LeetCode Profile",
        description: "Active problem solver with demonstrated proficiency in Data Structures and Algorithms. Solved complex problems using Java and C++.",
        tech_stack: "Java, C++, Data Structures, Algorithms",
        image_url: "/images/leetcode_visual.png",
        link: "https://leetcode.com/u/ruchitparmar11/"
    }
];

export const skills = [
    { id: 1, name: "Python", proficiency: 95, category: "ML/AI" },
    { id: 2, name: "Machine Learning", proficiency: 90, category: "ML/AI" },
    { id: 3, name: "React.js / React Native", proficiency: 92, category: "Frontend" },
    { id: 4, name: "Fastapi", proficiency: 88, category: "Backend" },
    { id: 5, name: "Node.js / Express", proficiency: 88, category: "Backend" },
    { id: 6, name: "MongoDB / MySQL", proficiency: 85, category: "Database" },
    { id: 7, name: "Java / C++", proficiency: 80, category: "Languages" },
    { id: 8, name: "Github/Git", proficiency: 80, category: "Version Control" }
];

export const education = [
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

export const certifications = [
    { name: "Deloitte Data Analytics", issuer: "Deloitte" },
    { name: "AWS Generative AI with Diffusion Models", issuer: "AWS" },
    { name: "Code Unnati Program", issuer: "Edunate Foundation" },
    { name: "AWS Foundation of Prompt Engineering", issuer: "AWS" },
    { name: "Introduction to Applied Data Science with Python", issuer: "Unknown" }
];

export const experience = [
    {
        id: 1,
        company: "FinTech",
        role: "Intern",
        duration: "2024",
        description: "Developed a Machine Learning Financial Analysis Project that fetches data from an API, generates insights, stores results in MySQL, and displays them on a real-time web dashboard.",
        image_url: "/images/fintech_visual.png",
        certificate: "/docs/Finteck_Internship_Certificate.pdf",
        details: {
            projectTitle: "Machine Learning Financial Analysis Project",
            overview: "This project fetches financial data from an API, performs machine learning analysis to generate insights (Pros/Cons), stores the results in a MySQL database, and displays them on a real-time web dashboard.",
            features: [
                "Automated Data Fetching: Retrieves Balance Sheet, P&L, and Cash Flow data.",
                "ML Analysis: Generates 'Pros' and 'Cons' based on financial metrics.",
                "Database Storage: Persists all raw data and analysis results.",
                "Premium Dashboard: Modern, responsive web interface."
            ],
            tech_stack: ["Python 3.8+", "MySQL", "Flask", "Machine Learning"]
        }
    },
    {
        id: 2,
        company: "J.P. Morgan",
        role: "Virtual Job Simulation",
        duration: "2024",
        description: "Completed practical tasks in software engineering, analyzing data visualization and patching broken code.",
        image_url: "/images/banking_tech_visual.png",
        certificate: "/docs/JP_MORGAN.pdf"
    }
];
