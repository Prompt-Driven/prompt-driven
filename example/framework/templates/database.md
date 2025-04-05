# TEMPLATE: Modelagem de Dados

Formato sugerido:
Entidades principais com atributos e tipos:
- users:
  - id: uuid
  - name: string
  - email: string
  - role: enum(admin, user)

- clients:
  - id: uuid
  - name: string
  - email: string
  - created_by: uuid
