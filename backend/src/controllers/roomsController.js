const { Room } = require('../models');

exports.list = async (req, res) => {
  const rooms = await Room.findAll();
  res.json(rooms);
};

exports.create = async (req, res) => {
  const { number, type, daily, available } = req.body;
  if(!number) return res.status(400).json({ message: 'Número obrigatório' });
  const room = await Room.create({ number, type, daily, available });
  res.status(201).json(room);
};

exports.get = async (req, res) => {
  const room = await Room.findByPk(req.params.id);
  if(!room) return res.status(404).json({ message: 'Quarto não encontrado' });
  res.json(room);
};

exports.update = async (req, res) => {
  const room = await Room.findByPk(req.params.id);
  if(!room) return res.status(404).json({ message: 'Quarto não encontrado' });
  await room.update(req.body);
  res.json(room);
};

exports.remove = async (req, res) => {
  const room = await Room.findByPk(req.params.id);
  if(!room) return res.status(404).json({ message: 'Quarto não encontrado' });
  await room.destroy();
  res.json({ message: 'Quarto removido' });
};
