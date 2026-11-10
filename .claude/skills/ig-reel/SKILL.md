---
name: ig-reel
description: Cria um Reel de Instagram (1080x1920, texto animado) para o canal de IA/TI — roteiro com gancho viral, post.json no formato dos templates Remotion, legenda, render do MP4 e da capa, e conferência visual pela folha de QA. Use quando o usuário pedir um reel, vídeo, short ou "transforma essa notícia em vídeo".
---

# Criar Reel

Leia antes a skill `ig-playbook`. Se não houver tema, rode a skill `ig-research` primeiro.

## 1. Pasta do post
`content/AAAA-MM-DD-<slug-em-ingles-ou-sem-acento>/` contendo:
- `script.md` — tema, fontes (links + data), gancho escolhido e alternativas, ângulo, notas
- `post.json` — roteiro no formato abaixo
- `caption.txt` — legenda (formato no playbook)
- `assets/` (opcional) — imagens (print do anúncio, logo, screenshot), `voiceover.mp3`, `music.mp3`

## 2. Formato do post.json
```json
{
  "type": "reel",
  "props": {
    "tag": "IA",
    "source": "OpenAI / The Verge",
    "scenes": [
      { "kind": "hook", "kicker": "Urgente", "text": "A *OpenAI* acabou de lançar..." },
      { "kind": "point", "number": 1, "title": "Título curto com *destaque*", "body": "Frase de apoio.", "image": "print.png" },
      { "kind": "stat", "value": "87%", "label": "texto do número" },
      { "kind": "quote", "text": "Citação real", "author": "Nome, cargo" },
      { "kind": "cta", "text": "Manda pra quem *precisa* ver" }
    ]
  }
}
```
- Tipos e campos: `src/types.ts`. `*texto*` = destaque na cor do canal; `\n` = quebra de linha.
- `seconds` em qualquer cena força a duração; sem ele, a duração vem do tempo de leitura (`src/timing.ts`).
- `image`, `voiceover`, `music`: nome do arquivo dentro de `assets/`. `cta.keyword` só com automação de DM.
- Limites para caber na tela: hook ≤ 12 palavras; `point.title` ≤ 8 palavras; `body` ≤ 20 palavras; total 5–8 cenas, 15–35s.
- `value` inteiro simples (`87%`, `+3000`) ganha contagem animada.

## 3. Renderizar
```bash
npm run render -- content/<pasta>
```
Gera em `output/<pasta>/`: `reel.mp4`, `cover.png` (capa — o perfil corta o centro 4:5), `qa-sheet.jpg`
(1 frame por segundo), `caption.txt`, `script.md`.

## 4. Conferir (obrigatório)
Abra `output/<pasta>/qa-sheet.jpg` e `cover.png` com a ferramenta Read e verifique: texto cortado ou fora da
área segura, palavra quebrada feio, cena com texto demais, ortografia/acentos, destaque no lugar certo.
Corrija o `post.json` e renderize de novo até ficar limpo.

## 5. Entregar
Informe o caminho de `output/<pasta>/`, a duração, o gancho e a legenda pronta para colar, e lembre:
adicionar áudio em alta pelo app, escolher `cover.png` como capa e responder comentários na primeira hora.

Mudanças visuais que valem para todos os posts (cores, fontes, @) ficam em `src/brand.ts`; novos tipos de cena,
em `src/types.ts` + `src/reel/scenes.tsx`.
