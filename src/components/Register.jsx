import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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

function Register() {
  return (
    <RegisterContainer>
      <Card>
        <Title>Registrarse</Title>
        
        <form>
          <Input type="text" placeholder="Usuario" required />
          <Input type="email" placeholder="Correo Electrónico" required />
          <Input type="password" placeholder="Contraseña" required />

          <Select required>
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
