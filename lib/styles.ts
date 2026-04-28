export const buttonClasses = {
  gold: "inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground shadow-card transition-all hover:bg-accent/90 hover:shadow-elevated",
  navy: "inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-card transition-all hover:bg-primary/90 hover:shadow-elevated",
  outlineLight:
    "inline-flex items-center justify-center gap-2 rounded-full border border-background/40 bg-transparent px-6 py-3 text-sm font-medium text-background backdrop-blur-sm transition-colors hover:bg-background/10",
} as const;

export const fieldClasses = {
  input:
    "flex h-12 w-full rounded-md border border-input bg-background px-4 text-sm text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20",
  select:
    "flex h-12 w-full rounded-md border border-input bg-background px-4 text-sm text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20",
  textarea:
    "flex min-h-[180px] w-full rounded-md border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20",
} as const;
