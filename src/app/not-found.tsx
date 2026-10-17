import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-midnight px-5 pt-[var(--nav-height)] text-center text-white">
      <p className="font-mono text-sm text-electric">404</p>
      <h1 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">Page not found</h1>
      <p className="mt-4 max-w-md text-slate-muted">
        The page you are looking for does not exist or may have moved.
      </p>
      <Button href="/" className="mt-8" size="lg">
        Return home
      </Button>
      <Link href="/contact" className="mt-4 text-sm text-electric hover:text-white">
        Contact us
      </Link>
    </div>
  );
}
