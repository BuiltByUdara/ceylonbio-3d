"use client";
export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main style={{ margin: 0, width: "100%", padding: "15vh 10vw" }}>
      <h1>Let’s try that again.</h1>
      <p style={{ color: "#8fa8aa", margin: "24px 0" }}>
        The learning studio could not load. Your next discovery is still here.
      </p>
      <button
        onClick={reset}
        style={{ background: "#254b40", borderRadius: 8, padding: "12px 20px" }}
      >
        Reload the studio
      </button>
    </main>
  );
}
