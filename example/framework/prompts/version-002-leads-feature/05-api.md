# API REST (versão 002 - Leads)

Novos endpoints:

- GET /leads
- GET /leads/:id
- POST /leads
- PUT /leads/:id
- DELETE /leads/:id
- POST /leads/:id/convert (converte lead em cliente)

Middleware: auth, roleCheck(admin)