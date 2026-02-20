import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { ResumeData } from "@/lib/types";

const styles = StyleSheet.create({
  page: { padding: 25, fontSize: 9, fontFamily: "Helvetica" },
  container: { flexDirection: "row", gap: 15 },
  left: { flex: 2 },
  right: { flex: 1 },
  header: { marginBottom: 12 },
  name: { fontSize: 22, fontWeight: "bold", marginBottom: 5 },
  contact: { fontSize: 8, color: "#555", marginBottom: 1 },
  section: { marginBottom: 10 },
  sectionTitle: { fontSize: 10, fontWeight: "bold", marginBottom: 5, borderBottom: "1pt solid #000", paddingBottom: 2 },
  text: { fontSize: 8, lineHeight: 1.4, marginBottom: 2 },
  bold: { fontWeight: "bold" },
  row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 2 },
  bullet: { flexDirection: "row", marginBottom: 1 },
  bulletText: { fontSize: 8, marginLeft: 6, flex: 1 },
  tag: { fontSize: 7, backgroundColor: "#f0f0f0", padding: "2 4", marginRight: 3, marginBottom: 3 },
});

interface PDFModernTemplateProps {
  data: ResumeData;
}

export const PDFClassic = ({ data }: PDFModernTemplateProps) => {
  const { personalInfo, experience, education, projects, skills } = data;
  const visibleExperience = experience.filter(exp => exp.visible !== false);
  const visibleProjects = projects.filter(proj => proj.visible !== false);
  const visibleSkills = skills.filter(skill => (data.skillsVisibility?.[skill] ?? true));

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>{personalInfo.fullName}</Text>
          <Text style={styles.contact}>{personalInfo.email}</Text>
          <Text style={styles.contact}>{personalInfo.phone}</Text>
          <Text style={styles.contact}>{personalInfo.location}</Text>
        </View>

        <View style={styles.container}>
          <View style={styles.left}>
            {personalInfo.summary && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>SUMMARY</Text>
                <Text style={styles.text}>{personalInfo.summary}</Text>
              </View>
            )}

            {visibleExperience.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>EXPERIENCE</Text>
                {visibleExperience.map((exp) => (
                  <View key={exp.id} style={{ marginBottom: 6 }}>
                    <View style={styles.row}>
                      <Text style={styles.bold}>{exp.position}</Text>
                      <Text style={styles.text}>{exp.startDate} - {exp.current ? "Present" : exp.endDate}</Text>
                    </View>
                    <Text style={styles.text}>{exp.company} | {exp.location}</Text>
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

            {visibleProjects.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>PROJECTS</Text>
                {visibleProjects.map((proj) => (
                  <View key={proj.id} style={{ marginBottom: 5 }}>
                    <Text style={styles.bold}>{proj.name}</Text>
                    <Text style={styles.text}>{proj.description}</Text>
                    <Text style={styles.text}>Tech: {proj.technologies.join(", ")}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>

          <View style={styles.right}>
            {education.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>EDUCATION</Text>
                {education.map((edu) => (
                  <View key={edu.id} style={{ marginBottom: 5 }}>
                    <Text style={styles.bold}>{edu.degree}</Text>
                    <Text style={styles.text}>{edu.institution}</Text>
                    <Text style={styles.text}>{edu.startDate} - {edu.endDate}</Text>
                  </View>
                ))}
              </View>
            )}

            {visibleSkills.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>SKILLS</Text>
                <Text style={styles.text}>{visibleSkills.join(" • ")}</Text>
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
};
