# ⚡ EngiAssist — Engineering Student Project Portal

India's #1 platform to help engineering students build projects across all branches.

## 🎓 Supported Branches
- 💻 Computer Science & IT
- ⚙️ Mechanical Engineering
- 🏗️ Civil Engineering
- ⚡ Electronics & Communication
- 🌐 AI/ML & Data Science
- 🧪 Chemical Engineering

## 🚀 Features
- Branch-specific project ideas (100+ topics)
- Contact form for project help requests
- Serverless API backend (Vercel Functions)
- Fully responsive premium UI

## 🛠️ Local Development

```bash
cd app
npm install
npm run dev
```

## 🌐 Deploy to Vercel

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import from GitHub
3. Vercel auto-detects settings from `vercel.json`
4. Click **Deploy** — done!

Your site will be live at `https://your-project.vercel.app`

## 📁 Project Structure

```
├── app/              # React (Vite) frontend
│   ├── src/
│   │   ├── App.jsx   # Main component
│   │   └── index.css # Premium styles
│   └── index.html
├── api/              # Vercel serverless functions
│   ├── request.js    # Handle project requests
│   └── projects.js   # Project data API
├── vercel.json       # Deployment config
└── README.md
```

## 🔧 Git Commands to Upload

```bash
git init
git add .
git commit -m "✨ New premium EngiAssist portal"
git remote add origin https://github.com/viralsparkconnect-hue/student-assist-portal.git
git push -u origin main --force
```

---
Built with ❤️ for Engineering Students 🇮🇳
