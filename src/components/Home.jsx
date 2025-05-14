import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
    Home, 
    CreditCard,
    NewspaperIcon,
    User,
    SettingsIcon,
    CalendarDays,
    UserRoundPen,
    FolderSync,
    Menu, 
    Plus 
  } from "lucide-react";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import "./GeneralStyle.css";

//Componentes SideBar
import DashboardView from "../better/DashboardView";
import CardsInter from "../better/CardInter";
import NovedadesView from "../better/NovedadesView";
import OpcionesHomeView from "../better/OpcionesHomeView";
import TarjetaNuevaView from "../better/TarjetaNuevaView";
import PerfilView from "../better/PerfilUsuarioView";
import CalendarioView from "../better/CalendarioView";
import HomeHeader from "../better/HomeHeader";
import LetterLogo from '../assets/LetterLogo.svg'; // Ajusta la ruta si es necesario

import SyncfyWidgetComponent from "./SyncfyWidgetComponent";


function HomePage() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [cards, setCards] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState("dashboard"); // Componente por defecto

  const menuItems = [
    { icon: <Home />, label: "Home", component: "dashboard" },
    { icon: <CreditCard />, label: "Tarjetas", component: "cards" },
    { icon: <NewspaperIcon />, label: "Novedades", component: "novedades" },
    { icon: <SettingsIcon />, label: "Configuración", component: "opciones" },
    { icon: <CalendarDays />, label: "Calendario", component: "calendario" },
  ];

  // Manejador para cambiar el contenido del container
  const handleMenuClick = (component) => {
    if (component) {
      setSelectedComponent(component);
    }
  };

  // Manejador para cambiar al componente de Añadir
  const handleAddClick = () => {
    setSelectedComponent("ingresoGasto");
  };

  // Función para cambiar el componente seleccionado desde otros componentes
  const changeComponent = (component) => {
    setSelectedComponent(component);
  };

  // Función para cambiar a vista de Planes
  const handleClickPlanes = () => {
    navigate("/planes");
  };

  const handleLogoClick = () => {
    navigate("/home");
  };


  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <SidebarContainer collapsed={collapsed}>
        <SidebarHeader>
          {!collapsed && (
            <LogoContainer>
              <LogoText onClick={handleLogoClick}>FINPER</LogoText>
              <div className="logo-accent" />
            </LogoContainer>
          )}
          <MenuButton onClick={() => setCollapsed(!collapsed)}>
            <Menu size={20} />
          </MenuButton>
        </SidebarHeader>

        <CreateButton onClick={handleAddClick}>
          <Plus size={18} />
          {!collapsed && "Añadir"}
        </CreateButton>

        {menuItems.map((item, index) => (
          <NavLink 
            key={index} 
            to={item.href} 
            onClick={() => handleMenuClick(item.component)}
            $active={selectedComponent === item.component}
          >
          {React.cloneElement(item.icon, {
            color: selectedComponent === item.component ? "#D9632A" : "#333",
            size: 20
          })}
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        ))}

        <ProfileSection onClick={handleClickPlanes}>
          <ProfileAvatar>
            {!collapsed ? "UP" : "U"}
          </ProfileAvatar>
          {!collapsed && <ProfileInfo>
            <ProfileName>Usuario Pro</ProfileName>
            <ProfileStatus>Premium</ProfileStatus>
          </ProfileInfo>}
        </ProfileSection>       

      </SidebarContainer>

{/* Main Content */}
<ContentContainer collapsed={collapsed}>
    <HomeHeader changeComponent={changeComponent} />
    <div className="mt-4 overflow-auto" style={{ 
        flex: "1 1 auto",     /* Hace que ocupe todo el espacio disponible */
        width: "100%",        /* Ocupa todo el ancho disponible */
        display: "flex",      /* Activa flexbox */
        flexDirection: "column" /* Organiza los elementos en columna */
    }}>
          {/* Renderiza el componente según el estado seleccionado */}
          {selectedComponent === "dashboard" && <DashboardView />}
          {selectedComponent === "cards" &&   <CardsInter changeComponent={changeComponent} />}
          {selectedComponent === "novedades" && <NovedadesView />}
          {selectedComponent === "opciones" && <OpcionesHomeView changeComponent={changeComponent} />}
          {selectedComponent === "ingresoGasto" && <TarjetaNuevaView />}
          {selectedComponent === "perfil" && <PerfilView changeComponent={changeComponent} />}
          {selectedComponent === "calendario" && <CalendarioView />}
          {selectedComponent === "syncfy" && <SyncfyWidgetComponent />}
    </div>
