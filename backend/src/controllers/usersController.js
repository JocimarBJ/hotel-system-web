const { User } = require('../models');
const bcrypt = require('bcrypt');

exports.create = async (req, res) => {
  // apenas admin pode criar usuários
  if(!req.user || req.user.role !== 'admin') 
    return res.status(403).json({ 
      message: 'Admin required' 
  });
  const { name, email, password, role } = req.body;

  if(!name || !email || !password) 
    return res.status(400).json({ message: 'Campos obrigatórios faltando' });

  const exists = await User.findOne({
    where: { email } 
  });

  if(exists) return res.status(400).json({ 
    message: 'Usuário já cadastrado' 
  });

  const hash = await bcrypt.hash(password, 10);
  const u = await User.create({ name, email, passwordHash: hash, role: role || 'user' });
  res.status(201).json({ id: u.id, name: u.name, email: u.email, role: u.role });
};

exports.list = async (req, res) => {
  if(!req.user || req.user.role !== 'admin') return res.status(403).json({ message: 'Admin required' });
  const users = await User.findAll({ attributes: ['id','name','email','role','createdAt'] });
  res.json(users);
};

exports.remove = async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if(!user) return res.status(404).json({ message: 'Usuário não encontrado' });

  await user.destroy();
  res.json({ message: 'Usuário removido' });
};
