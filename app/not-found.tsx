import Link from "next/link";
import { buttonClasses } from "@/lib/styles";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container-x max-w-3xl text-center">
        <p className="eyebrow mb-6 justify-center">Page Not Found</p>
        <h1 className="text-5xl leading-tight text-primary md:text-6xl">This page does not exist.</h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          The page you requested may have moved or no longer be available. Return to the homepage or
          browse our services.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link href="/" className={buttonClasses.gold}>
            Return Home
          </Link>
          <Link href="/services" className={buttonClasses.navy}>
            View Services
          </Link>
        </div>
      </div>
    </section>
  );
}
