# 📄 ResuCraft

A modern, dynamic resume builder with live preview and PDF export. Create professional resumes with multiple templates.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwind-css)

## ✨ Features

- 🔐 **Authentication** - Secure login with Supabase
- 📁 **Multiple Profiles** - Create, rename, delete, and duplicate resume profiles
- 📝 **Dynamic Form Editor** - Add, edit, and remove sections in real-time
- 👁️ **Visibility Controls** - Toggle visibility for individual entries
- 🎨 **6 Templates** - Classic, Modern, Compact, Creative, Academic, Balanced
- 📄 **PDF Export** - Clean PDF downloads with react-pdf
- 🎯 **ATS Scoring** - Real-time ATS optimization with keyword suggestions
- 🔗 **Share Resumes** - Generate public links for feedback
- 🌙 **Dark Mode** - Toggle between light and dark themes
- 💡 **Skills Autocomplete** - Smart suggestions from common skills
- 📱 **Responsive** - Works on desktop and mobile devices

## 🛠️ Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Supabase** - Authentication and database
- **react-pdf** - PDF generation
- **Lucide Icons** - Icon library

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- Supabase account

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/bibekamatya/ResuCraft.git
cd ResuCraft
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create `.env.local` with your Supabase credentials:
```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **Run the development server**
```bash
npm run dev
```

5. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
resufy/
├── app/
│   ├── (dashboard)/       # Protected routes
│   │   ├── builder/       # Form editor
│   │   └── resume/        # Preview & export
│   ├── share/[id]/        # Public share page
│   └── globals.css        # Global styles
├── components/
│   ├── forms/             # Form components
│   ├── templates/         # HTML & PDF templates
│   └── ui/                # UI components
├── lib/
│   ├── utils/             # Utilities
│   ├── data/              # Static data
│   └── types.ts           # TypeScript types
└── middleware.ts          # Auth middleware
```

## 🎯 Roadmap

- [x] Authentication with Supabase
- [x] Multiple resume profiles
- [x] Form editor with all sections
- [x] Visibility toggles
- [x] 6 resume templates
- [x] PDF export with react-pdf
- [x] ATS scoring system
- [x] Share functionality
- [x] Dark mode
- [x] Skills autocomplete

## 👨💻 Author

**Bibek Amatya**
- GitHub: [@bibekamatya](https://github.com/bibekamatya)

---

Made with ❤️ by Bibek Amatya
