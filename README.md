# AI Grading Platform

*AI-powered grading assistance platform for instructors, built primarily with TypeScript.*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/saddamgea-bots-projects/v0-smu-grading-platform)
[![Built with TypeScript](https://img.shields.io/badge/Built%20with-TypeScript-3178c6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
https://smu-grading-platform.vercel.app/

## Overview

The AI Grading Platform enables instructors to manage courses, create assessments, grade submissions, and analyze student performance with AI assistance.  
This repository contains the frontend and backend codebase, primarily developed in TypeScript.

## Features

### Dashboard
- AI general assistant connected to knowledge base (RAG)
- Quick creation of new assessments
- Dashboard widgets for knowledge base, recent activities, AI accuracy
- Overview of active courses

### Courses - Detailed implementation for COR101: Business Fundamentals
- Create new course (period, students, instructors, upload materials - simulation)
- Instructor cards per course
- View all courses with filters (Undergraduate/Graduate, semester, year)
- AI chat per course


### Assessments - Detailed implementation for COR101: Business Fundamentals Mid-term Examination
- Access latest assessment
- Create new assessments with AI assistance, grading, rubrics, and RAG-connected LLM (simulation)
- Student facts and verification checks
- Filter assessments by course


#### Grade Submissions
- Manage files and student answers
- Edit grades manually or request AI re-check
- AI training assistant to refine grading using rubrics or direct interaction

#### Assignment Rubric
- Generate and edit rubrics with AI
- Export rubrics into standard templates

#### View Analytics (per assessment)
- Compare AI vs instructor grading
- Score distribution, performance trends, confidence levels
- Submission history and AI insights

### Analytics (Global)
- Filter by course, averages, or specific student
- Time filters: 2 weeks, 30 days, 90 days
- Performance history, readiness for exams
- Course completion tracking
- Mastery prediction (radar chart format)
- Personalized recommendations

### Knowledge Base
- Dashboard of total documents, active courses, and members
- File management (upload, assign to course, set access, download)
- Upload flow with access and summaries

### Additional Pages
- Account Profile
- About
- Privacy Policy
- Terms of Service
- Contact

## Tech Stack
- Language: TypeScript
- Frontend: React / Next.js
- Backend: Node.js (TypeScript) with Express / Next.js API routes
- Database: PostgreSQL / MongoDB (if applicable)
- AI Integration: Retrieval-Augmented Generation (RAG) with LLMs (OpenAI API or custom models)

## Deployment

project is live at:

** https://smu-grading-platform.vercel.app/ **

## Development

### Prerequisites
- Node.js (>= 18.x)
- npm or yarn

### Installation
```bash
git clone https://github.com/your-username/ai-grading-platform.git
cd ai-grading-platform
npm install
