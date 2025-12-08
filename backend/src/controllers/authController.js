const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if(!email || !password) return res.status(400).json({ message: 'Email e senha obrigatórios' });

  const user = await User.findOne({ where: { email } });

  if(!user) return res.status(401).json({ message: 'Usuário não encontrado' });

  const ok = await bcrypt.compare(password, user.passwordHash);

  if(!ok) return res.status(401).json({ message: 'Senha inválida' });

  const token = jwt.sign({ 
    id: user.id, role: user.role, name: user.name }, 
    process.env.JWT_SECRET || 'trocasenhaaqui', { expiresIn: '8h' });

  res.json({ 
    token, user: { id: user.id, name: user.name, email: user.email, role: user.role } 
  });
};
