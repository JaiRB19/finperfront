import React from 'react'
import styled from 'styled-components'

function DashboardView() {
  return (
    <DashboardContainer>
      <HeaderSection>
        <TitleArea>
          <Title>Dashboard</Title>
          <Subtitle>  Tu Gestor de <span style={{ fontWeight: 'bold', color: '#ff9800' }}>FIN</span>anzas{' '}
          <span style={{ fontWeight: 'bold', color: '#ff9800' }}>PER</span>sonales de confianza</Subtitle>
        </TitleArea>
        <FilterArea>
          <FilterTabs>
            <FilterTab>Semana</FilterTab>
            <FilterTab active>Mes</FilterTab>
            <FilterTab>Año</FilterTab>
          </FilterTabs>
          <UpdateButton>
            Actualizar
          </UpdateButton>
        </FilterArea>
      </HeaderSection>
    </DashboardContainer>
  )
}

export default DashboardView

const DashboardContainer = styled.div`
  height: 100%;          /* Ocupa el 100% de la altura de la ventana */
  min-height: 100%;       /* Asegura altura mínima del 100% */
`;

const HeaderSection = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const TitleArea = styled.div``;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 600;
  color: #e86833;
  margin: 0;
`;

const Subtitle = styled.p`
  color: #6b7280;
  margin: 0;
  font-size: 16px;
`;

const FilterArea = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const FilterTabs = styled.div`
  display: flex;
  border: 1px solid #f9a825; /* Borde naranja claro */
  border-radius: 10px; /* Borde redondeado estilo iOS */
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Sombra sutil estilo iOS */
`;

const FilterTab = styled.button`
  padding: 10px 20px; /* Ajusta el padding para un estilo iOS */
  background: ${props => props.active ? '#fff3e0' : 'white'}; /* Fondo naranja claro para activo */
  color: ${props => props.active ? '#d9632a' : '#6b7280'}; /* Color naranja para activo */
  border: none;
  cursor: pointer;
  font-size: 16px; /* Ajusta el tamaño de la fuente para un estilo iOS */
  font-weight: ${props => props.active ? '600' : 'normal'}; /* Ajusta el peso de la fuente para activo */
  border-radius: 8px; /* Borde redondeado estilo iOS */
  transition: 0.3s;

  
  &:not(:last-child) {
    border-right: 1px solid #f9a825; /* Borde naranja claro */
  }

  &:hover {
    background-color: #ffe0b2; /* Color de fondo al pasar el mouse */
  }

  &:active {
    background-color: #ffcc80; /* Color de fondo al hacer clic */
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
    background-color: #ffe0b2; /* Color de fondo al pasar el mouse */
  }
`;