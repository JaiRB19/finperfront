import React, { useState } from 'react';
import api from './axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [nacionalidad, setNacionalidad] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const { data } = await api.post('/api/register', {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
        nacionalidad,
      });
      const authToken = data.token;
      localStorage.setItem('auth_token', authToken);
      // aquí podrías redirigir o continuar el flujo
      
      window.location.href = '/';

    } catch (err) {
      console.error(err);
      // manejar errores según err.response.data
    }
  };

  return (
    <RegisterContainer>
      <Card>
        <LogoContainer>
          <LogoImage src="src/assets/MainLogo.png" alt="logo" />
        </LogoContainer>
        <Title>Registrarse</Title>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Usuario"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
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
          <Input
            type="password"
            placeholder="Confirmar Contraseña"
            value={passwordConfirmation}
            onChange={e => setPasswordConfirmation(e.target.value)}
            required
          />
          <Select
            value={nacionalidad}
            onChange={e => setNacionalidad(e.target.value)}
            required
          >
            <option value="">Selecciona tu nacionalidad</option>
            <option value="mexico">México</option>
            <option value="usa">Estados Unidos</option>
            <option value="europa">Europa</option>
          </Select>
          <Button type="submit">Registrarse</Button>
        </form>
        <LoginLink>
          ¿Ya tienes una cuenta? <Link to="/">Inicia sesión</Link>
        </LoginLink>
      </Card>
    </RegisterContainer>
  );
}

export default Register;


const RegisterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  backdrop-filter: blur(10px);
`;

const Card = styled.div`
  width: 350px;
  background: white;
  border-radius: 20px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
  padding: 30px;
  text-align: center;
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
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 15px;
  background: #F3F3F3;
  font-size: 16px;
  margin-bottom: 15px;
  outline: none;
  transition: 0.3s ease-in-out;
  
  &:focus {
    background: #fff;
    box-shadow: 0px 0px 10px rgba(217,99,42,0.3);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 15px;
  background: #F3F3F3;
  font-size: 16px;
  margin-bottom: 15px;
  outline: none;
  transition: 0.3s ease-in-out;
  
  &:focus {
    background: #fff;
    box-shadow: 0px 0px 10px rgba(217,99,42,0.3);
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

const LoginLink = styled.div`
  margin-top: 15px;
  font-size: 14px;
  
  a {
    color: #F78839;
    text-decoration: none;
    font-weight: 600;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;
