# 🚀 ResumeForge

<div align="center">
  <img src="https://github.com/Udara-Dilshan/ResumeForge/blob/main/resumeforge-banner.png" alt="ResumeForge project preview" width="100%" />

  <h3>Build. Preview. Analyze. Download.</h3>

  <p>
    A modern, responsive resume builder for creating professional, ATS-friendly resumes with live preview, multiple templates, ATS analysis, and PDF export.
  </p>

  <p>
    <a href="https://resumeforge-ten-peach.vercel.app/">🌐 Live Demo</a>
    ·
    <a href="https://github.com/Udara-Dilshan/ResumeForge">💻 GitHub</a>
    ·
    <a href="https://lnkd.in/p/gANJxgNv">💼 LinkedIn Post</a>
  </p>
</div>

---

## ✨ Features

- 🧩 Step-by-step resume builder
- 👀 Real-time resume preview
- 🎨 ATS Classic, Modern, and Compact templates
- 🤖 Rules-based ATS analysis
- 📄 PDF preview and download
- 💾 Automatic localStorage saving
- 🔄 Safe resume reset / start a new resume
- 📱 Responsive mobile and desktop editor
- 🧾 Personal info, summary, experience, education, projects, skills, certifications, languages, references, and custom sections
- 🔗 LinkedIn, GitHub, and portfolio fields
- ✅ Form validation with React Hook Form + Zod

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React | UI development |
| TypeScript | Type-safe application code |
| Vite | Development and production tooling |
| Tailwind CSS | Responsive styling |
| Zustand | Resume state management and persistence |
| React Hook Form | Form handling |
| Zod | Validation |
| @react-pdf/renderer | PDF generation |
| Vercel | Deployment |

## 🧠 What I Built

ResumeForge was built as a production-style frontend project focused on a practical end-to-end user flow:

1. Enter resume information through a guided wizard.
2. See changes immediately in the live preview.
3. Review the completed resume.
4. Run ATS checks and compare keywords from a job description.
5. Choose a resume template.
6. Preview and download the final resume as a PDF.

## 📂 Project Structure

```text
src/
├── components/
│   ├── layout/
│   ├── preview/
│   ├── ui/
│   └── wizard/
├── data/
├── pages/
├── schemas/
├── services/
├── store/
├── types/
├── utils/
├── App.tsx
└── main.tsx
```

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Udara-Dilshan/ResumeForge.git
cd ResumeForge
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Open the local URL shown by Vite, usually:

```text
http://localhost:5173/
```

## 📦 Production Build

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## 🌐 Live Project

**Live Demo:** https://resumeforge-ten-peach.vercel.app/

**GitHub Repository:** https://github.com/Udara-Dilshan/ResumeForge

**LinkedIn Project Post:** https://lnkd.in/p/gANJxgNv

## 🎯 Learning Highlights

This project helped me work with:

- Modern React and TypeScript architecture
- Reusable form components
- Schema-based validation
- Global state management with persistence
- Responsive UI patterns
- Live preview systems
- Client-side PDF generation
- ATS-oriented resume checks
- Production deployment with Vercel

## 👨‍💻 Author

**Udara Dilshan**

- GitHub: https://github.com/Udara-Dilshan
- ResumeForge: https://resumeforge-ten-peach.vercel.app/
- LinkedIn Post: https://lnkd.in/p/gANJxgNv

## ⭐ Support

If you find ResumeForge useful or interesting, consider giving the repository a ⭐ on GitHub and sharing feedback.

---

<div align="center">
  <p>Built with ❤️ using React, TypeScript, and modern frontend tools.</p>
</div>
