import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { Link } from 'react-router-dom';

export default function Users(){
  const [users, setUsers] = useState([]);
  const [err, setErr] = useState('');

  useEffect(()=>{ load(); }, []);
  async function load(){
    try {
      const res = await api.get('/users');
      setUsers(res.data);
    } catch(err) { setErr(err.response?.data?.message || 'Erro'); }
  }

  async function handleDelete(id) {
    const confirmDelete = confirm("Tem certeza que deseja excluir este usuário?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/users/${id}`);
      load(); // recarrega a lista de usuários
    } catch (err) {
      console.error(err);
      alert("Erro ao excluir o usuário do sistema.");
    }
  }

  return (
    <div>
      <h2>Usuários</h2>
      <Link to="/users/new" className="btn">Novo</Link>
      {err && <p className="error">{err}</p>}
      <table className="table">
        <thead><tr><th>Nome</th><th>Email</th><th>Role</th><th>Criado</th><th>Ações</th></tr></thead>
        <tbody>
          {users.map(u=>(
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>{new Date(u.createdAt).toLocaleString()}</td>
              <td><button className="btn-delete" onClick={() => handleDelete(u.id)}>Excluir</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
