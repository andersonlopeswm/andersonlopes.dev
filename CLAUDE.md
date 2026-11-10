# Canal de Instagram — IA e notícias de TI

Estúdio de conteúdo para Instagram (Reels e Carrosséis) feito com **Remotion** (vídeo em React) e operado pelo
Claude Code via skills. **Não é projeto HubX**: as regras de tenant, Laravel e tech-lead do monorepo não se aplicam.
Valem as regras globais (código em inglês, textos e comentários em pt-BR, commit e push só com pedido explícito).

## Skills (em `.claude/skills/`)
| Skill | Quando |
|-------|--------|
| `ig-playbook` | Estratégia viral, ganchos, legenda e checklist. Ler antes de qualquer roteiro |
| `ig-research` | Pautas: `backlog.md` + notícias recentes, checagem em 2 fontes, salva em `content/_ideas/` |
| `ig-reel` | Reel 1080x1920: post.json → `reel.mp4` + `cover.png` |
| `ig-carousel` | Carrossel 1080x1350: post.json → `slide-XX.png` |

## Estrutura
- `src/brand.ts`: nome, @, cores, fontes e área segura (mudar aqui reflete em tudo)
- `src/types.ts`: formato das cenas e slides; `src/reel/`, `src/carousel/`: templates
- `content/<AAAA-MM-DD-slug>/`: `post.json`, `caption.txt`, `script.md`, `assets/` (mídia fora do git)
- `output/<slug>/`: renders (fora do git); `backlog.md`: pautas anotadas pelo usuário

## Comandos
- `npm run studio`: pré-visualizar e editar no Remotion Studio
- `npm run render -- content/<pasta>`: renderiza o post e gera `qa-sheet.jpg` para conferência
- `npm run typecheck`

Vídeos, imagens e áudio não vão para o git (`.gitignore`).
