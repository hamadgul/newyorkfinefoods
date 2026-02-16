"use client";

export function NewsletterForm() {
  return (
    <form
      className="mt-4 flex gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        // TODO: Integrate with newsletter service
      }}
    >
      <input
        type="email"
        placeholder="Your email"
        className="flex-1 rounded-sm border border-ivory/20 bg-ivory/10 px-3 py-2 text-sm text-ivory placeholder:text-ivory/40 focus:border-gold focus:outline-none"
      />
      <button
        type="submit"
        className="rounded-sm bg-gold px-4 py-2 text-sm font-semibold text-charcoal transition-colors hover:bg-gold-light"
      >
        Join
      </button>
    </form>
  );
}
