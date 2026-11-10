---
name: ig-research
description: Pesquisa de pauta para o canal de Instagram de IA/TI — busca notícias e lançamentos recentes, avalia o potencial viral, confirma fatos em duas fontes e salva a lista de pautas em content/_ideas/. Use quando o usuário pedir "pautas", "notícias de hoje", "o que postar", "ideias de post" ou antes de criar um Reel/Carrossel sem tema definido.
---

# Pesquisa de pauta

Leia antes a skill `ig-playbook` (pilares, ganchos, credibilidade).

## Passos
0. **Ler `backlog.md`** (raiz): pautas que o usuário anotou (título, resumo, fonte). Elas entram na avaliação
   com prioridade. A fonte anotada costuma ser a home do site: localizar a matéria específica e confirmar em outra fonte.
1. **Buscar o que está quente (últimas 24–72h)** com WebSearch, várias buscas no mesmo turno, por exemplo:
   - lançamentos: OpenAI, Anthropic/Claude, Google/Gemini, Meta/Llama, xAI/Grok, Microsoft/Copilot, Apple Intelligence, Nvidia, DeepSeek, Mistral
   - ferramentas novas de IA grátis / virais; agentes de IA; vídeo e imagem com IA
   - IA e trabalho/empregos; regulação de IA (Brasil e mundo); segurança/vazamentos; big techs
   - notícias de TI no Brasil (Tecnoblog, Olhar Digital, Canaltech) — o ângulo brasileiro viraliza mais aqui
   Use `mode: "extended"` para fatos muito recentes. Abra (WebFetch) a fonte principal das melhores pautas.
2. **Confirmar** cada pauta em 2 fontes; anotar data do fato e links.
3. **Pontuar** de 1 a 5 em: novidade, impacto no público, potencial de envio, facilidade visual. Descartar abaixo de 12/20.
4. **Para cada pauta aprovada**, propor: formato (Reel ou Carrossel), 2–3 opções de gancho, ângulo "e daí pra você", CTA.
5. **Salvar** em `content/_ideas/AAAA-MM-DD.md` (tabela com nota, formato, gancho favorito, fontes) e mostrar ao
   usuário um resumo das 5 melhores, perguntando quais produzir.

Ao produzir uma pauta do backlog, marcar no `backlog.md` (ex.: `✅ produzido → content/<pasta>`), sem apagar o texto.

Nunca inventar dado, data ou citação. Acusação contra pessoa real (investigação, crime, vida pessoal): usar só fonte
jornalística sólida, verbo de cautela ("é investigado", "segundo o FBI") e incluir o outro lado ("nega"). Se não achar confirmação, marcar como "rumor" ou descartar.
