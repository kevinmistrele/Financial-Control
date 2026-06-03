export const cssVars = {
  accent: "hsl(var(--accent))",
  accentSubtle: "hsl(var(--accent) / 0.1)",
  destructive: "hsl(var(--destructive))",
  border: "hsl(var(--border))",
  background: "hsl(var(--background))",
  backgroundOverlay: "hsl(var(--background) / 0.5)",
  mutedForeground: "hsl(var(--muted-foreground))",
  card: "hsl(var(--card))",
} as const;

export const resolvedColors = {
  accent: "#14b8a5",
  border: "#2c2c30",
  mutedForeground: "#a1a1aa",
  destructive: "#dc2828",
  background: "#09090b",
} as const;
