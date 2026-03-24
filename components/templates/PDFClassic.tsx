import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { ResumeData } from "@/lib/types";

const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 10, fontFamily: "Helvetica" },
  header: { borderBottom: "2pt solid #000", paddingBottom: 12, marginBottom: 15, flexDirection: "row", gap: 15 },
  headerText: { flex: 1 },
  name: { fontSize: 24, fontWeight: "bold", marginBottom: 6 },
  contact: { fontSize: 9, color: "#555", marginBottom: 2 },
  section: { marginBottom: 15 },
  sectionTitle: { fontSize: 12, fontWeight: "bold", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 },
  text: { fontSize: 9, lineHeight: 1.5, marginBottom: 2 },
  bold: { fontWeight: "bold" },
  row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 3 },
  bullet: { flexDirection: "row", marginBottom: 2 },
  bulletText: { fontSize: 9, marginLeft: 8, flex: 1 },
});

export const PDFClassic = ({ data }: { data: ResumeData }) => {
  const { personalInfo, experience, education, projects, skills, certifications, languages } = data;
  const visibleExperience = experience.filter(exp => exp.visible !== false);
  const visibleProjects = projects.filter(proj => proj.visible !== false);
  const visibleSkills = skills.filter(skill => (data.skillsVisibility?.[skill] ?? true));
  const visibleCertifications = (certifications || []).filter(cert => cert.visible !== false);
  const visibleLanguages = (languages || []).filter(lang => lang.visible !== false);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.headerText}>
            <Text style={styles.name}>{personalInfo.fullName}</Text>
            <Text style={styles.contact}>
              {personalInfo.email}{personalInfo.phone && " | "}{personalInfo.phone}{personalInfo.location && " | "}{personalInfo.location}
            </Text>
            {(personalInfo.linkedin || personalInfo.website) && (
              <Text style={styles.contact}>
                {personalInfo.linkedin}{personalInfo.linkedin && personalInfo.website && " | "}{personalInfo.website}
              </Text>
            )}
          </View>
        </View>

        {personalInfo.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Summary</Text>
            <Text style={styles.text}>{personalInfo.summary}</Text>
          </View>
        )}

        {visibleExperience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
            {visibleExperience.map((exp) => (
              <View key={exp.id} style={{ marginBottom: 8 }}>
                <View style={styles.row}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.bold}>{exp.position}</Text>
                    <Text style={styles.text}>{exp.company}</Text>
                  </View>
                  <View style={{ alignItems: "flex-end" }}>
                    <Text style={styles.text}>{exp.location}</Text>
                    <Text style={styles.text}>{exp.startDate} - {exp.current ? "Present" : exp.endDate}</Text>
                  </View>
                </View>
                {exp.description.map((desc, i) => (
                  <View key={i} style={styles.bullet}>
                    <Text>•</Text>
                    <Text style={styles.bulletText}>{desc}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        )}

        {education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {education.map((edu) => (
              <View key={edu.id} style={styles.row}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.bold}>{edu.degree} in {edu.field}</Text>
                  <Text style={styles.text}>{edu.institution}</Text>
                </View>
                <View style={{ alignItems: "flex-end" }}>
                  <Text style={styles.text}>{edu.location}</Text>
                  <Text style={styles.text}>{edu.startDate} - {edu.endDate}</Text>
                  {edu.gpa && <Text style={styles.text}>GPA: {edu.gpa}</Text>}
                </View>
              </View>
            ))}
          </View>
        )}

        {visibleProjects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {visibleProjects.map((proj) => (
              <View key={proj.id} style={{ marginBottom: 6 }}>
                <Text style={styles.bold}>{proj.name}</Text>
                <Text style={styles.text}>{proj.description}</Text>
                {proj.technologies.length > 0 && (
                  <Text style={styles.text}>Technologies: {proj.technologies.join(", ")}</Text>
                )}
                {proj.link && <Text style={styles.text}>{proj.link}</Text>}
              </View>
            ))}
          </View>
        )}

        {visibleSkills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <Text style={styles.text}>{visibleSkills.join(" | ")}</Text>
          </View>
        )}

        {visibleCertifications.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Certifications</Text>
            {visibleCertifications.map((cert) => (
              <View key={cert.id} style={styles.row}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.bold}>{cert.name}</Text>
                  <Text style={styles.text}>{cert.issuer}</Text>
                  {cert.credentialId && <Text style={styles.text}>ID: {cert.credentialId}</Text>}
                </View>
                <Text style={styles.text}>{cert.date}</Text>
              </View>
            ))}
          </View>
        )}

        {visibleLanguages.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Languages</Text>
            <Text style={styles.text}>{visibleLanguages.map(l => `${l.name}: ${l.proficiency}`).join(" | ")}</Text>
          </View>
        )}
      </Page>
    </Document>
  );
};
