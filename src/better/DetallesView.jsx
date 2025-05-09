import React, { useState, useEffect } from "react";
import styled from "styled-components";
import api from "../components/axios";

export default function DetalleCardView() {
  const [selectedPeriod, setSelectedPeriod] = useState("current");
  const [barData, setBarData] = useState([]);
  const [summary, setSummary] = useState({ expenses: 0, income: 0 });

  // Cargar datos al montar y cuando cambie el periodo
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        const { data } = await api.get("/api/dashboard/details", {
          headers: { Authorization: `Bearer ${token}` },
          params: { period: selectedPeriod }
        });
        setBarData(data.data.bars);
        setSummary(data.data.summary);
      } catch (err) {
        console.error("Error cargando detalle:", err);
      }
    };
    fetchDetails();
  }, [selectedPeriod]);

  return (
    <Container>
      <Card>
        <Title>Detalle de Gastos</Title>

        {/* Period Selector */}
        <PeriodSelector>
          {["nov","dic","ene","feb","last","current"].map((p,i) => (
            <PeriodButton
              key={i}
              active={selectedPeriod === p}
              onClick={() => setSelectedPeriod(p)}
            >
              {p==="last"? "Mes pasado"
               :p==="current"? "Este mes"
               :p==="ene"? "ene 2025"
               :p==="feb"? "feb 2025"
               : `${p} 2024`}
            </PeriodButton>
          ))}
        </PeriodSelector>

        <Content>
          {/* Bar Chart */}
          <BarChartContainer>
            {barData.map((item,i) => (
              <BarRow key={i}>
                <ColorDot color={item.color} />
                <DateLabel>{item.date}</DateLabel>
                <Bar>
                  <FilledBar
                    color={item.color}
                    width={item.percentage}
                    opacity={1 - i * 0.15}
                  />
                </Bar>
                <Amount>{item.amount.toLocaleString()} mxn</Amount>
                <Percentage>{item.percentage}%</Percentage>
              </BarRow>
            ))}
          </BarChartContainer>

          {/* Summary */}
          <SummaryContainer>
            <SummaryItem>
              <SummaryTitle>Gasto Mensual</SummaryTitle>
              <SummaryValue color="red">
                {summary.expenses.toLocaleString()} MXN
              </SummaryValue>
            </SummaryItem>
            <SummaryItem>
              <SummaryTitle>Ingreso Mensual</SummaryTitle>
              <SummaryValue color="green">
                +{summary.income.toLocaleString()} MXN
              </SummaryValue>
            </SummaryItem>
          </SummaryContainer>
        </Content>
      </Card>
    </Container>
  );
}

// Styled Components
const Container = styled.div`
    padding: 24px;
    display: flex;
    justify-content: center;
`;

const Card = styled.div`
  width: 95%;
  background: white;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #d9632a;
  text-align: center;
  margin-bottom: 24px;
`;

const PeriodSelector = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  margin-bottom: 24px;
`;

const PeriodButton = styled.button`
  padding: 8px 16px;
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ active }) => (active ? "#D9632A" : "#666")};
  font-weight: ${({ active }) => (active ? "bold" : "normal")};
  border-bottom: ${({ active }) => (active ? "2px solid #D9632A" : "none")};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const BarChartContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 20px 0;
  padding: 0 20px;
`;

const BarRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
`;

const ColorDot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
`;

const DateLabel = styled.div`
  width: 60px;
  font-size: 14px;
  color: #333;
`;

const Bar = styled.div`
  flex: 1;
  height: 12px;
  background: #f0f0f0;
  border-radius: 6px;
  overflow: hidden;
`;

const FilledBar = styled.div`
  height: 100%;
  background: ${({ color }) => color};
  width: ${({ width }) => width}%;
  opacity: ${({ opacity }) => opacity};
  border-radius: 6px;
`;

const Amount = styled.div`
  width: 80px;
  text-align: right;
  font-weight: bold;
  color: #000;
`;

const Percentage = styled.div`
  width: 40px;
  text-align: right;
  color: #666;
  font-size: 14px;
`;

const SummaryContainer = styled.div`
  width: 250px;
`;

const SummaryItem = styled.div`
  margin-bottom: 16px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 8px;
`;

const SummaryTitle = styled.h3`
  font-size: 16px;
  color: #444;
`;

const SummaryValue = styled.p`
  font-size: 24px;
  font-weight: bold;
  color: ${({ color }) => (color === "red" ? "#e63946" : "#2a9d8f")};
`;