import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { ResumeData } from "@/lib/types";

const styles = StyleSheet.create({
  page: { padding: 25, fontSize: 9, fontFamily: "Helvetica" },
  header: { marginBottom: 10, borderBottom: "2pt solid #000", paddingBottom: 8 },
  name: { fontSize: 20, fontWeight: "bold" },
  contact: { fontSize: 8, color: "#333", marginTop: 3 },
  grid: { flexDirection: "row", gap: 15 },
  left: { width: "65%" },
  right: { width: "35%" },
  section: { marginBottom: 10 },
  sectionTitle: { fontSize: 10, fontWeight: "bold", marginBottom: 5, textTransform: "uppercase" },
  text: { fontSize: 8, lineHeight: 1.3, marginBottom: 2 },
  bold: { fontWeight: "bold" },
  row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 2 },
  bullet: { flexDirection: "row", marginBottom: 1 },
  bulletText: { fontSize: 8, marginLeft: 5, flex: 1 },
});

export const PDFCompactTemplate = ({ data }: { data: ResumeData }) => {
  const visibleExperience = data.experience.filter(exp => exp.visible !== false);
  const visibleProjects = data.projects.filter(proj => proj.visible !== false);
  const visibleSkills = data.skills.filter(skill => (data.skillsVisibility?.[skill] ?? true));

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>{data.personalInfo.fullName}</Text>
          <Text style={styles.contact}>
            {data.personalInfo.email} | {data.personalInfo.phone} | {data.personalInfo.location}
          </Text>
        </View>

        <View style={styles.grid}>
          <View style={styles.left}>
            {data.personalInfo.summary && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Summary</Text>
                <Text style={styles.text}>{data.personalInfo.summary}</Text>
              </View>
            )}

            {visibleExperience.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Experience</Text>
                {visibleExperience.map((exp) => (
                  <View key={exp.id} style={{ marginBottom: 6 }}>
                    <View style={styles.row}>
                      <Text style={styles.bold}>{exp.position}</Text>
                      <Text style={styles.text}>{exp.startDate} - {exp.current ? "Present" : exp.endDate}</Text>
                    </View>
                    <Text style={styles.text}>{exp.company}</Text>
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
          </View>

          <View style={styles.right}>
            {data.education.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Education</Text>
                {data.education.map((edu) => (
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
                <Text style={styles.sectionTitle}>Skills</Text>
                <Text style={styles.text}>{visibleSkills.join(" • ")}</Text>
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
};
