import {
  Document, Packer, Paragraph, TextRun, HeadingLevel,
  AlignmentType, BorderStyle, Table, TableRow, TableCell, WidthType,
} from "docx";
import { ResumeData } from "@/lib/types";

const heading = (text: string) =>
  new Paragraph({
    text,
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 240, after: 80 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: "2563EB" } },
  });

const bullet = (text: string) =>
  new Paragraph({ text: `• ${text}`, indent: { left: 360 }, spacing: { after: 40 } });

const line = (runs: TextRun[]) =>
  new Paragraph({ children: runs, spacing: { after: 60 } });

export async function exportToWord(data: ResumeData, filename: string) {
  const { personalInfo: p, experience, education, skills, projects, certifications, languages, skillsVisibility } = data;

  const visibleSkills = skills.filter(s => skillsVisibility?.[s] ?? true);
  const visibleExp = experience.filter(e => e.visible !== false);
  const visibleProjects = projects.filter(pr => pr.visible !== false);
  const visibleCerts = (certifications || []).filter(c => c.visible !== false);
  const visibleLangs = (languages || []).filter(l => l.visible !== false);

  const sections: Paragraph[] = [
    // Name
    new Paragraph({
      children: [new TextRun({ text: p.fullName, bold: true, size: 36 })],
      alignment: AlignmentType.CENTER,
      spacing: { after: 80 },
    }),
    // Contact line
    new Paragraph({
      children: [
        new TextRun({ text: [p.email, p.phone, p.location, p.linkedin, p.website].filter(Boolean).join("  |  "), size: 20, color: "555555" }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 160 },
    }),
  ];

  if (p.summary) {
    sections.push(heading("Summary"));
    sections.push(new Paragraph({ text: p.summary, spacing: { after: 80 } }));
  }

  if (visibleExp.length > 0) {
    sections.push(heading("Experience"));
    visibleExp.forEach(exp => {
      sections.push(line([
        new TextRun({ text: exp.position, bold: true }),
        new TextRun({ text: `  —  ${exp.company}${exp.location ? `, ${exp.location}` : ""}`, color: "555555" }),
      ]));
      sections.push(line([
        new TextRun({ text: `${exp.startDate} – ${exp.current ? "Present" : exp.endDate}`, italics: true, color: "777777", size: 18 }),
      ]));
      exp.description.forEach(d => sections.push(bullet(d)));
      sections.push(new Paragraph({ spacing: { after: 80 } }));
    });
  }

  if (education.length > 0) {
    sections.push(heading("Education"));
    education.forEach(edu => {
      sections.push(line([
        new TextRun({ text: `${edu.degree} in ${edu.field}`, bold: true }),
        new TextRun({ text: `  —  ${edu.institution}`, color: "555555" }),
      ]));
      sections.push(line([
        new TextRun({ text: `${edu.startDate} – ${edu.endDate}${edu.gpa ? `  •  GPA: ${edu.gpa}` : ""}`, italics: true, color: "777777", size: 18 }),
      ]));
    });
  }

  if (visibleSkills.length > 0) {
    sections.push(heading("Skills"));
    sections.push(new Paragraph({ text: visibleSkills.join("  •  "), spacing: { after: 80 } }));
  }

  if (visibleProjects.length > 0) {
    sections.push(heading("Projects"));
    visibleProjects.forEach(proj => {
      sections.push(line([new TextRun({ text: proj.name, bold: true })]));
      if (proj.description) sections.push(new Paragraph({ text: proj.description, spacing: { after: 40 } }));
      if (proj.technologies.length > 0)
        sections.push(new Paragraph({ text: `Tech: ${proj.technologies.join(", ")}`, spacing: { after: 40 }, children: [new TextRun({ text: `Tech: ${proj.technologies.join(", ")}`, italics: true, size: 18, color: "555555" })] }));
      if (proj.link) sections.push(new Paragraph({ text: proj.link, spacing: { after: 80 } }));
    });
  }

  if (visibleCerts.length > 0) {
    sections.push(heading("Certifications"));
    visibleCerts.forEach(cert => {
      sections.push(line([
        new TextRun({ text: cert.name, bold: true }),
        new TextRun({ text: `  —  ${cert.issuer}${cert.date ? `, ${cert.date}` : ""}`, color: "555555" }),
      ]));
    });
  }

  if (visibleLangs.length > 0) {
    sections.push(heading("Languages"));
    sections.push(new Paragraph({ text: visibleLangs.map(l => `${l.name} (${l.proficiency})`).join("  •  ") }));
  }

  const doc = new Document({
    sections: [{ properties: {}, children: sections }],
  });

  const blob = await Packer.toBlob(doc);
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${filename}.docx`;
  a.click();
  URL.revokeObjectURL(url);
}
