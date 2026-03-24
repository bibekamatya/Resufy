# 📄 Resufy

A modern resume builder with live preview, multiple templates, and PDF/Word export.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwind-css)
![MongoDB](https://img.shields.io/badge/MongoDB-green?style=flat-square&logo=mongodb)

## ✨ Features

- 🔐 **Authentication** - Secure login with NextAuth.js
- 📁 **Multiple Profiles** - Create, rename, delete, and duplicate resume profiles
- 📝 **Dynamic Form Editor** - Add, edit, and remove sections in real-time
- 👁️ **Visibility Controls** - Toggle visibility for individual entries
- 🎨 **6 Templates** - Classic, Modern, Compact, Creative, Academic, Balanced
- 📄 **PDF Export** - Clean PDF downloads with react-pdf
- 📝 **Word Export** - Export resumes as .docx files
- 🎯 **ATS Scoring** - Real-time ATS optimization with keyword suggestions
- 🔗 **Share Resumes** - Generate public links for sharing
- 💡 **Skills Autocomplete** - Smart suggestions from common skills
- 📱 **Responsive** - Works on desktop and mobile

## 🛠️ Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **NextAuth.js** - Authentication
- **MongoDB** - Database for resume storage
- **react-pdf** - PDF generation
- **Lucide Icons** - Icon library

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB database (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- Google OAuth credentials ([Google Cloud Console](https://console.cloud.google.com/))

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/bibekamatya/resufy.git
cd resufy
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create `.env.local` in the root:
```bash
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
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
│   ├── actions/           # Server actions
│   ├── utils/             # Utilities
│   ├── data/              # Static data
│   └── types.ts           # TypeScript types
└── middleware.ts           # Auth middleware
```

## 👨‍💻 Author

**Bibek Amatya**
- GitHub: [@bibekamatya](https://github.com/bibekamatya)

---

Made with ❤️ by Bibek Amatya
