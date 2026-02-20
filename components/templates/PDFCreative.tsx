import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { ResumeData } from "@/lib/types";

const styles = StyleSheet.create({
  page: { flexDirection: "row", fontFamily: "Helvetica" },
  sidebar: { width: "30%", backgroundColor: "#1e293b", padding: 20, color: "white" },
  main: { width: "70%", padding: 25 },
  name: { fontSize: 24, fontWeight: "bold", marginBottom: 5 },
  title: { fontSize: 12, color: "#94a3b8", marginBottom: 15 },
  sidebarSection: { marginBottom: 15 },
  sidebarTitle: { fontSize: 10, fontWeight: "bold", color: "#f97316", marginBottom: 8, textTransform: "uppercase" },
  contactItem: { fontSize: 8, color: "#cbd5e1", marginBottom: 4 },
  mainSection: { marginBottom: 15 },
  mainTitle: { fontSize: 12, fontWeight: "bold", borderBottom: "2pt solid #f97316", paddingBottom: 3, marginBottom: 8 },
  text: { fontSize: 9, lineHeight: 1.4, marginBottom: 2 },
  bold: { fontWeight: "bold" },
  row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 2 },
  bullet: { flexDirection: "row", marginBottom: 1 },
  bulletText: { fontSize: 8, marginLeft: 5, flex: 1 },
});

export const PDFCreativeTemplate = ({ data }: { data: ResumeData }) => {
  const visibleExperience = data.experience.filter(exp => exp.visible !== false);
  const visibleSkills = data.skills.filter(skill => (data.skillsVisibility?.[skill] ?? true));

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.sidebar}>
          <Text style={styles.name}>{data.personalInfo.fullName}</Text>
          <Text style={styles.title}>{data.personalInfo.email}</Text>

          <View style={styles.sidebarSection}>
            <Text style={styles.sidebarTitle}>Contact</Text>
            <Text style={styles.contactItem}>{data.personalInfo.phone}</Text>
            <Text style={styles.contactItem}>{data.personalInfo.location}</Text>
          </View>

          <View style={styles.sidebarSection}>
            <Text style={styles.sidebarTitle}>Skills</Text>
            {visibleSkills.map((skill, i) => (
              <Text key={i} style={styles.contactItem}>• {skill}</Text>
            ))}
          </View>
        </View>

        <View style={styles.main}>
          {visibleExperience.length > 0 && (
            <View style={styles.mainSection}>
              <Text style={styles.mainTitle}>Experience</Text>
              {visibleExperience.map((exp) => (
                <View key={exp.id} style={{ marginBottom: 10 }}>
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

          {data.education.length > 0 && (
            <View style={styles.mainSection}>
              <Text style={styles.mainTitle}>Education</Text>
              {data.education.map((edu) => (
                <View key={edu.id} style={{ marginBottom: 8 }}>
                  <Text style={styles.bold}>{edu.degree} in {edu.field}</Text>
                  <Text style={styles.text}>{edu.institution}</Text>
                  <Text style={styles.text}>{edu.startDate} - {edu.endDate}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
};
