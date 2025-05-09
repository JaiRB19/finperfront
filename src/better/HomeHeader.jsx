import React, { useState, useRef, useEffect } from 'react';
import { useNavigate  } from 'react-router-dom';
import styled from 'styled-components';
import { User, Bell, Settings, X, LogOut, UserCircle } from 'lucide-react';
import api from '../components/axios';  // tu instancia de axios con baseURL

const HomeHeader = ({ changeComponent }) => {
  const [userName, setUserName] = useState('');            // ← ahora dinámico
  const [notifications, setNotifications] = useState(3);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef(null);
  const userIconRef = useRef(null);
  const navigate = useNavigate();
  
  const currentDate = new Date().toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  });

  // 1) Cargar perfil
  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem('auth_token');
        const { data } = await api.get('/api/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        // Asumimos que tu respuesta es { data: { name: "...", ... } }
        setUserName(data.data.name);
      } catch (err) {
        console.error('Error cargando perfil:', err);
      }
    })();
  }, []);

  // cargar número de notificaciones
  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const token = localStorage.getItem('auth_token');
  //       const { data } = await api.get('/api/notifications/count', {
  //         headers: { Authorization: `Bearer ${token}` }
  //       });
  //       setNotifications(data.count);
  //     } catch (err) {
  //       console.error('Error cargando notificaciones:', err);
  //     }
  //   })();
  // }, []);

  // Cerrar menú si clicas fuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        userMenuRef.current && 
        !userMenuRef.current.contains(event.target) && 
        userIconRef.current && 
        !userIconRef.current.contains(event.target)
      ) {
        setShowUserMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleClearNotifications = () => setNotifications(0);
  const handleViewProfile = () => {
    setShowUserMenu(false);
    changeComponent('perfil');
  };
  const handleLogout = () => {
    setShowUserMenu(false);
    navigate('/');
  };
  const toggleUserMenu = () => setShowUserMenu(!showUserMenu);

  return (
    <HeaderContainer>
      <UserSection>
        <UserIconWrapper ref={userIconRef} onClick={toggleUserMenu}>
          <User color="#E67E22" size={24} />
        </UserIconWrapper>
        <div>
          <WelcomeText>¡Bienvenido, {userName || 'Usuario'}!</WelcomeText>
          <DateText>{currentDate}</DateText>
        </div>
        
        <UserMenu ref={userMenuRef} show={showUserMenu}>
          <UserMenuItem onClick={handleViewProfile}>
            <UserCircle size={18} color="#E67E22" />
            Ver perfil
          </UserMenuItem>
          <MenuDivider />
          <UserMenuItem onClick={handleLogout}>
            <LogOut size={18} color="#E74C3C" />
            Cerrar sesión
          </UserMenuItem>
        </UserMenu>
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
        <button
          onClick={() => { handleClearNotifications(); setShowNotifications(false); }}
          className="btn btn-light rounded-pill py-2 px-4"
          style={{
            backgroundColor: '#f0f0f0',
            color: '#e86833',
            border: '1px solid #c8c7cc',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            fontSize: '17px',
            fontWeight: '500',
            WebkitTapHighlightColor: 'transparent',
            transition: 'background-color 0.2s ease-in-out',
          }}
          onMouseOver={e => e.target.style.backgroundColor = '#e0e0e0'}
          onMouseOut={e => e.target.style.backgroundColor = '#f0f0f0'}
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


// Contenedor principal del header
const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
  padding: 24px;
`;

// Sección izquierda con usuario
const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;
`;

// Contenedor del icono de usuario
const UserIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: #FEF5EC;
  border-radius: 50%;
  cursor: pointer;
`;

// Texto de bienvenida
const WelcomeText = styled.h2`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #333;
`;

// Texto de fecha
const DateText = styled.p`
  margin: 0;
  font-size: 14px;
  color: #777;
`;

// Sección de iconos a la derecha
const IconsSection = styled.div`
  display: flex;
  gap: 16px;
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
  background-color: #FEF5EC;
  border-radius: 50%;
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

// Icono de configuración
const SettingsIcon = styled.div`
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #FEF5EC;
  border-radius: 50%;
`;

// Panel lateral
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
  
  &:hover {
    background-color: #f5f5f5;
    border-radius: 50%;
  }
`;

// Nuevo menú desplegable de usuario
const UserMenu = styled.div`
  position: absolute;
  top: 50px;
  left: 0;
  width: 180px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 0.5rem 0;
  z-index: 100;
  display: ${props => props.show ? 'block' : 'none'};
`;

// Opción del menú de usuario
const UserMenuItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #f5f5f5;
  }
`;

// Separador del menú
const MenuDivider = styled.div`
  height: 1px;
  background-color: #eee;
  margin: 4px 0;
`;