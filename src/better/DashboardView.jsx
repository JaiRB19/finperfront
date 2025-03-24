import React, { useState } from 'react';
import { CalendarDays, CreditCard, Coins, LayoutGrid, List } from "lucide-react";
import styled from 'styled-components';

// Accesos Directos
import Presupuesto from './PresupuestosComplement';
import CalendarioView from './CalendarioView';
import GraficaInversion from './GraficaInversion';

function DashboardView() {
  const [activeFilter, setActiveFilter] = useState("Mes");
  const [isGridView, setIsGridView] = useState(true);

  const fechaHoy = new Date();
  const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const fechaFormateada = fechaHoy.toLocaleDateString('es-ES', opciones);

  return (
    <DashboardContainer>
      <HeaderSection>
        <TitleArea>
          <Title>Tú Gestor de <Highlight>FIN</Highlight>anzas <Highlight>PER</Highlight>sonales de confianza</Title>
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
            <CardIconContainer>
              <CalendarDays size={20} color="#e86833"/>
            </CardIconContainer>
            <CardTitle>CALENDARIO</CardTitle>
            <CardActions>
              <CardActionButton>Ver todo</CardActionButton>
            </CardActions>
          </CardHeader>
          <CardBody className='custom-scrollbar'>
          </CardBody>
        </Card>
        
        <Card>
          <CardHeader>
            <CardIconContainer>
              <CreditCard size={20} color="#e86833"/>
            </CardIconContainer>
            <CardTitle>RECURRENTES</CardTitle>
            <CardActions>
              <CardActionButton>Ver todo</CardActionButton>
            </CardActions>
          </CardHeader>
          <CardBody className='custom-scrollbar'>
          </CardBody>
        </Card>
        
        <Card>
          <CardHeader>
            <CardIconContainer>
              <Coins size={20} color="#e86833"/>
            </CardIconContainer>
            <CardTitle>DIVISAS</CardTitle>
            <CardActions>
              <CardActionButton>Ver todo</CardActionButton>
            </CardActions>
          </CardHeader>
          <CardBody className='custom-scrollbar'>
          </CardBody>
        </Card>
      </CardsContainer>
    </DashboardContainer>
  );
}

export default DashboardView;

// Estilos mejorados
const DashboardContainer = styled.div`
  height: 100%;
  padding: 24px;
  background-color: #f8f9fa;
`;

const Highlight = styled.span`
  font-weight: bold;
  color: #e86833;
`;

const HeaderSection = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
`;

const TitleArea = styled.div``;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 600;
  color: #333;
  margin: 0;
`;

const Subtitle = styled.p`
  color: #6b7280;
  margin: 5px 0 0;
  font-size: 16px;
`;

const FilterArea = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;

  @media (max-width: 480px) {
    flex-wrap: wrap;
    gap: 10px;
  }
`;

const FilterTabs = styled.div`
  display: flex;
  background-color: #f2f2f7;
  border-radius: 8px;
  overflow: hidden;
  padding: 2px;
`;

const FilterTab = styled.button`
  padding: 8px 16px;
  background: ${({ active }) => (active ? '#FFFFFF' : 'transparent')};
  color: ${({ active }) => (active ? '#e86833' : '#6b7280')};
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
    background-color: #f0f0f0;
    border-color: #d1d5db;
  }
`;

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
    background-color: #f0f0f0;
    border-color: #d1d5db;
  }
`;

const CardsContainer = styled.div`
  display: ${({ isGridView }) => (isGridView ? 'grid' : 'flex')};
  grid-template-columns: ${({ isGridView }) => (isGridView ? 'repeat(auto-fit, minmax(380px, 1fr))' : 'none')};
  flex-direction: ${({ isGridView }) => (!isGridView ? 'column' : 'unset')};
  gap: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: ${({ isGridView }) => (isGridView ? 'repeat(auto-fit, minmax(300px, 1fr))' : 'none')};
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 0;
  height: 450px;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
  border: 1px solid #eaeaea;

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    height: auto;
    min-height: 400px;
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #f0f0f0;
  background-color: #fafafa;
`;

const CardIconContainer = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  background-color: rgba(232, 104, 51, 0.1);
`;

const CardTitle = styled.h2`
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  color: #333;
  flex-grow: 1;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const CardActions = styled.div`
  display: flex;
  align-items: center;
`;

const CardActionButton = styled.button`
  background: transparent;
  border: none;
  color: #e86833;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(232, 104, 51, 0.1);
  }
`;

const CardBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  position: relative;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #ddd;
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #ccc;
  }
`;
