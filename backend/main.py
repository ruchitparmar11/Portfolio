from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from database import engine, Base, get_db
import models
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional

from contextlib import asynccontextmanager
from dotenv import load_dotenv

load_dotenv()

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Create tables on startup
    models.Base.metadata.create_all(bind=engine)
    yield

app = FastAPI(title="Interstellar Portfolio API", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic Schemas
class ProjectBase(BaseModel):
    title: str
    description: str
    tech_stack: str
    image_url: Optional[str] = None
    link: Optional[str] = None

class Project(ProjectBase):
    id: int
    class Config:
        from_attributes = True

class SkillBase(BaseModel):
    name: str
    proficiency: int
    category: str

class Skill(SkillBase):
    id: int
    class Config:
        from_attributes = True

class Education(BaseModel):
    degree: str
    institution: str
    year: str
    score: str

class Certification(BaseModel):
    name: str
    issuer: str

class ContactBase(BaseModel):
    name: str
    email: str
    message: str

class Contact(ContactBase):
    id: int
    timestamp: str
    class Config:
        from_attributes = True

@app.post("/contact", response_model=Contact)
def create_contact(contact: ContactBase, db: Session = Depends(get_db)):
    db_contact = models.Contact(name=contact.name, email=contact.email, message=contact.message)
    db.add(db_contact)
    db.commit()
    db.refresh(db_contact)
    return db_contact

@app.get("/")
def read_root():
    return {"message": "Welcome to the Interstellar Portfolio API"}

@app.get("/projects", response_model=List[Project])
def read_projects(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    try:
        projects = db.query(models.Project).offset(skip).limit(limit).all()
        if not projects:
             # Return mock data if empty
             return [
                {
                    "id": 1,
                    "title": "OMNIDOC AI Multimodal System",
                    "description": "Multimodal AI platform processing 6+ data formats (text, PDF, video). Integrated Gemini 2.0 Pro API & Transformer LLMs. Improved quality by 22%.",
                    "tech_stack": "Python, Gemini 2.0 Pro, Streamlit, LLMs, MySQL",
                    "image_url": "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1932&auto=format&fit=crop", # Generic AI image
                    "link": "https://omnidoc-ai-k09z.onrender.com"
                },
                {
                    "id": 2,
                    "title": "React Native Restaurant App",
                    "description": "Full-stack ordering app. Reduced latency by 35% and increased engagement by 25%. Custom RESTful APIs with Node.js & MongoDB.",
                    "tech_stack": "React Native, Node.js, Express.js, MongoDB, REST API",
                    "image_url": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop", # Restaurant app context
                    "link": "https://github.com/ruchitparmar11/restaurant-ordering-system"
                },
                {
                    "id": 3,
                    "title": "LeetCode Profile",
                    "description": "Active problem solver with demonstrated proficiency in Data Structures and Algorithms. Solved complex problems using Java and C++.",
                    "tech_stack": "Java, C++, Data Structures, Algorithms",
                    "image_url": "https://images.unsplash.com/photo-1515879427998-ea609dc777f4?q=80&w=2070&auto=format&fit=crop", # Coding context
                    "link": "https://leetcode.com/u/ruchitparmar11/"
                }
             ]
        return projects
    except Exception as e:
        print(f"DB Error: {e}")
        # Fallback to mock data if DB connection fails
        return [
                {
                    "id": 1,
                    "title": "OMNIDOC AI Multimodal System",
                    "description": "Multimodal AI platform processing 6+ data formats (text, PDF, video). Integrated Gemini 2.0 Pro API & Transformer LLMs. Improved quality by 22%.",
                    "tech_stack": "Python, Gemini 2.0 Pro, Streamlit, LLMs, MySQL",
                    "image_url": "",
                    "link": "https://omnidoc-ai-k09z.onrender.com"
                },
                {
                    "id": 2,
                    "title": "React Native Restaurant App",
                    "description": "Full-stack ordering app. Reduced latency by 35% and increased engagement by 25%. Custom RESTful APIs with Node.js & MongoDB.",
                    "tech_stack": "React Native, Node.js, Express.js, MongoDB, REST API",
                    "image_url": "",
                    "link": "https://github.com/ruchitparmar11/restaurant-ordering-system"
                },
                {
                    "id": 3,
                    "title": "LeetCode Profile",
                    "description": "Active problem solver with demonstrated proficiency in Data Structures and Algorithms. Solved complex problems using Java and C++.",
                    "tech_stack": "Java, C++, Data Structures, Algorithms",
                    "image_url": "",
                    "link": "https://leetcode.com/u/ruchitparmar11/"
                }
        ]

@app.get("/skills", response_model=List[Skill])
def read_skills(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    try:
        skills = db.query(models.Skill).offset(skip).limit(limit).all()
        if not skills:
            return [
                {"id": 1, "name": "Python", "proficiency": 95, "category": "ML/AI"},
                {"id": 2, "name": "Machine Learning", "proficiency": 90, "category": "ML/AI"},
                {"id": 3, "name": "React.js / React Native", "proficiency": 92, "category": "Frontend"},
                {"id": 4, "name": "Fastapi", "proficiency": 88, "category": "Backend"},
                {"id": 5, "name": "Node.js / Express", "proficiency": 88, "category": "Backend"},
                {"id": 6, "name": "MongoDB / MySQL", "proficiency": 85, "category": "Database"},
                {"id": 7, "name": "Java / C++", "proficiency": 80, "category": "Languages"},
                {"id": 8, "name": "Github/Git", "proficiency": 80, "category": "Version Control"}
            ]
        return skills
    except Exception:
        return [
                {"id": 1, "name": "Python", "proficiency": 95, "category": "ML/AI"},
                {"id": 2, "name": "Machine Learning", "proficiency": 90, "category": "ML/AI"},
                {"id": 3, "name": "React.js", "proficiency": 92, "category": "Frontend"},
                {"id": 4, "name": "Fastapi", "proficiency": 88, "category": "Backend"},
        ]

@app.get("/education", response_model=List[Education])
def read_education():
    return [
        {
            "degree": "B.Tech in Computer Science",
            "institution": "Dr. Kiran & Pallavi Patel Global University",
            "year": "Expected 2026",
            "score": "CGPA: 8.6/10"
        },
        {
            "degree": "Higher Secondary (12th Science)",
            "institution": "Parth Institute, Vadodara",
            "year": "2022",
            "score": "50%"
        },
        {
            "degree": "Secondary (10th Science)",
            "institution": "Utkarsh Vidhyalaya, Vadodara",
            "year": "2020",
            "score": "78%"
        }
    ]

@app.get("/certifications", response_model=List[Certification])
def read_certifications():
    return [
        {"name": "Deloitte Data Analytics", "issuer": "Deloitte"},
        {"name": "AWS Generative AI with Diffusion Models", "issuer": "AWS"},
        {"name": "Code Unnati Program", "issuer": "Edunate Foundation"},
        {"name": "AWS Foundation of Prompt Engineering", "issuer": "AWS"},
        {"name": "Introduction to Applied Data Science with Python", "issuer": "Unknown"}
    ]
