import React, { useState } from 'react';
import api from './axios';
import styled from 'styled-components';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      // 1) Loguear en Laravel usando la instancia `api`
      const { data: loginData } = await api.post('/api/login', { email, password });
      const authToken = loginData.token;
      localStorage.setItem('auth_token', authToken);

      // 2) Iniciar sesión en Syncfy
      const { data: syncfyData } = await api.post(
        '/api/syncfy/start',
        {},
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json'
          }
        }
      );
      localStorage.setItem('syncfy_rid', syncfyData.rid);
      localStorage.setItem('syncfy_session_token', syncfyData.response.token);

      window.location.href = '/home';

      // aquí puedes redirigir o actualizar estado
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <LoginContainer>
      <Card>
        <LogoContainer>
          <LogoImage src="src/assets/MainLogo.png" alt="logo" />
        </LogoContainer>
        <Title>Iniciar Sesión</Title>
        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="Correo Electrónico"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <Button type="submit">Iniciar Sesión</Button>
        </form>
        <Link href="/register">Crear Nueva Cuenta</Link>
      </Card>
    </LoginContainer>
  );
}

export default Login;

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  backdrop-filter: blur(15px);
`;

const Card = styled.div`
  width: 350px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 30px;
  text-align: center;
  border: 1px solid rgba(0, 0, 0, 0.05);
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const LogoImage = styled.img`
  width: 120px;
  height: 120px;
  object-fit: contain;
  border-radius: 30px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: perspective(1000px) rotateX(0deg) scale(1.05);
  }
`;

const Title = styled.h3`
  color: #D9632A;
  font-weight: 600;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #E0E0E0;
  border-radius: 15px;
  background: #F3F3F3;
  font-size: 16px;
  margin-bottom: 15px;
  outline: none;
  transition: 0.3s ease-in-out;
  
  &:focus {
    background: #fff;
    border-color: #D9632A;
    box-shadow: 0px 0px 10px rgba(217,99,42,0.2);
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 15px;
  background: #D9632A;
  color: white;
  font-size: 16px;
  font-weight: 600;
  transition: 0.3s ease-in-out;
  
  &:hover {
    background: #F78839;
  }
  
  &:active {
    transform: scale(0.98);
  }
`;

const Link = styled.a`
  display: block;
  margin-top: 15px;
  color: #F78839;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;