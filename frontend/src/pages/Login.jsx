import React, { useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function Login(){
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [error,setError] = useState('');
  const navigate = useNavigate();

  async function submit(e){
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch(err) {
      setError(err.response?.data?.message || 'Erro no login');
    }
  }

  return (
    <div className="login-box">
      <h2>Login</h2>
      <form onSubmit={submit}>
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input placeholder="Senha" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button type="submit">Entrar</button>
      </form>
      {error && <p className="error">{error}</p>}
     <p style={{marginTop:8}}>Use <strong>admin@utfpr.edu.br</strong> / <strong>senha123</strong></p>
    </div>
  )
}
