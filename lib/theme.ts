export type Theme = {
  container: React.CSSProperties;
  tagline: React.CSSProperties;
  title: React.CSSProperties;
  paragraph: React.CSSProperties;
  subtitle: React.CSSProperties;
  description: React.CSSProperties;
  button: React.CSSProperties;
  headshot: React.CSSProperties;
  authorName: React.CSSProperties;
  authorHandle: React.CSSProperties;
};

export const themes: { [key: string]: Theme } = {
  theme1: {
    container: {
      backgroundColor: "#1a1a1a",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    },
    tagline: { fontSize: "1.5rem", color: "#fff", fontStyle: "italic" },
    title: {
      fontSize: "2.5rem",
      color: "#ffdd57",
      textShadow: "2px 2px 4px #000",
    },
    paragraph: { fontSize: "1rem", color: "#ddd", lineHeight: "1.6" },
    subtitle: {
      fontSize: "1.5rem",
      color: "#ffdd57",
      textTransform: "uppercase",
    },
    description: { fontSize: "1rem", color: "#ddd", lineHeight: "1.6" },
    button: {
      backgroundColor: "#ffdd57",
      color: "#1a1a1a",
      padding: "10px 20px",
      borderRadius: "5px",
      border: "none",
      cursor: "pointer",
      transition: "background-color 0.3s",
    },
    headshot: { border: "2px solid #ffdd57", borderRadius: "50%" },
    authorName: { color: "#ffdd57", fontWeight: "bold" },
    authorHandle: { color: "#ddd" },
  },
  theme2: {
    container: {
      backgroundColor: "#2e2e2e",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    },
    tagline: { fontSize: "1.5rem", color: "#eee", fontStyle: "italic" },
    title: {
      fontSize: "2.5rem",
      color: "#00bfff",
      textShadow: "2px 2px 4px #000",
    },
    paragraph: { fontSize: "1rem", color: "#ccc", lineHeight: "1.6" },
    subtitle: {
      fontSize: "1.5rem",
      color: "#00bfff",
      textTransform: "uppercase",
    },
    description: { fontSize: "1rem", color: "#ccc", lineHeight: "1.6" },
    button: {
      backgroundColor: "#00bfff",
      color: "#2e2e2e",
      padding: "10px 20px",
      borderRadius: "5px",
      border: "none",
      cursor: "pointer",
      transition: "background-color 0.3s",
    },
    headshot: { border: "2px solid #00bfff", borderRadius: "50%" },
    authorName: { color: "#00bfff", fontWeight: "bold" },
    authorHandle: { color: "#ccc" },
  },
  theme3: {
    container: {
      backgroundColor: "#343a40",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    },
    tagline: { fontSize: "1.5rem", color: "#f8f9fa", fontStyle: "italic" },
    title: {
      fontSize: "2.5rem",
      color: "#ffc107",
      textShadow: "2px 2px 4px #000",
    },
    paragraph: { fontSize: "1rem", color: "#adb5bd", lineHeight: "1.6" },
    subtitle: {
      fontSize: "1.5rem",
      color: "#ffc107",
      textTransform: "uppercase",
    },
    description: { fontSize: "1rem", color: "#adb5bd", lineHeight: "1.6" },
    button: {
      backgroundColor: "#ffc107",
      color: "#343a40",
      padding: "10px 20px",
      borderRadius: "5px",
      border: "none",
      cursor: "pointer",
      transition: "background-color 0.3s",
    },
    headshot: { border: "2px solid #ffc107", borderRadius: "50%" },
    authorName: { color: "#ffc107", fontWeight: "bold" },
    authorHandle: { color: "#adb5bd" },
  },
  theme4: {
    container: {
      backgroundColor: "#f5f5f5",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    },
    tagline: { fontSize: "1.5rem", color: "#333", fontStyle: "italic" },
    title: {
      fontSize: "2.5rem",
      color: "#ff5733",
      textShadow: "2px 2px 4px #000",
    },
    paragraph: { fontSize: "1rem", color: "#555", lineHeight: "1.6" },
    subtitle: {
      fontSize: "1.5rem",
      color: "#ff5733",
      textTransform: "uppercase",
    },
    description: { fontSize: "1rem", color: "#555", lineHeight: "1.6" },
    button: {
      backgroundColor: "#ff5733",
      color: "#fff",
      padding: "10px 20px",
      borderRadius: "5px",
      border: "none",
      cursor: "pointer",
      transition: "background-color 0.3s",
    },
    headshot: { border: "2px solid #ff5733", borderRadius: "50%" },
    authorName: { color: "#ff5733", fontWeight: "bold" },
    authorHandle: { color: "#555" },
  },
  theme5: {
    container: {
      backgroundColor: "#e9ecef",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    },
    tagline: { fontSize: "1.5rem", color: "#495057", fontStyle: "italic" },
    title: {
      fontSize: "2.5rem",
      color: "#28a745",
      textShadow: "2px 2px 4px #000",
    },
    paragraph: { fontSize: "1rem", color: "#6c757d", lineHeight: "1.6" },
    subtitle: {
      fontSize: "1.5rem",
      color: "#28a745",
      textTransform: "uppercase",
    },
    description: { fontSize: "1rem", color: "#6c757d", lineHeight: "1.6" },
    button: {
      backgroundColor: "#28a745",
      color: "#fff",
      padding: "10px 20px",
      borderRadius: "5px",
      border: "none",
      cursor: "pointer",
      transition: "background-color 0.3s",
    },
    headshot: { border: "2px solid #28a745", borderRadius: "50%" },
    authorName: { color: "#28a745", fontWeight: "bold" },
    authorHandle: { color: "#6c757d" },
  },
};
