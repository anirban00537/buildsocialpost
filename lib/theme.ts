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
      backgroundColor: "#333",
      padding: "20px",
      borderRadius: "10px",
    },
    tagline: { fontSize: "2rem", color: "#fff", fontStyle: "italic" },
    title: { fontSize: "3rem", color: "#ff0", textShadow: "2px 2px 4px #000" },
    paragraph: { fontSize: "1.5rem", color: "#ccc", lineHeight: "1.6" },
    subtitle: { fontSize: "2rem", color: "#fff", textTransform: "uppercase" },
    description: { fontSize: "1.5rem", color: "#ccc", lineHeight: "1.6" },
    button: {
      backgroundColor: "#fbbf24",
      color: "#000",
      padding: "10px 20px",
      borderRadius: "5px",
      border: "none",
    },
    headshot: { border: "2px solid #fff", borderRadius: "50%" },
    authorName: { color: "#ff0", fontWeight: "bold" },
    authorHandle: { color: "#ccc" },
  },
  theme2: {
    container: {
      backgroundColor: "#222",
      padding: "20px",
      borderRadius: "10px",
    },
    tagline: { fontSize: "1.8rem", color: "#ddd", fontStyle: "italic" },
    title: {
      fontSize: "2.8rem",
      color: "#eee",
      textShadow: "2px 2px 4px #000",
    },
    paragraph: { fontSize: "1.3rem", color: "#bbb", lineHeight: "1.6" },
    subtitle: { fontSize: "1.8rem", color: "#ddd", textTransform: "uppercase" },
    description: { fontSize: "1.3rem", color: "#bbb", lineHeight: "1.6" },
    button: {
      backgroundColor: "#00f",
      color: "#fff",
      padding: "10px 20px",
      borderRadius: "5px",
      border: "none",
    },
    headshot: { border: "2px solid #000", borderRadius: "50%" },
    authorName: { color: "#fff", fontWeight: "bold" },
    authorHandle: { color: "#999" },
  },
  theme3: {
    container: {
      backgroundColor: "#444",
      padding: "20px",
      borderRadius: "10px",
    },
    tagline: { fontSize: "2rem", color: "#000", fontStyle: "italic" },
    title: { fontSize: "3rem", color: "#0ff", textShadow: "2px 2px 4px #000" },
    paragraph: { fontSize: "1.5rem", color: "#666", lineHeight: "1.6" },
    subtitle: { fontSize: "2rem", color: "#000", textTransform: "uppercase" },
    description: { fontSize: "1.5rem", color: "#666", lineHeight: "1.6" },
    button: {
      backgroundColor: "#f00",
      color: "#fff",
      padding: "10px 20px",
      borderRadius: "5px",
      border: "none",
    },
    headshot: { border: "2px solid #666", borderRadius: "50%" },
    authorName: { color: "#0ff", fontWeight: "bold" },
    authorHandle: { color: "#666" },
  },
  theme4: {
    container: {
      backgroundColor: "#f0f0f0",
      padding: "20px",
      borderRadius: "10px",
    },
    tagline: { fontSize: "2rem", color: "#333", fontStyle: "italic" },
    title: {
      fontSize: "3rem",
      color: "#ff5733",
      textShadow: "2px 2px 4px #000",
    },
    paragraph: { fontSize: "1.5rem", color: "#555", lineHeight: "1.6" },
    subtitle: { fontSize: "2rem", color: "#333", textTransform: "uppercase" },
    description: { fontSize: "1.5rem", color: "#555", lineHeight: "1.6" },
    button: {
      backgroundColor: "#ff5733",
      color: "#fff",
      padding: "10px 20px",
      borderRadius: "5px",
      border: "none",
    },
    headshot: { border: "2px solid #333", borderRadius: "50%" },
    authorName: { color: "#ff5733", fontWeight: "bold" },
    authorHandle: { color: "#555" },
  },
  theme5: {
    container: {
      backgroundColor: "#e0e0e0",
      padding: "20px",
      borderRadius: "10px",
    },
    tagline: { fontSize: "2rem", color: "#444", fontStyle: "italic" },
    title: {
      fontSize: "3rem",
      color: "#33ff57",
      textShadow: "2px 2px 4px #000",
    },
    paragraph: { fontSize: "1.5rem", color: "#666", lineHeight: "1.6" },
    subtitle: { fontSize: "2rem", color: "#444", textTransform: "uppercase" },
    description: { fontSize: "1.5rem", color: "#666", lineHeight: "1.6" },
    button: {
      backgroundColor: "#33ff57",
      color: "#fff",
      padding: "10px 20px",
      borderRadius: "5px",
      border: "none",
    },
    headshot: { border: "2px solid #444", borderRadius: "50%" },
    authorName: { color: "#33ff57", fontWeight: "bold" },
    authorHandle: { color: "#666" },
  },
};
