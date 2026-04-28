type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden bg-primary pb-16 pt-24 text-primary-foreground md:pb-24 md:pt-32">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, hsl(var(--accent)) 0, transparent 40%), radial-gradient(circle at 80% 60%, hsl(var(--accent)) 0, transparent 40%)",
        }}
      />
      <div className="container-x relative">
        <div className="max-w-3xl">
          <p className="eyebrow mb-6">{eyebrow}</p>
          <h1 className="text-5xl leading-[1.05] md:text-6xl lg:text-7xl">{title}</h1>
          {description ? (
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-primary-foreground/70">{description}</p>
          ) : null}
        </div>
      </div>
      <div className="maasai-border absolute inset-x-0 bottom-0 opacity-90" />
    </section>
  );
}
