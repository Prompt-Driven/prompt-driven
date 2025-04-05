# Modelagem de Dados (versão 002 - Leads)

Nova entidade:

- leads:
  - id: uuid
  - name: string
  - email: string
  - phone: string
  - status: enum (novo, em contato, convertido)
  - created_by: uuid