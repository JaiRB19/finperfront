import styled from "styled-components";
import { Link } from 'react-router-dom';
import {
  BellIcon,
  LockIcon,
  UserIcon,
  DollarSignIcon,
  TagIcon,
  FileDownIcon,
  HelpCircleIcon,
  ChevronRightIcon,
  LogOutIcon,
  MoonIcon,
  SunIcon,
} from "lucide-react";
import { useState } from "react";

export default function OpcionesHomeView() {
  const [notificaciones, setNotificaciones] = useState(true);
  const [recordatorios, setRecordatorios] = useState(false);
  const [biometrico, setBiometrico] = useState(true);
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <Container>
      <Header>Configuraciones</Header>
      <Card>
        <CardHeader>
          <UserIcon className="icon" />
          <div>
            <h3>Jai Ortiz</h3>
            <p>jaielivan.oc04@gmail.com</p>
          </div>
          <ChevronRightIcon className="icon" />
        </CardHeader>
      </Card>

      <Card>
        <SectionHeader>
          <BellIcon className="icon" /> Notificaciones
        </SectionHeader>
        <CardBody>
          <SettingItem>
            <span>Notificaciones push</span>
            <Switch checked={notificaciones} onClick={() => setNotificaciones(!notificaciones)} />
          </SettingItem>
          <SettingItem>
            <span>Recordatorios diarios</span>
            <Switch checked={recordatorios} onClick={() => setRecordatorios(!recordatorios)} />
          </SettingItem>
        </CardBody>
      </Card>

      <Card>
        <SectionHeader>
          <LockIcon className="icon" /> Seguridad
        </SectionHeader>
        <CardBody>
          <SettingItem>
            <span>Autenticación biométrica</span>
            <Switch checked={biometrico} onClick={() => setBiometrico(!biometrico)} />
          </SettingItem>
          <SettingItem>
            <span>Cambiar contraseña</span>
            <ChevronRightIcon className="icon" />
          </SettingItem>
        </CardBody>
      </Card>

      <Card>
        <SectionHeader>
          <DollarSignIcon className="icon" /> Preferencias
        </SectionHeader>
        <CardBody>
          <SettingItem>
            <span>Tema oscuro</span>
            {isDark ? <MoonIcon className="icon" /> : <SunIcon className="icon" />}
            <Switch checked={isDark} onClick={toggleTheme} />
          </SettingItem>
        </CardBody>
      </Card>

        <Link to="/" style={{ textDecoration: 'none' }}>
            <LogoutButton>
                <LogOutIcon className="icon" /> Cerrar Sesión
            </LogoutButton>
        </Link>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  padding: 16px;
  margin: auto;
`;

const Header = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #d9632a;
  text-align: center;
  margin-bottom: 16px;
`;

const Card = styled.div`
  background: white;
  width: 100%;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
  overflow: hidden;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  background: #f9f9f9;
  .icon {
    margin-right: 12px;
    color: #d9632a;
  }
  h3 {
    font-size: 18px;
    font-weight: 400;
  }
  p {
    font-size: 16px;
    color: gray;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 14px 20px;
  background:rgba(219, 215, 212, 0.3);
  font-weight: 400;
  font-size: 18px;
  .icon {
    margin-right: 10px;
    color: #d9632a;
  }
`;

const CardBody = styled.div`
  padding: 20px;
`;

const SettingItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #eee;
  font-size: 16px;
  &:last-child {
    border-bottom: none;
  }
`;

const Switch = styled.div`
  width: 44px;
  height: 22px;
  background: ${({ checked }) => (checked ? "#F78839" : "#ccc")};
  border-radius: 11px;
  position: relative;
  cursor: pointer;
  &::after {
    content: "";
    position: absolute;
    top: 3px;
    left: ${({ checked }) => (checked ? "22px" : "3px")};
    width: 16px;
    height: 16px;
    background: white;
    border-radius: 50%;
    transition: 0.2s;
  }
`;

const LogoutButton = styled.button`
  width: 100%;
  margin-top: 16px;
  background: #fef2f2;
  color: #d32f2f;
  padding: 12px;
  font-size: 18px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  &:hover {
    background: #fddede;
  }
`;
