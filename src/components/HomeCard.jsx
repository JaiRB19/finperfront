import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
    Home, 
    Globe, 
    BarChart2, 
    Bell, 
    Settings,
    ListIcon,
    PieChartIcon, 
    MoreHorizontal,
    BookOpenText,
    PiggyBank,
    ChartSpline, 
    Menu, 
    Plus 
} from "lucide-react";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import "./GeneralStyle.css";

//Componentes SideBar
import GeneralCardView from "../better/GeneralView";
import GraficosCardView from "../better/GraficosView";
import DetalleCardView from "../better/DetallesView";
import InformesCardView from "../better/InformesView";
import OpcionesCardView from "../better/OpcionesView";
import IngresoGastoCardView from "../better/AddView";
import InversionesView from "../better/InversionesView";
import PerfilView from "../better/PerfilUsuarioView";
import CardHeader from "../better/CardHeader";
import MetasAhorroView from "../better/MetasAhorroView";

function HomeCard() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState("general"); // Componente por defecto

  const menuItems = [
    { icon: <Home size={20} />, label: "Home", href: "/home", component: null }, // Home no cambia el contenido
    { icon: <Globe size={20} />, label: "General", component: "general" },
    { icon: <BarChart2 size={20} />, label: "Graficos", component: "graficos" },
    { icon: <ListIcon size={20} />, label: "Detalles", component: "detalles" },
    { icon: <PieChartIcon size={20} />, label: "Informes", component: "informes" },
    { icon: <PiggyBank size={20} />, label: "Ahorro", component: "ahorros" },
    { icon: <Settings size={20} />, label: "Opciones", component: "opciones" },
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
  const changeComponentCard = (component) => {
    setSelectedComponent(component);
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
            $isMain={index === 0} // Solo el primer item (Home) es principal
            collapsed={collapsed}
          >
            {React.cloneElement(item.icon, {
              color: selectedComponent === item.component ? "#D9632A" : "#333",
              size: 20
            })}
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        ))}


      </SidebarContainer>

      {/* Main Content */}
      <ContentContainer collapsed={collapsed}>
        <CardHeader changeComponentCard={changeComponentCard} />
        <div className="mt-4 overflow-auto" style={{ 
            flex: "1 1 auto",
            width: "100%",
            display: "flex",
            flexDirection: "column"
        }}>
          {/* Renderiza el componente según el estado seleccionado */}
          {selectedComponent === "general" && <GeneralCardView />}
          {selectedComponent === "graficos" && <GraficosCardView />}
          {selectedComponent === "detalles" && <DetalleCardView />}
          {selectedComponent === "informes" && <InformesCardView />}
          {selectedComponent === "opciones" && <OpcionesCardView changeComponentCard={changeComponentCard} />}
          {selectedComponent === "ingresoGasto" && <IngresoGastoCardView />}
          {selectedComponent === "inversiones" && <InversionesView changeComponentCard={changeComponentCard} />}
          {selectedComponent === "perfil" && <PerfilView />}
          {selectedComponent === "ahorros" && <MetasAhorroView />}
        </div>
      </ContentContainer>
    </div>
  );
}

export default HomeCard;


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
  
  /* Indentación visual para elementos secundarios */
  ${props => !props.$isMain && !props.collapsed && `
    padding-left: 28px;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      left: 12px;
      top: 50%;
      transform: translateY(-50%);
      height: 60%;
      width: 2px;
      background: rgba(217, 99, 42, 0.2);
      border-radius: 2px;
    }
  `}
  
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
  
  ${props => props.collapsed && `
    padding-left: 12px;
    
    &::after {
      display: none;
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