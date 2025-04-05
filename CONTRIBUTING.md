# Contribuindo com o PromptDriven

Olá! 👋 Obrigado por querer contribuir com o PromptDriven — um framework para desenvolvimento de software orientado por prompts.

Este guia vai te ajudar a contribuir de forma organizada e produtiva.

---

## 🧩 Tipos de contribuição

Você pode contribuir com:

- Melhorias na documentação
- Novos templates de prompt (ex: email service, chatbots, etc)
- Novas versões de exemplo (ex: version-003-integration-whatsapp)
- Correções de erros ou sugestões de estrutura
- Features para futuras ferramentas (CLI, compilador, etc)

---

## 🗂️ Organização do projeto

```bash
/shared         → contexto compartilhado entre versões (glossário, stack)
/prompts        → versões do projeto (001, 002, etc)
/templates      → modelos prontos por tipo de prompt
/results        → logs de execução e feedback por versão
main-prompt.md  → orquestrador central para execução por IA
```

---

## ✍️ Como criar uma nova versão

1. Crie uma nova pasta dentro de `/prompts`, como:
   ```
   /prompts/version-003-nome-da-feature
   ```
2. Copie os arquivos de uma versão anterior (opcional)
3. Edite apenas os prompts que mudam (ex: user-stories, database)
4. Atualize o `main-prompt.md` para refletir a nova versão atual
5. Execute com o Cursor ou agente de sua escolha
6. Registre o resultado em:
   ```
   /results/version-003-nome-da-feature.md
   ```

---

## 📄 Como propor novos templates

1. Vá até `/templates`
2. Crie um novo arquivo Markdown com o nome e estrutura padrão
3. Use linguagem clara e reutilizável
4. Abra um PR com a sugestão explicando onde ele pode ser usado

---

## 💡 Boas práticas

- Escreva prompts como se fosse dar instruções para um engenheiro júnior
- Use Markdown bem formatado (títulos, listas, blocos de código se necessário)
- Sempre que possível, use uma linguagem consistente com o restante do framework

---

## 🫶 Obrigado!

Cada contribuição ajuda a tornar o PromptDriven mais útil e poderoso.  
Se tiver dúvidas, abra uma issue ou fale com os mantenedores.

---

Felipe Antero — Idealizador do PromptDriven
