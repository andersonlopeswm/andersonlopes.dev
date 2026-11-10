import type { CarouselProps, ReelProps } from "./types";

// Exemplos só para pré-visualizar no Remotion Studio (npm run studio).
export const sampleReel: ReelProps = {
  tag: "IA",
  source: "exemplo",
  scenes: [
    { kind: "hook", kicker: "Pare de rolar", text: "Essa IA faz em *5 minutos* o que você leva um dia" },
    { kind: "point", number: 1, title: "Resume *reuniões* sozinha", body: "Grava, transcreve e manda os próximos passos por e-mail." },
    { kind: "stat", value: "87%", label: "dos devs já usam *IA* no trabalho" },
    { kind: "quote", text: "Quem usa IA não vai substituir você. *Quem usa melhor*, vai.", author: "Frase de exemplo" },
    { kind: "cta", text: "Quer a lista *completa*?", keyword: "IA" },
  ],
};

export const sampleCarousel: CarouselProps = {
  index: 0,
  tag: "Ferramentas",
  slides: [
    { kind: "cover", kicker: "Salva esse post", title: "5 IAs *grátis* que parecem ilegais" },
    { kind: "content", number: 1, title: "Resumo de *vídeos*", body: "Cola o link do YouTube e recebe os pontos principais em segundos." },
    { kind: "list", title: "Como usar *hoje*", items: ["Abra a ferramenta", "Cole o *link*", "Peça o resumo em tópicos"] },
    { kind: "stat", value: "10x", label: "mais rápido", body: "do que assistir o vídeo inteiro." },
    { kind: "cta", title: "Quer o *link* de todas?", keyword: "LISTA" },
  ],
};
