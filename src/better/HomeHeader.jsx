import React, { useState } from 'react';
import styled from 'styled-components';
import { User, Bell, Settings, X } from 'lucide-react';

const HomeHeader = () => {
  const userName = "Usuario";
  const [notifications, setNotifications] = useState(3);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  
  const currentDate = new Date().toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  });

  const handleClearNotifications = () => setNotifications(0);

  return (
    <HeaderContainer>
      <UserSection>
        <UserIconWrapper>
          <User color="#E67E22" size={24} />
        </UserIconWrapper>
        <div>
          <WelcomeText>¡Bienvenido, {userName}!</WelcomeText>
          <DateText>{currentDate}</DateText>
        </div>
      </UserSection>
      
      <IconsSection>
        <NotificationWrapper onClick={() => setShowNotifications(!showNotifications)}>
          <Bell color="#D35400" size={20} />
          {notifications > 0 && <NotificationBadge>{notifications}</NotificationBadge>}
        </NotificationWrapper>
        <SettingsIcon onClick={() => setShowSettings(!showSettings)}>
          <Settings color="#D35400" size={20} />
        </SettingsIcon>
      </IconsSection>

      <SidePanel show={showNotifications}>
        <PanelHeader>
          <h2>Notificaciones</h2>
          <CloseButton onClick={() => setShowNotifications(false)}><X size={20} /></CloseButton>
        </PanelHeader>
        <p>Tienes {notifications} nuevas notificaciones.</p>
        <button onClick={() => {handleClearNotifications(); setShowNotifications(false);}}
        className="btn btn-light rounded-pill py-2 px-4"
        style={{
          backgroundColor: '#f0f0f0',
          color: '#e86833',
          border: '1px solid #c8c7cc',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          fontSize: '17px',
          fontWeight: '500',
          WebkitTapHighlightColor: 'transparent',
          transition: 'background-color 0.2s ease-in-out', // Agrega la transición
        }}
        onMouseOver={(e) => {
          e.target.style.backgroundColor = '#e0e0e0'; // Cambia el color al hacer hover
        }}
        onMouseOut={(e) => {
          e.target.style.backgroundColor = '#f0f0f0'; // Restaura el color original
        }}
      >
        Marcar como leído
        </button>
      </SidePanel>

      <SidePanel show={showSettings}>
        <PanelHeader>
          <h2>Opciones Generales</h2>
          <CloseButton onClick={() => setShowSettings(false)}><X size={20} /></CloseButton>
        </PanelHeader>
        <p>Aquí puedes configurar las opciones generales del sistema.</p>
      </SidePanel>
    </HeaderContainer>
  );
};

export default HomeHeader;

// Styled Components
const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 60px;
  padding: 24px;
  border-radius: 0.5rem;
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const UserIconWrapper = styled.div`
  background-color: #F5CBA7;
  padding: 0.5rem;
  border-radius: 9999px;
`;

const WelcomeText = styled.h1`
  font-size: 1.25rem;
  font-weight: 600;
  color: #6E2C00;
`;

const DateText = styled.p`
  font-size: 0.875rem;
  color: #A04000;
  text-transform: capitalize;
`;

const IconsSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const NotificationBadge = styled.span`
  position: absolute;
  top: -0.5rem;
  right: -0.5rem;
  background-color: #E74C3C;
  color: white;
  font-size: 0.75rem;
  width: 1rem;
  height: 1rem;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NotificationWrapper = styled.div`
  position: relative;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;

const SettingsIcon = styled.div`
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: rotate(20deg);
  }
`;

const SidePanel = styled.div`
  position: fixed;
  top: 0;
  right: ${({ show }) => (show ? '0' : '-300px')};
  width: 300px;
  height: 100vh;
  background: white;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.2);
  padding: 1.5rem;
  transition: right 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
`;

const PanelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;