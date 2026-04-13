export default function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-[#111]">
      <div className="max-w-[780px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-5">
        <a href="#" className="font-mono text-sm font-bold tracking-tight">
          <span className="text-[#e87a2a]">&gt;</span>{" "}
          <span className="text-[#ddd]">revoca</span>
          <span className="text-[#333]">.</span>
          <span className="text-[#e87a2a]">ai</span>
        </a>

        <p className="font-mono text-[10px] text-[#282828] text-center">
          &copy; 2025 Revoca AI &mdash; The Context Layer for the Enterprise
        </p>

        <a
          href="https://cal.com/revoca-ai"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[11px] text-[#3a3a3a] hover:text-[#e87a2a] transition-colors duration-200"
        >
          Book a Call &rarr;
        </a>
      </div>
    </footer>
  );
}
