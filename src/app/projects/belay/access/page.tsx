type BelayAccessPageProps = {
  searchParams?: {
    error?: string;
    next?: string;
  };
};

export default function BelayAccessPage({ searchParams }: BelayAccessPageProps) {
  const hasError = Boolean(searchParams?.error);
  const nextPath = searchParams?.next
    ? encodeURIComponent(searchParams.next)
    : "";
  const formAction = nextPath
    ? `/projects/belay/access?next=${nextPath}`
    : "/projects/belay/access";

  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center justify-center gap-6 p-4 md:p-12">
      <div className="w-full max-w-xl space-y-4 rounded-2xl border bg-card p-6 shadow-sm">
        <header className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Selected Work
          </p>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            Belay access
          </h1>
          <p className="text-sm text-muted-foreground md:text-base">
            This case study is password-protected due to client
            confidentiality. Please enter the access code provided.
          </p>
        </header>

        <form action={formAction} method="post" className="space-y-3">
          <label className="flex flex-col gap-2 text-sm font-medium">
            Access code
            <input
              type="password"
              name="password"
              required
              className="h-11 rounded-xl border bg-background px-3 text-base text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </label>
          {hasError ? (
            <p className="text-sm text-destructive">
              That code didn&apos;t work. Please try again.
            </p>
          ) : null}
          <button
            type="submit"
            className="inline-flex h-11 items-center justify-center rounded-xl bg-foreground px-5 text-sm font-semibold text-background shadow-sm transition hover:bg-foreground/90"
          >
            Unlock project
          </button>
        </form>
      </div>
    </main>
  );
}
