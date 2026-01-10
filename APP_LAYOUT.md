# ResuCraft App Layout Design

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                                    HEADER BAR                                            │
│  📄 ResuCraft    [Classic ▼] [Modern]    [← Back]  [Export PDF]  [Download]            │
└─────────────────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────┬──────────────────────────────────────────────────────┐
│                                  │                                                      │
│         EDITOR PANEL             │              PREVIEW PANEL                           │
│         (Left Side)              │              (Right Side)                            │
│                                  │                                                      │
│  ┌────────────────────────────┐  │  ┌────────────────────────────────────────────────┐ │
│  │                            │  │  │                                                │ │
│  │  Personal Information      │  │  │         JOHN DOE                               │ │
│  │  ────────────────────      │  │  │         Full Stack Developer                   │ │
│  │                            │  │  │         john@email.com | +1234567890           │ │
│  │  [Full Name        ]       │  │  │         linkedin.com/in/johndoe                │ │
│  │  [Email            ]       │  │  │                                                │ │
│  │  [Phone            ]       │  │  │  ─────────────────────────────────────────     │ │
│  │  [Location         ]       │  │  │                                                │ │
│  │  [LinkedIn         ]       │  │  │  PROFESSIONAL SUMMARY                          │ │
│  │  [GitHub           ]       │  │  │  Experienced developer with 5+ years...        │ │
│  │  [Website          ]       │  │  │                                                │ │
│  │                            │  │  │  ─────────────────────────────────────────     │ │
│  │  [Summary Textarea ]       │  │  │                                                │ │
│  │  [                 ]       │  │  │  EXPERIENCE                                    │ │
│  │  [                 ]       │  │  │                                                │ │
│  │                            │  │  │  Senior Developer                              │ │
│  └────────────────────────────┘  │  │  Tech Corp • 2020 - Present                    │ │
│                                  │  │  • Led team of 5 developers                    │ │
│  ┌────────────────────────────┐  │  │  • Built scalable applications                 │ │
│  │                            │  │  │                                                │ │
│  │  Experience                │  │  │  Junior Developer                              │ │
│  │  ────────────────────      │  │  │  StartUp Inc • 2018 - 2020                     │ │
│  │                            │  │  │  • Developed features                          │ │
│  │  ┌──────────────────────┐  │  │  │                                                │ │
│  │  │ Position             │  │  │  │  ─────────────────────────────────────────     │ │
│  │  │ Company              │  │  │  │                                                │ │
│  │  │ Duration             │  │  │  │  EDUCATION                                     │ │
│  │  │ • Responsibility 1   │  │  │  │                                                │ │
│  │  │ • Responsibility 2   │  │  │  │  BS Computer Science                           │ │
│  │  │ [+ Add] [Delete]     │  │  │  │  University Name • 2014 - 2018                 │ │
│  │  └──────────────────────┘  │  │  │                                                │ │
│  │                            │  │  │  ─────────────────────────────────────────     │ │
│  │  [+ Add Experience]        │  │  │                                                │ │
│  │                            │  │  │  PROJECTS                                      │ │
│  └────────────────────────────┘  │  │                                                │ │
│                                  │  │  E-commerce Platform                           │ │
│  ┌────────────────────────────┐  │  │  Built full-stack app with Next.js...          │ │
│  │                            │  │  │  Tech: React, Node.js, MongoDB                 │ │
│  │  Education                 │  │  │                                                │ │
│  │  ────────────────────      │  │  │  ─────────────────────────────────────────     │ │
│  │                            │  │  │                                                │ │
│  │  [+ Add Education]         │  │  │  SKILLS                                        │ │
│  │                            │  │  │                                                │ │
│  └────────────────────────────┘  │  │  JavaScript • TypeScript • React • Node.js     │ │
│                                  │  │  Python • MongoDB • PostgreSQL • AWS           │ │
│  ┌────────────────────────────┐  │  │                                                │ │
│  │                            │  │  │                                                │ │
│  │  Projects                  │  │  └────────────────────────────────────────────────┘ │
│  │  ────────────────────      │  │                                                      │
│  │                            │  │                                                      │
│  │  [+ Add Project]           │  │                                                      │
│  │                            │  │                                                      │
│  └────────────────────────────┘  │                                                      │
│                                  │                                                      │
│  ┌────────────────────────────┐  │                                                      │
│  │                            │  │                                                      │
│  │  Skills                    │  │                                                      │
│  │  ────────────────────      │  │                                                      │
│  │                            │  │                                                      │
│  │  [Skill tags with X]       │  │                                                      │
│  │  [+ Add Skill]             │  │                                                      │
│  │                            │  │                                                      │
│  └────────────────────────────┘  │                                                      │
│                                  │                                                      │
└──────────────────────────────────┴──────────────────────────────────────────────────────┘
```

## Layout Specs

### Split View
- **Left Panel (40%)**: Scrollable form editor
- **Right Panel (60%)**: Live preview (A4 paper size)
- **Divider**: Optional resizable split

### Header
- Logo + Template selector (tabs/dropdown)
- Back to home button
- Export/Download PDF button
- Sticky/fixed position

### Editor Panel (Left)
- Collapsible sections with accordion
- Form inputs for each section
- Add/Remove buttons for array items (experience, education, projects)
- Auto-save indicator
- Scroll independently

### Preview Panel (Right)
- A4 paper dimensions (210mm × 297mm)
- Real-time updates as user types
- Zoom controls (optional)
- Matches selected template styling
- Fixed/sticky scroll

### Responsive
- Desktop-first (min 1280px)
- On smaller screens: Stack vertically or tabs to switch between edit/preview

## Color Scheme
- Background: #0f172a (dark)
- Editor panel: #1e293b (slate)
- Preview panel: White (#ffffff) - paper
- Inputs: #334155 (darker slate)
- Accent: #3b82f6 (blue)
- Text: #f1f5f9 (light)

## Interactions
- Type in left → instant update on right
- Add/remove items with smooth animations
- Template switch → preview updates
- Export → generates PDF from preview
