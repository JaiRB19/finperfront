import React, { useState } from "react";
import styled from "styled-components";

function GraficosCardView() {
  const [timeRange, setTimeRange] = useState("month");
  const [activePeriod, setActivePeriod] = useState("Este mes");

  const periods = ["Ago 2024", "Sep 2024", "Oct 2024", "Nov 2024", "Mes pasado", "Este mes"];

  const chartData = [
    { category: "Ropa", percentage: 46, color: "#3498db" }, // Azul
    { category: "Mascotas", percentage: 23, color: "#2ecc71" }, // Verde
    { category: "Comida", percentage: 18, color: "#f39c12" }, // Amarillo/Naranja
    { category: "Transporte", percentage: 15, color: "#e74c3c" }  // Rojo
  ];

  // Calculate the donut chart segments
  const radius = 50;
  const center = 60;
  const strokeWidth = 24;
  const innerRadius = radius - strokeWidth / 2;

  // Calculate stroke dasharray and dashoffset for each segment
  const circumference = 2 * Math.PI * innerRadius;
  let cumulativeOffset = 0;
  
  return (
    <Container>
      <Title>Análisis de Gastos</Title>
      
      {/* Toggle Container */}
      <ToggleContainer>
        <ToggleButton 
          active={timeRange === "month"} 
          onClick={() => setTimeRange("month")}
          leftSide
        >
          Mes
        </ToggleButton>
        <ToggleButton 
          active={timeRange === "year"} 
          onClick={() => setTimeRange("year")}
          rightSide
        >
          Año
        </ToggleButton>
      </ToggleContainer>
      
      {/* Period Selector */}
      <PeriodContainer>
        {periods.map((period) => (
          <PeriodButton
            key={period}
            active={activePeriod === period}
            onClick={() => setActivePeriod(period)}
          >
            {period}
          </PeriodButton>
        ))}
      </PeriodContainer>
      
      {/* Chart and Legend Container */}
      <FlexContainer>
        {/* Donut Chart */}
        <ChartContainer>
          <svg viewBox="0 0 120 120" width="100%" height="100%">
            <circle cx={center} cy={center} r={innerRadius} fill="white" />
            
            {chartData.map((item, index) => {
              const dashArray = (item.percentage / 100) * circumference;
              const dashOffset = -cumulativeOffset;
              cumulativeOffset += dashArray;
              
              return (
                <circle
                  key={index}
                  cx={center}
                  cy={center}
                  r={innerRadius}
                  fill="none"
                  stroke={item.color}
                  strokeWidth={strokeWidth}
                  strokeDasharray={`${dashArray} ${circumference - dashArray}`}
                  strokeDashoffset={dashOffset}
                  transform={`rotate(-90 ${center} ${center})`}
                  strokeLinecap="round"
                />
              );
            })}
          </svg>
        </ChartContainer>
        
        {/* Legend */}
        <LegendContainer>
          {chartData.map((item) => (
            <LegendItem key={item.category}>
              <LegendLeftSide>
                <ColorDot color={item.color} />
                <CategoryLabel>{item.category}</CategoryLabel>
              </LegendLeftSide>
              <PercentageValue>{item.percentage}%</PercentageValue>
            </LegendItem>
          ))}
        </LegendContainer>
      </FlexContainer>
    </Container>
  );
}

export default GraficosCardView;

// Styled Components
const Container = styled.div`
  padding: 24px;
  width: 95%; /* Aumentado a 1000px (ancho) */
  min-height: 600px; /* Agregado min-height (largo) */
  margin: 0 auto;
  background-color: white;
  border-radius: 16px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  color: #d9632a;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 24px;
`;

const ToggleContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 32px;
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid #d9632a;
  border-radius: 9999px;
  overflow: hidden;
`;

const ToggleButton = styled.button`
  width: 50%;
  padding: 8px 16px;
  text-align: center;
  background-color: ${props => props.active ? '#D9632A' : 'white'};
  color: ${props => props.active ? 'white' : '#333'};
  cursor: pointer;
  border: none;
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  border-radius: ${props => props.leftSide ? '9999px 0 0 9999px' : props.rightSide ? '0 9999px 9999px 0' : '0'};
`;

const PeriodContainer = styled.div`
  display: flex;
  overflow-x: auto;
  margin-bottom: 32px;
  border-bottom: 1px solid #e5e5e5;
  justify-content: space-between; /* Distribuir los botones uniformemente */
  padding: 0 20px; /* Añadir padding para que no toque los bordes */
`;

const PeriodButton = styled.button`
  padding: 12px 20px;
  white-space: nowrap;
  background: transparent;
  border: none;
  color: ${props => props.active ? '#D9632A' : '#666'};
  border-bottom: ${props => props.active ? '2px solid #D9632A' : 'none'};
  cursor: pointer;
  font-weight: ${props => props.active ? 'bold' : 'normal'};
`;

const FlexContainer = styled.div`
  display: flex;
  flex-direction: row; /* Siempre horizontal en el nuevo tamaño */
  align-items: center;
  justify-content: space-around; /* Distribuir el espacio uniformemente */
  gap: 60px; /* Más espacio entre elementos */
  flex: 1; /* Tomar todo el espacio disponible */
  padding: 20px;
  margin-top: 20px;
`;

const ChartContainer = styled.div`
  width: 300px;
  height: 300px;
`;

const LegendContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px; /* Más espacio entre elementos */
  min-width: 300px; /* Ancho mínimo aumentado */
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 5px 10px; /* Añadir padding */
  border-radius: 8px;
  transition: all 0.3s ease;

    &:hover {
    background-color: rgba(217, 99, 42, 0.1);
  }
`;

const LegendLeftSide = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const ColorDot = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: ${props => props.color};
`;

const CategoryLabel = styled.span`
  color: #333;
`;

const PercentageValue = styled.span`
  font-weight: bold;
  color: #000;
`;