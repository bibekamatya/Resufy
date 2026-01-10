# 📄 ResuCraft

A modern, dynamic resume builder with live preview and PDF export. Create professional resumes with multiple templates.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwind-css)

## ✨ Features

- 📝 **Dynamic Form Editor** - Add, edit, and remove sections in real-time
- 👁️ **Live Preview** - See changes instantly as you type
- 🎨 **Multiple Templates** - Choose from Classic and Modern designs
- 📄 **PDF Export** - Download your resume as a professional PDF
- 💾 **Auto-save** - Your data is saved automatically in browser
- 📱 **Responsive** - Works on desktop and mobile devices

## 🛠️ Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **jsPDF** - PDF generation
- **Local Storage** - Client-side data persistence

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed

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

3. **Run the development server**
```bash
npm run dev
```

4. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
resucraft/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── Editor.tsx         # Form editor
│   ├── Preview.tsx        # Live preview
│   └── templates/         # Resume templates
├── hooks/                 # Custom React hooks
├── lib/                   # Utilities and types
│   ├── types.ts          # TypeScript types
│   └── initialData.ts    # Sample data
└── public/               # Static assets
```

## 🎯 Roadmap

- [x] Project setup
- [ ] Form editor components
- [ ] Live preview
- [ ] Classic template
- [ ] Modern template
- [ ] PDF export
- [ ] Local storage integration

## 👨💻 Author

**Bibek Amatya**
- GitHub: [@bibekamatya](https://github.com/bibekamatya)

---

Made with ❤️ by Bibek Amatya
