import React, { useEffect, useState } from 'react';
import api from '../api/axios';

export default function Rooms(){
  const [rooms, setRooms] = useState([]);

  useEffect(()=>{ load(); }, []);
  async function load(){
    const res = await api.get('/rooms');
    setRooms(res.data);
  }

  return (
    <div>
      <h2>Quartos</h2>
      <div className='page-top'><a className='btn' href='/rooms/new'>Novo Quarto</a></div>
      <table className="table">
        <thead><tr><th>Quarto</th><th>Tipo</th><th>Diária</th><th>Disponível</th><th>Ações</th></tr></thead>
        <tbody>
          {rooms.map(r=>(
            <tr key={r.id}>
              <td>{r.number}</td>
              <td>{r.type}</td>
              <td>R$ {Number(r.daily).toFixed(2)}</td>
              <td>{r.available ? 'Sim' : 'Não'}</td>
              <td><a className='btn' href={'/rooms/edit/' + r.id}>Editar</a></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
