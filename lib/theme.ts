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
    container: { backgroundColor: "#333" },
    tagline: { fontSize: "2rem", color: "#fff" },
    title: { fontSize: "3rem", color: "#ff0" },
    paragraph: { fontSize: "1.5rem", color: "#ccc" },
    subtitle: { fontSize: "2rem", color: "#fff" },
    description: { fontSize: "1.5rem", color: "#ccc" },
    button: { backgroundColor: "#fbbf24", color: "#000" },
    headshot: { border: "2px solid #fff" },
    authorName: { color: "#ff0" },
    authorHandle: { color: "#ccc" },
  },
  theme2: {
    container: { backgroundColor: "#222" },
    tagline: { fontSize: "1.8rem", color: "#ddd" },
    title: { fontSize: "2.8rem", color: "#eee" },
    paragraph: { fontSize: "1.3rem", color: "#bbb" },
    subtitle: { fontSize: "1.8rem", color: "#ddd" },
    description: { fontSize: "1.3rem", color: "#bbb" },
    button: { backgroundColor: "#00f", color: "#fff" },
    headshot: { border: "2px solid #000" },
    authorName: { color: "#fff" },
    authorHandle: { color: "#999" },
  },
  theme3: {
    container: { backgroundColor: "#444" },
    tagline: { fontSize: "2rem", color: "#000" },
    title: { fontSize: "3rem", color: "#0ff" },
    paragraph: { fontSize: "1.5rem", color: "#666" },
    subtitle: { fontSize: "2rem", color: "#000" },
    description: { fontSize: "1.5rem", color: "#666" },
    button: { backgroundColor: "#f00", color: "#fff" },
    headshot: { border: "2px solid #666" },
    authorName: { color: "#0ff" },
    authorHandle: { color: "#666" },
  },
};