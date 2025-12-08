const { Reservation, Room, Client } = require('../models');
const dayjs = require('dayjs');

// IMPORTAR PLUGINS
const isSameOrBefore = require('dayjs/plugin/isSameOrBefore');
const isSameOrAfter = require('dayjs/plugin/isSameOrAfter');

// ATIVAR PLUGINS
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

function nights(checkIn, checkOut) {
  return dayjs(checkOut).diff(dayjs(checkIn), 'day');
}

exports.list = async (req, res) => {
  // inclui o Client e o Room com campos úteis
  const reservations = await Reservation.findAll({
    include: [
      { model: Client, attributes: ['id', 'name', 'email'] },
      { model: Room, attributes: ['id', 'number', 'type', 'daily'] }
    ],
    order: [['checkIn', 'DESC']]
  });
  res.json(reservations);
};

exports.create = async (req, res) => {
  const { clientId, roomId, checkIn, checkOut } = req.body;
  if(!clientId || !roomId || !checkIn || !checkOut) return res.status(400).json({ message: 'Campos obrigatórios faltando' });

  const nightsCount = nights(checkIn, checkOut);
  if(nightsCount <= 0) return res.status(400).json({ message: 'Período inválido' });

  // checar disponibilidade simples: qualquer reserva existente para o mesmo quarto que conflite
  const existing = await Reservation.findAll({ where: { roomId } });
  for(const r of existing) {
    if(!(dayjs(checkOut).isSameOrBefore(dayjs(r.checkIn)) || dayjs(checkIn).isSameOrAfter(dayjs(r.checkOut)))) {
      return res.status(400).json({ message: 'Quarto indisponível no período solicitado' });
    }
  }

  const room = await Room.findByPk(roomId);
  if(!room) return res.status(404).json({ message: 'Quarto não encontrado' });

  const total = Number(room.daily) * Number(nightsCount);
  const reservation = await Reservation.create({ clientId, roomId, checkIn, checkOut, total });

  // buscar a reserva criada já com as associações para devolver pro front
  const fullReservation = await Reservation.findByPk(reservation.id, {
    include: [
      { model: Client, attributes: ['id', 'name', 'email'] },
      { model: Room, attributes: ['id', 'number', 'type', 'daily'] }
    ]
  });

  res.status(201).json(fullReservation);
};


exports.get = async (req, res) => {
  const reservation = await Reservation.findByPk(req.params.id);
  if(!reservation) return res.status(404).json({ message: 'Reserva não encontrada' });
  res.json(reservation);
};

exports.update = async (req, res) => {
  const reservation = await Reservation.findByPk(req.params.id);
  if(!reservation) return res.status(404).json({ message: 'Reserva não encontrada' });
  await reservation.update(req.body);
  res.json(reservation);
};

exports.remove = async (req, res) => {
  const reservation = await Reservation.findByPk(req.params.id);
  if(!reservation) return res.status(404).json({ message: 'Reserva não encontrada' });
  await reservation.destroy();
  res.json({ message: 'Reserva removida' });
};
