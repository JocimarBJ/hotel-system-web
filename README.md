Conteúdo:
- backend/ : API Node.js + Express + Sequelize (SQLite), JWT auth.
- frontend/: Vite + React app (login, listar quartos, clientes, reservas, criar reserva).

Como rodar (recomendado abrir dois terminais):
1) Backend
   cd backend
   npm install
   cp .env.example .env
   (opcional: editar .env)
   npm run dev
   -> servidor em http://localhost:3000

2) Frontend
   cd frontend
   npm install
   npm run dev
   -> abra o endereço do Vite (normalmente http://localhost:5173)

Admin seed:
- email: admin@utfpr.edu.br
- senha: senha123

Observações:
- Use Node.js 18+.
- O backend usa SQLite para facilitar execução local sem configurar Postgres/MySQL.
