"use client"

export default function Footer() {
  return (
    <footer
      className="bg-gray-200 fixed bottom-0 w-screen z-50"
    >
      <div
        className="p-2.5 flex place-content-between mx-6"
      >
        <div>
          <span>© 2024 CST de Análise e Desenvolvimento de Sistemas - Estácio Conceição.</span>
        </div>
        <div>
          <a
            href="/about"
            className="bg-slate-300 p-2 rounded-md font-semibold
            hover:bg-slate-400"
          >
            Sobre nós
          </a>
        </div>
      </div>
    </footer>
  );
}