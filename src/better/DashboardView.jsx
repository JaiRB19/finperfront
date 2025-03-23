import React, { useState } from 'react';
import { CalendarDays, CreditCard, Coins, LayoutGrid, List } from "lucide-react";
import styled from 'styled-components';

//Accesos Directos
import Presupuesto from './PresupuestosComplement';
import CalendarioView from './CalendarioView';
import GraficaInversion from './GraficaInversion';


function DashboardView() {
  const [activeFilter, setActiveFilter] = useState("Mes"); // Estado para el filtro activo
  const [isGridView, setIsGridView] = useState(true); // Estado para cambiar vista

  const fechaHoy = new Date();
  const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const fechaFormateada = fechaHoy.toLocaleDateString('es-ES', opciones);

  return (
    <DashboardContainer>
      <HeaderSection>
        <TitleArea>
          <Title>Tú Gestor de <span style={{ fontWeight: 'bold', color: '#ff9800' }}>FIN</span>anzas{' '}
          <span style={{ fontWeight: 'bold', color: '#ff9800' }}>PER</span>sonales de confianza</Title>
          <Subtitle>Hoy es {fechaFormateada}</Subtitle>
        </TitleArea>
        <FilterArea>
          <FilterTabs>
            {["Semana", "Mes", "Año"].map((tab) => (
              <FilterTab 
                key={tab} 
                active={activeFilter === tab} 
                onClick={() => setActiveFilter(tab)}
              >
                {tab}
              </FilterTab>
            ))}
          </FilterTabs>
          <UpdateButton onClick={() => console.log("Actualizando datos para:", activeFilter)}>
            Actualizar
          </UpdateButton>
          <ViewToggle onClick={() => setIsGridView(!isGridView)}>
            {isGridView ? <List size={18} /> : <LayoutGrid size={18} />}
          </ViewToggle>
        </FilterArea>
      </HeaderSection>

      <CardsContainer isGridView={isGridView}>
        <Card>
          <CardHeader>
            <CardIcon><CalendarDays color="#e86833"/></CardIcon>
            <CardTitle>CALENDARIO</CardTitle>
          </CardHeader>
          <CardBody className='custom-scrollbar'>
            <p className='text-center'>solo es para ver si se acomodan</p>
            <CalendarioView />
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <CardIcon><CreditCard color="#e86833"/></CardIcon>
            <CardTitle>RECURRENTES</CardTitle>
          </CardHeader>
          <CardBody className='custom-scrollbar'>
            <p className='text-center'>solo es para ver si se acomodan</p>
            <Presupuesto />
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <CardIcon><Coins color="#e86833"/></CardIcon>
            <CardTitle>DIVISAS</CardTitle>
          </CardHeader>
          <CardBody className='custom-scrollbar'>
            <p className='text-center'>solo es para ver si se acomodan</p>
            <GraficaInversion />
          </CardBody>
        </Card>
      </CardsContainer>
    </DashboardContainer>
  );
}

export default DashboardView;

// Contenedor Principal
const DashboardContainer = styled.div`
  height: 100%;          
  padding: 24px;
`;

// Header
const HeaderSection = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;

    /* Media query para pantallas más pequeñas (por ejemplo, móviles) */
  @media (max-width: 768px) {
    flex-direction: column; /* Cambia la dirección a columna */
    align-items: flex-start; /* Alinea los elementos a la izquierda */
    gap: 10px; /* Agrega espacio entre los elementos */
  }

  /* Media query para pantallas aún más pequeñas (por ejemplo, móviles pequeños) */
  @media (max-width: 480px) {
    flex-direction: column; /* Asegura que la dirección sea columna */
    align-items: flex-start; /* Asegura que la alineación sea a la izquierda */
    gap: 10px; /* Mantiene el espacio entre los elementos */
  }
`;

const TitleArea = styled.div``;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 600;
  color: rgb(232, 105, 51);
  margin: 0;
`;

const Subtitle = styled.p`
  color: #6b7280;
  margin: 0;
  font-size: 16px;
`;

// Área de Filtros
const FilterArea = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const FilterTabs = styled.div`
  display: flex;
  background-color: #F2F2F7; 
  border-radius: 8px;
  overflow: hidden;
  padding: 2px;
`;

const FilterTab = styled.button`
  padding: 8px 16px;
  background: ${({ active }) => (active ? '#FFFFFF' : 'transparent')};
  color: ${({ active }) => (active ? '#d9632a' : '#6b7280')};
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: ${({ active }) => (active ? '600' : '500')};
  border-radius: 7px;
  transition: all 0.2s ease;
  margin: 0 2px;

  &:hover {
    background-color: ${({ active }) => (active ? '#FFFFFF' : 'rgba(255, 255, 255, 0.5)')};
  }

  &:active {
    transform: scale(0.98);
  }
`;

const UpdateButton = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 8px 15px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  color: #374151;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: #ffe0b2;
  }
`;

// Botón para cambiar la vista (cuadrícula/lista)
const ViewToggle = styled.button`
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.3s;

  &:hover {
    background-color: #ffe0b2;
  }
`;

// Contenedor de las tarjetas con cambio de vista
const CardsContainer = styled.div`
  display: ${({ isGridView }) => (isGridView ? 'grid' : 'flex')};
  grid-template-columns: ${({ isGridView }) => (isGridView ? 'repeat(3, 1fr)' : 'none')};
  flex-direction: ${({ isGridView }) => (!isGridView ? 'column' : 'unset')};
  gap: 20px;

    /* Media query para pantallas más pequeñas (por ejemplo, tabletas) */
  @media (max-width: 1024px) {
    grid-template-columns: ${({ isGridView }) => (isGridView ? 'repeat(2, 1fr)' : 'none')}; /* 2 columnas en cuadrícula */
  }

  /* Media query para pantallas aún más pequeñas (por ejemplo, móviles) */
  @media (max-width: 768px) {
    grid-template-columns: 1fr; /* 1 columna en cuadrícula */
    flex-direction: column; /* Vista de lista en móviles */
  }

  /* Media query para pantallas aún más pequeñas (por ejemplo, móviles pequeños) */
  @media (max-width: 480px) {
    grid-template-columns: 1fr; /* 1 columna en cuadrícula */
    flex-direction: column; /* Vista de lista en móviles */
    gap: 15px; /* Reduce el espacio entre los elementos */
  }
`;

// Tarjeta
const Card = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 20px;
  height: 350px;
  display: flex;
  flex-direction: column;
  transition: 0.3s;
`;

// Header de la Tarjeta
const CardHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const CardIcon = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
`;

const CardTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  margin: 0;
`;

const CardBody = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  font-size: 14px;
  color: #333;
`;
