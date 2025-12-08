# Backend - Hotel Project

Tecnologias: Node.js, Express, Sequelize (SQLite), JWT, bcrypt.

Como rodar:
1. cd backend
2. npm install
3. copie .env.example para .env e, se quiser, altere JWT_SECRET
4. npm run dev
O servidor rodará em http://localhost:3000 por padrão.

Usuário admin semântica:
- email: admin@utfpr.edu.br
- senha: senha123

Novas rotas:
- POST /users (admin) -> criar usuário
- GET /users (admin) -> listar usuários
