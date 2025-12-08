import React, { useEffect, useState } from 'react';
import api from '../api/axios';

export default function Clients(){
  const [clients, setClients] = useState([]);
  useEffect(()=>{ load(); }, []);
  async function load(){
    const res = await api.get('/clients');
    setClients(res.data);
  }

  async function handleDelete(id) {
    const confirmDelete = confirm("Tem certeza que deseja excluir este cliente?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/clients/${id}`);
      load(); // recarrega a lista de clientes
    } catch (err) {
      console.error(err);
      alert("Erro ao excluir o cliente.");
    }
  }

  return (
    <div>
      <div className='page-top'><h2>Clientes</h2><a className='btn' href='/clients/new'>Novo Cliente</a></div>
      <table className="table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {clients.map(c=>(
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>{c.phone}</td>
              <td><a className='btn' href={'/clients/edit/' + c.id}>Editar</a>
              <button className="btn-delete" onClick={() => handleDelete(c.id)}>Excluir</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
