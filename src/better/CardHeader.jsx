import React, { useState, useRef, useEffect } from 'react';
import { useNavigate  } from 'react-router-dom';
import styled from 'styled-components';
import { Bell, CreditCard, ChevronDown, X, UserCircle, LogOut, Settings } from 'lucide-react';

const CardHeader = ({ changeComponentCard }) => {
  const [notifications, setNotifications] = useState(3);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const profileRef = useRef(null);
  const notificationRef = useRef(null);
  const navigate = useNavigate();

  // Cerrar menú al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileOptions(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClearNotifications = () => {
    setNotifications(0);
    setShowNotifications(false);
  };
  
  const handleViewProfile = () => {
    setShowProfileOptions(false);
    changeComponentCard("perfil");
    // Aquí puedes navegar a la página de perfil
  };
  
  const handleLogout = () => {
    setShowProfileOptions(false);
    navigate('/');
    // Aquí puedes implementar la lógica de cierre de sesión
  };

  return (
    <HeaderContainer>
      <CardInfo>
        <CreditCard size={26} color="white" />
        <CardDetails>
          <CardType>Tarjeta Débito</CardType>
          <CardNumber>**** *123</CardNumber>
        </CardDetails>
      </CardInfo>
      
      <RightSection ref={profileRef}>
        <NotificationWrapper onClick={() => setShowNotifications(!showNotifications)}>
          <Bell size={20} color="white" />
          {notifications > 0 && <NotificationBadge>{notifications}</NotificationBadge>}
        </NotificationWrapper>
        
        <UserInitials onClick={() => setShowProfileOptions(!showProfileOptions)}>
          <span>JAI</span>
          <ChevronDown size={16} color="white" />
        </UserInitials>
        
        {showProfileOptions && (
          <ProfileOptions>
            <OptionItem onClick={handleViewProfile}>
              <UserCircle size={18} color="#E67E22" />
              Ver Perfil
            </OptionItem>
            <OptionItem onClick={handleLogout}>
              <LogOut size={18} color="#E74C3C" />
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
        
        <p>Tienes {notifications} nuevas notificaciones.</p>
        
        <NotificationContent>
          {notifications > 0 && (
            <>
              <NotificationItem>
                <strong>Nueva transacción</strong>
                <p>Se ha registrado un cargo de $350.00 en tu tarjeta.</p>
              </NotificationItem>
              
              <NotificationItem>
                <strong>Promoción especial</strong>
                <p>Obtén 2% de cashback en tus próximas compras.</p>
              </NotificationItem>
              
              <NotificationItem>
                <strong>Seguridad</strong>
                <p>Actualiza tus datos de contacto para mayor seguridad.</p>
              </NotificationItem>
              
              <ClearButton onClick={handleClearNotifications}>
                Marcar como leído
              </ClearButton>
            </>
          )}
        </NotificationContent>
      </SidePanel>
    </HeaderContainer>
  );
};

export default CardHeader;

// Contenedor principal del header
const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(135deg, #e67e22 0%, #d35400 100%);
  color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  margin-bottom: 20px;
  width: 100%;
  height: 60px;
  padding: 24px;
`;

// Información de la tarjeta
const CardInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

// Detalles de la tarjeta
const CardDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

// Tipo de tarjeta
const CardType = styled.h2`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
`;

// Número de tarjeta
const CardNumber = styled.p`
  margin: 0;
  font-size: 14px;
  opacity: 0.9;
`;

// Sección derecha con iconos
const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  position: relative;
`;

// Contenedor del icono de notificaciones
const NotificationWrapper = styled.div`
  position: relative;
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
`;

// Contador de notificaciones
const NotificationBadge = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  background-color: #E74C3C;
  color: white;
  font-size: 10px;
  font-weight: bold;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Iniciales del usuario
const UserInitials = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 8px 12px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 24px;
  transition: background-color 0.2s;
  gap: 8px;
  
  span {
    font-weight: 600;
    font-size: 15px;
  }
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
`;

// Menú de opciones de perfil
const ProfileOptions = styled.div`
  position: absolute;
  top: 50px;
  right: 0;
  width: 180px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 0.5rem 0;
  z-index: 100;
`;

// Opción del menú
const OptionItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  cursor: pointer;
  color: #333;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #f5f5f5;
  }
  
  &:first-child {
    border-bottom: 1px solid #eee;
  }
`;

// Panel lateral para notificaciones
const SidePanel = styled.div`
  position: fixed;
  top: 0;
  right: ${props => props.show ? '0' : '-300px'};
  width: 300px;
  height: 100vh;
  background-color: white;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  transition: right 0.3s ease;
  z-index: 1000;
  color: #333;
`;

// Encabezado del panel
const PanelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 0.5rem;
`;

// Botón de cierre
const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  color: #555;
  
  &:hover {
    background-color: #f5f5f5;
    border-radius: 50%;
  }
`;

// Contenido de notificaciones
const NotificationContent = styled.div`
  margin-top: 16px;
`;

// Notificación individual
const NotificationItem = styled.div`
  padding: 12px;
  border-radius: 8px;
  background-color: #f8f8f8;
  margin-bottom: 10px;
  border-left: 3px solid #e67e22;
`;

// Botón para marcar como leído
const ClearButton = styled.button`
  background-color: #f0f0f0;
  color: #e86833;
  border: 1px solid #c8c7cc;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  font-size: 15px;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 24px;
  margin-top: 16px;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #e0e0e0;
  }
`;