</ContentContainer>
    </div>
  );
}

export default HomePage;

//DISEÑO

const SidebarContainer = styled.div`
  height: 100vh;
  min-height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: linear-gradient(180deg, #FFFFFF 0%, #F8F8F8 100%);
  border-right: none;
  box-shadow: 4px 0 15px rgba(0, 0, 0, 0.05);
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  width: ${(props) => (props.collapsed ? "80px" : "220px")};
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.collapsed ? "center" : "flex-start")};
  z-index: 1000;
  overflow-y: auto;
  padding-bottom: 20px;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #D9632A;
    border-radius: 4px;
  }
`;

const SidebarHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: all 0.3s;
  
  &:hover {
    background: rgba(217, 99, 42, 0.1);
    transform: rotate(90deg);
  }
`;

const CreateButton = styled.button`
  background: linear-gradient(135deg, #D9632A, #F78839);
  color: white;
  padding: 12px;
  width: ${props => props.collapsed ? '50px' : '80%'};
  border: none;
  border-radius: 15px;
  font-weight: 600;
  cursor: pointer;
  margin: 15px auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 6px rgba(217, 99, 42, 0.2);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(217, 99, 42, 0.3);
  }
`;

// Modifica el NavLink para incluir el estado activo
const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  width: 90%;
  text-decoration: none;
  color: ${props => props.$active ? '#D9632A' : '#333'};
  border-radius: 12px;
  transition: 0.3s;
  position: relative;
  font-weight: ${props => props.$active ? '600' : '400'};
  
  &:hover {
    background: #f5f5f5;
  }
  
  ${props => props.$active && `
    background: rgba(217, 99, 42, 0.1);
    
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      height: 60%;
      width: 4px;
      background: #D9632A;
      border-radius: 0 4px 4px 0;
    }
  `}
`;

const LogoContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  
  .logo-accent {
    position: absolute;
    bottom: -8px;
    left: 0;
    height: 3px;
    width: 20px;
    background: #D9632A;
    border-radius: 3px;
  }
`;

const LogoText = styled.h2`
  color: #D9632A;
  font-size: 22px;
  cursor: pointer;
  font-weight: 700; 
  margin: 0;
  transition: transform 0.2s ease-in-out; /* Agrega una transición suave para la transformación */

  &:hover {
    transform: translateY(-2px); /* Mueve el texto 2 píxeles hacia arriba al hacer hover */
  }
`;

const LogoIcon = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: #D9632A;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 20px;
`;

const ProfileSection = styled.div`
  width: 90%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  margin: auto 0 20px 0;
  border-top: 1px solid #f0f0f0;
  cursor: pointer;
  transition: all 0.3s;
  border-radius: 12px;
  
  &:hover {
    background: rgba(217, 99, 42, 0.05);
  }
`;

const ProfileAvatar = styled.div`
  width: ${props => props.collapsed ? '36px' : '40px'};
  height: ${props => props.collapsed ? '36px' : '40px'};
  border-radius: 12px;
  background: linear-gradient(135deg, #D9632A, #F78839);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  box-shadow: 0 4px 8px rgba(217, 99, 42, 0.2);
  transition: all 0.3s;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProfileName = styled.span`
  font-weight: 500;
  font-size: 14px;
  color: #333;
`;

const ProfileStatus = styled.span`
  font-size: 12px;
  color: #D9632A;
`;

const ContentContainer = styled.div`
  position: absolute;    /* Posicionamiento absoluto para ocupar espacio disponible */
  left: ${(props) => (props.collapsed ? "70px" : "200px")}; /* Se alinea con el borde del sidebar */
  top: 0;                /* Desde el borde superior */
  right: 0;              /* Hasta el borde derecho */
  bottom: 0;             /* Hasta el borde inferior */
  padding: 30px;
  background: #f8f9fa;   /* Fondo claro para diferenciar el contenido */
  transition: left 0.3s; /* Suaviza la transición al colapsar el sidebar */
  display: flex;         /* Activa flexbox */
  flex-direction: column; /* Organiza los elementos en columna */
  justify-content: center; /* Centra verticalmente */
  align-items: center;     /* Centra horizontalmente */
  overflow-y: auto;      /* Permite scroll si el contenido es muy largo */4
`;
