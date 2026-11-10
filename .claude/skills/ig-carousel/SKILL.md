---
name: ig-carousel
description: Cria um Carrossel de Instagram (slides 1080x1350) para o canal de IA/TI — capa com gancho, slides de conteúdo/lista/número/citação, CTA final, legenda, render dos PNGs e conferência pela folha de QA. Use quando o usuário pedir carrossel, post de slides, lista de ferramentas, tutorial ou resumo semanal.
---

# Criar Carrossel

Leia antes a skill `ig-playbook`. Se não houver tema, rode a skill `ig-research` primeiro.

## 1. Pasta do post
`content/AAAA-MM-DD-<slug>/` com `script.md` (fontes e notas), `post.json`, `caption.txt` e `assets/` opcional.

## 2. Formato do post.json
```json
{
  "type": "carousel",
  "props": {
    "tag": "Ferramentas",
    "source": "site oficial",
    "slides": [
      { "kind": "cover", "kicker": "Salva esse post", "title": "*5 IAs grátis* que parecem ilegais", "image": "capa.png" },
      { "kind": "content", "number": 1, "title": "Nome da ferramenta", "body": "O que faz, em 1-2 frases.", "image": "print.png" },
      { "kind": "list", "title": "Como usar *hoje*", "items": ["Passo 1", "Passo 2", "Passo 3"] },
      { "kind": "stat", "value": "10x", "label": "mais rápido", "body": "contexto do número" },
      { "kind": "quote", "text": "Citação real", "author": "Nome" },
      { "kind": "cta", "title": "Manda pra quem *precisa*", "body": "Segue para mais IA todo dia." }
    ]
  }
}
```
- Tipos em `src/types.ts`; `*texto*` destaca; `\n` quebra linha.
- Limites: capa ≤ 10 palavras (sem imagem) ou ≤ 7 (com imagem); `content.title` ≤ 7 palavras; `body` ≤ 30 palavras;
  `list` até 5 itens de ≤ 10 palavras; 6–10 slides.
- Slide 2 também precisa prender (o Instagram reexibe o carrossel começando por ele).
- O rodapé mostra "Fonte" na capa, numeração nos demais e "ARRASTA →" até o penúltimo.

## 3. Renderizar
```bash
npm run render -- content/<pasta>
```
Gera `output/<pasta>/slide-01.png …`, `qa-sheet.jpg`, `caption.txt`, `script.md`.

## 4. Conferir (obrigatório)
Leia `qa-sheet.jpg` (e slides individuais se precisar de detalhe): texto cortado, sobra de texto, hierarquia,
acentos, destaque. Ajuste e renderize de novo até ficar limpo.

## 5. Entregar
Caminho da pasta, lista de slides, legenda pronta para colar. Lembrar: no app, subir os PNGs em ordem e
adicionar uma música (carrossel com áudio também aparece na aba de Reels/áudio).
