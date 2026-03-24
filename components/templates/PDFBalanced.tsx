import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { ResumeData } from "@/lib/types";

const styles = StyleSheet.create({
  page: { padding: 30, fontFamily: "Helvetica" },
  header: { marginBottom: 15, flexDirection: "row", gap: 10, alignItems: "center" },
  headerText: { flex: 1 },
  name: { fontSize: 24, fontWeight: "bold" },
  contact: { fontSize: 8, color: "#555", marginTop: 5 },
  summary: { fontSize: 9, lineHeight: 1.4, marginTop: 10, padding: 10, backgroundColor: "#f8f8f8" },
  section: { marginBottom: 12 },
  sectionTitle: { fontSize: 12, fontWeight: "bold", marginBottom: 8 },
  text: { fontSize: 9, lineHeight: 1.4, marginBottom: 2 },
  bold: { fontWeight: "bold" },
  row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 2 },
  bullet: { flexDirection: "row", marginBottom: 1 },
  bulletText: { fontSize: 8, marginLeft: 5, flex: 1 },
});

export const PDFBalanced = ({ data }: { data: ResumeData }) => {
  const visibleExperience = data.experience.filter(exp => exp.visible !== false);
  const visibleProjects = data.projects.filter(proj => proj.visible !== false);
  const visibleSkills = data.skills.filter(skill => (data.skillsVisibility?.[skill] ?? true));
  const visibleCertifications = (data.certifications || []).filter(cert => cert.visible !== false);
  const visibleLanguages = (data.languages || []).filter(lang => lang.visible !== false);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.headerText}>
            <Text style={styles.name}>{data.personalInfo.fullName}</Text>
            <Text style={styles.contact}>
              {data.personalInfo.email} | {data.personalInfo.phone} | {data.personalInfo.location}
            </Text>
            {(data.personalInfo.linkedin || data.personalInfo.website) && (
              <Text style={styles.contact}>
                {data.personalInfo.linkedin}{data.personalInfo.linkedin && data.personalInfo.website && " | "}{data.personalInfo.website}
              </Text>
            )}
            {data.personalInfo.summary && (
              <Text style={styles.summary}>{data.personalInfo.summary}</Text>
            )}
          </View>
        </View>

        {visibleExperience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
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
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {data.education.map((edu) => (
              <View key={edu.id} style={{ marginBottom: 8 }}>
                <View style={styles.row}>
                  <Text style={styles.bold}>{edu.degree} in {edu.field}</Text>
                  <Text style={styles.text}>{edu.startDate} - {edu.endDate}</Text>
                </View>
                <Text style={styles.text}>{edu.institution}</Text>
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

        {visibleProjects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {visibleProjects.map((proj) => (
              <View key={proj.id} style={{ marginBottom: 6 }}>
                <Text style={styles.bold}>{proj.name}</Text>
                <Text style={styles.text}>{proj.description}</Text>
                <Text style={styles.text}>Tech: {proj.technologies.join(", ")}</Text>
              </View>
            ))}
          </View>
        )}

        {visibleCertifications.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Certifications</Text>
            {visibleCertifications.map((cert) => (
              <View key={cert.id} style={{ marginBottom: 5 }}>
                <View style={styles.row}>
                  <Text style={styles.bold}>{cert.name}</Text>
                  <Text style={styles.text}>{cert.date}</Text>
                </View>
                <Text style={styles.text}>{cert.issuer}</Text>
              </View>
            ))}
          </View>
        )}

        {visibleLanguages.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Languages</Text>
            <Text style={styles.text}>{visibleLanguages.map(l => `${l.name} (${l.proficiency})`).join(" | ")}</Text>
          </View>
        )}
      </Page>
    </Document>
  );
};
