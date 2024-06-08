"use client"
import NavBar from '../../components/NavBar';
import AboutCard from '../../components/AboutCard';
import groupInfo from '../../data/groupInfo.json';

export default function AboutInfo() {
  return (
    <div
      className="sticky top-0 w-full z-50"
    >
      <NavBar />
      <h1
        className="font-bold text-lg my-6 px-4 py-1.5
          rounded-sm text-center drop-shadow-md"
      >
        CST de Análise e Desenvolvimento de Sistemas - Estácio Conceição.
      </h1>
      <div
        className="m-12 mt-4 bg-slate-50 rounded-lg p-6 shadow-2xl"
      >
        <section className="flex flex-col text-center">
          <h1
            className="p-5 font-extrabold w-36
            place-self-center mb-4"
          >
            Sobre nós
          </h1>
          <p
            className="mx-20 mb-12 font-medium"
          >
            Este é um projeto de desenvolvimento web feito como avaliação
            final da matéria de Desenvolvimento Web em HTML5, CSS, Javascript e PHP
            do curso superior tecnólogo de Análise e Desenvolvimento de Sistemas da Estácio. 
            O objetivo era criar um site e-commerce que atendesse aos requisitos 
            apresentados e contemplasse as tecnologias estudadas durante o semestre.
            Para a construção do site utilizamos Next.js para criar uma aplicação React 
            com estilização em TailwindCSS. A escolha do React foi feita por ser uma
            biblioteca muito popular e que utiliza de muitos conceitos de HTML, reforçando 
            os conceitos aprendidos durante o semestre ao mesmo tempo em que aprendemos a 
            utilizar uma das bibliotecas mais populares do mercado. 
            O TailwindCSS foi escolhido por ser uma biblioteca de estilização que se 
            parece muito com o CSS puro e que facilita a criação de interfaces responsivas, de novo
            reforçando nosso aprendizado e nos deixando a par das tecnologias mais atuais.
          </p>
        </section>
        <div
          className="grid grid-cols-3 place-self-center justify-items-center px-24 pb-24"
        >
          {
            groupInfo.map((contact) => (
              <AboutCard key={ contact.name } contact={ contact } />
            ))
          }
        </div>
      </div>
    </div>
  );
}
