const { Client } = require('../models');

exports.list = async (req, res) => {
  const clients = await Client.findAll();
  res.json(clients);
};

exports.create = async (req, res) => {
  const { name, email, phone, document } = req.body;
  if(!name) return res.status(400).json({ message: 'Nome obrigatório' });
  const exists = await Client.findOne({ where: { document } });
  if(exists) return res.status(400).json({ message: 'Cliente com mesmo documento já cadastrado' });
  const client = await Client.create({ name, email, phone, document });
  res.status(201).json(client);
};

exports.get = async (req, res) => {
  const client = await Client.findByPk(req.params.id);
  if(!client) return res.status(404).json({ message: 'Cliente não encontrado' });
  res.json(client);
};

exports.update = async (req, res) => {
  const client = await Client.findByPk(req.params.id);
  if(!client) return res.status(404).json({ message: 'Cliente não encontrado' });
  await client.update(req.body);
  res.json(client);
};

exports.remove = async (req, res) => {
  const client = await Client.findByPk(req.params.id);
  if(!client) return res.status(404).json({ message: 'Cliente não encontrado' });
  await client.destroy();
  res.json({ message: 'Cliente removido' });
};
