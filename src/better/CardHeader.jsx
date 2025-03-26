import React, { useState } from 'react';
import styled from 'styled-components';
import { Bell, CreditCard, ChevronDown, X, UserCircle, LogOut } from 'lucide-react';

const CardHeader = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  
  return (
    <HeaderContainer>
      <CardInfo>
        <CreditCard size={26} color="white" />
        <CardDetails>
          <CardType>Tarjeta Débito</CardType>
          <CardNumber>**** *123</CardNumber>
        </CardDetails>
      </CardInfo>
      <RightSection>
        <NotificationWrapper onClick={() => setShowNotifications(!showNotifications)}>
          <Bell size={22} color="white" />
          <NotificationBadge>3</NotificationBadge>
        </NotificationWrapper>
        <UserInitials onClick={() => setShowProfileOptions(!showProfileOptions)}>
          <span>JAI</span>
          <ChevronDown size={16} color="white" />
        </UserInitials>
        {showProfileOptions && (
          <ProfileOptions>
            <OptionItem>
              <UserCircle size={18} color="#FF7F50" />
              Ver Perfil
            </OptionItem>
            <OptionItem>
              <LogOut size={18} color="#FF4500" />
              Cerrar Sesión
            </OptionItem>
          </ProfileOptions>
        )}
      </RightSection>
      
      <SidePanel show={showNotifications}>
        <PanelHeader>
          <h2>Notificaciones</h2>
          <CloseButton onClick={() => setShowNotifications(false)}>
            <X size={20} />
          </CloseButton>
        </PanelHeader>
        <p>Tienes 3 nuevas notificaciones.</p>
      </SidePanel>
    </HeaderContainer>
  );
};

export default CardHeader;

const HeaderContainer = styled.div`
  width: 100%;
  height: 60px;
  padding: 24px;
  background: linear-gradient(135deg, #FF7F50, #FF4500);
  color: white;
  padding: 12px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
`;

const CardInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

const CardDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const CardType = styled.p`
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 2px;
`;

const CardNumber = styled.p`
  font-size: 14px;
  opacity: 0.85;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  position: relative;
`;

const NotificationBadge = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: #FF2D55;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: bold;
`;

const NotificationWrapper = styled.div`
  position: relative;
  cursor: pointer;
  transition: transform 0.2s ease;
  &:hover {
    transform: scale(1.1);
  }
`;

const UserInitials = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s ease;
  &:hover {
    opacity: 0.8;
  }
`;

const ProfileOptions = styled.div`
  position: absolute;
  top: 45px;
  right: 0;
  background: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  border-radius: 12px;
  width: 180px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 10;
`;

const OptionItem = styled.button`
  padding: 12px 16px;
  font-size: 15px;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #F5F5F5;
  }
`;

const SidePanel = styled.div`
  position: fixed;
  top: 0;
  right: ${({ show }) => (show ? '0' : '-300px')};
  width: 280px;
  height: 100vh;
  background: white;
  box-shadow: -4px 0 10px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  transition: right 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  z-index: 20;
`;

const PanelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  color: #333;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #888;
  transition: color 0.2s ease;
  
  &:hover {
    color: #333;
  }
`;
