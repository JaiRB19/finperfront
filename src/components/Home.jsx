import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
    Home, 
    CreditCard,
    NewspaperIcon,
    User,
    SettingsIcon,
    CalendarDays,
    UserRoundPen,
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


function HomePage() {
  const [collapsed, setCollapsed] = useState(false);
  const [cards, setCards] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState("dashboard"); // Componente por defecto

  const menuItems = [
    { icon: <Home />, label: "Home", component: "dashboard" },
    { icon: <CreditCard />, label: "Card", component: "cards" },
    { icon: <NewspaperIcon />, label: "Novedades", component: "novedades" },
    { icon: <SettingsIcon />, label: "Configuración", component: "opciones" },
    { icon: <UserRoundPen />, label: "Perfil", component: "perfil" },
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

  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <SidebarContainer collapsed={collapsed}>
        <SidebarHeader>
          {!collapsed && <h2 style={{ color: "#D9632A", fontSize: "18px" }}>FINPER</h2>}
          <MenuButton onClick={() => setCollapsed(!collapsed)}>
            <Menu size={20} />
          </MenuButton>
        </SidebarHeader>

        <CreateButton onClick={handleAddClick}>
          <Plus size={18} />
          {!collapsed && "Añadir"}
        </CreateButton>

        {menuItems.map((item, index) => (
          <NavLink key={index} to={item.href} onClick={() => handleMenuClick(item.component)}>
            {item.icon}
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </SidebarContainer>

{/* Main Content */}
<ContentContainer collapsed={collapsed}>
    <HomeHeader />
    <div className="mt-4 overflow-auto" style={{ 
        flex: "1 1 auto",     /* Hace que ocupe todo el espacio disponible */
        width: "100%",        /* Ocupa todo el ancho disponible */
        display: "flex",      /* Activa flexbox */
        flexDirection: "column" /* Organiza los elementos en columna */
    }}>
          {/* Renderiza el componente según el estado seleccionado */}
          {selectedComponent === "dashboard" && <DashboardView />}
          {selectedComponent === "cards" &&   <CardsInter/>}
          {selectedComponent === "novedades" && <NovedadesView />}
          {selectedComponent === "opciones" && <OpcionesHomeView />}
          {selectedComponent === "ingresoGasto" && <TarjetaNuevaView />}
          {selectedComponent === "perfil" && <PerfilView />}
          {selectedComponent === "calendario" && <CalendarioView />}
    </div>
</ContentContainer>
    </div>
  );
}

export default HomePage;

//DISEÑO

const SidebarContainer = styled.div`
  height: 100vh;          /* Ocupa el 100% de la altura de la ventana */
  min-height: 100%;       /* Asegura altura mínima del 100% */
  position: fixed;        /* Lo fija en la pantalla */
  top: 0;                 /* Lo coloca desde la parte superior */
  left: 0;                /* Lo coloca desde la izquierda */
  background: white;
  border-right: 1px solid #e0e0e0;
  transition: width 0.3s;
  width: ${(props) => (props.collapsed ? "70px" : "200px")};
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.collapsed ? "center" : "flex-start")};
  z-index: 1000;          /* Asegura que esté por encima de otros elementos */
  overflow-y: auto;       /* Permite scroll si el contenido es más largo */

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
  transition: 0.3s;
  
  &:hover {
    background: #f0f0f0;
  }
`;

const CreateButton = styled.button`
  background: #D9632A;
  color: white;
  padding: 10px;
  width: 80%;
  border: none;
  border-radius: 15px;
  font-weight: 600;
  cursor: pointer;
  margin: 15px auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  
  &:hover {
    background: #F78839;
  }
`;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  width: 90%;
  text-decoration: none;
  color: #333;
  border-radius: 12px;
  transition: 0.3s;
  
  &:hover {
    background: #f5f5f5;
  }
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
