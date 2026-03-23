import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { ResumeData } from "@/lib/types";

const styles = StyleSheet.create({
  page: { padding: 35, fontFamily: "Helvetica" },
  header: { marginBottom: 15, textAlign: "center", alignItems: "center" },
  name: { fontSize: 26, fontWeight: "bold" },
  contact: { fontSize: 8, color: "#555", marginTop: 5 },
  summary: { fontSize: 9, lineHeight: 1.4, textAlign: "center", marginTop: 10, paddingHorizontal: 30 },
  section: { marginBottom: 12 },
  sectionTitle: { fontSize: 11, fontWeight: "bold", borderBottom: "1pt solid #ccc", paddingBottom: 3, marginBottom: 8 },
  text: { fontSize: 9, lineHeight: 1.4, marginBottom: 2 },
  bold: { fontWeight: "bold" },
  row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 2 },
  bullet: { flexDirection: "row", marginBottom: 1 },
  bulletText: { fontSize: 8, marginLeft: 5, flex: 1 },
});

export const PDFAcademic = ({ data }: { data: ResumeData }) => {
  const visibleExperience = data.experience.filter(exp => exp.visible !== false);
  const visibleProjects = data.projects.filter(proj => proj.visible !== false);
  const visibleSkills = data.skills.filter(skill => (data.skillsVisibility?.[skill] ?? true));
  const visibleCertifications = (data.certifications || []).filter(cert => cert.visible !== false);
  const visibleLanguages = (data.languages || []).filter(lang => lang.visible !== false);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>{data.personalInfo.fullName}</Text>
          <Text style={styles.contact}>
            {data.personalInfo.email} | {data.personalInfo.phone} | {data.personalInfo.location}
          </Text>
          {(data.personalInfo.linkedin || data.personalInfo.website) && (
            <Text style={styles.contact}>
              {data.personalInfo.linkedin}{data.personalInfo.linkedin && data.personalInfo.website && " | "}{data.personalInfo.website}
            </Text>
          )}
        </View>

        {data.personalInfo.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Summary</Text>
            <Text style={styles.text}>{data.personalInfo.summary}</Text>
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
                {edu.gpa && <Text style={styles.text}>GPA: {edu.gpa}</Text>}
              </View>
            ))}
          </View>
        )}

        {visibleExperience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
            {visibleExperience.map((exp) => (
              <View key={exp.id} style={{ marginBottom: 8 }}>
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

        {visibleSkills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Technical Skills</Text>
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
                {proj.technologies.length > 0 && (
                  <Text style={styles.text}>Technologies: {proj.technologies.join(", ")}</Text>
                )}
                {proj.link && <Text style={styles.text}>{proj.link}</Text>}
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
