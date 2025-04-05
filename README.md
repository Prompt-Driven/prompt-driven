<p align="center">
  <img src="assets/logo.png" alt="PromptDriven Logo" width="250"/>
</p>

# PromptDriven

> Framework para desenvolvimento de software orientado por prompts estruturados, versionáveis e iterativos com IA.

---

## 🚀 O que é

**PromptDriven** é um framework que organiza a criação e evolução de software por meio de prompts em linguagem natural. Ele estrutura as instruções em arquivos versionáveis e modulares, que podem ser lidos por agentes de IA como Cursor, GPT Engineer, Smol Developer e outros.

---

## 📁 Estrutura do Projeto

```bash
.
├── shared/                       # Contexto compartilhado entre versões
│   ├── glossary.md
│   ├── stack.md
│   └── constraints.md
├── prompts/                     # Versões incrementais do projeto
│   ├── version-001-mvp/
│   └── version-002-leads-feature/
├── templates/                   # Modelos de prompt por tipo
│   ├── user-stories.md
│   ├── database.md
│   ├── api.md
│   └── ...
├── results/                     # Resultados e feedbacks por versão
├── assets/                      # Logotipos e imagens visuais
│   └── logo.png
├── main-prompt.md              # Prompt orquestrador (entrada principal da IA)
```

---

## ✍️ Como usar com Cursor

1. Abra o arquivo `main-prompt.md`
2. Diga algo como:
   ```
   Leia os arquivos de /shared e /prompts/version-001-mvp e gere o projeto completo com base nessas instruções.
   ```
3. Revise o código gerado, execute localmente e registre o resultado em `/results/version-001-mvp.md`

---

## ✨ Filosofia

- **Prompts são código.**
- **Versões devem ser rastreáveis.**
- **IA precisa de contexto claro e modular.**
- **Desenvolver com IA exige estrutura, não improviso.**

---

## 🧰 Requisitos

- Agente IA (Cursor, GPT-4, GPT Engineer, etc)
- Node.js, npm (para projetos Node/React)
- Git (recomendado para versionar os prompts)

---

## 🗺️ Roadmap

- [ ] CLI: `promptdriven init`, `promptdriven compile`
- [ ] Integração com GPT Engineer / Smol Developer
- [ ] Gerador de templates (CRM, Blog, Marketplace...)
- [ ] UI visual para navegação e criação de versões

---

## 📄 Licença

MIT — feito com intenção por Felipe Antero
