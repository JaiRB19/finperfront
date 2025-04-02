import { useState } from "react";
import styled from "styled-components";

export default function DetalleCardView() {
  const [selectedPeriod, setSelectedPeriod] = useState("current");

  const barData = [
    { date: "15 mar", percentage: 50, amount: 340, color: "#D9632A" },
    { date: "14 mar", percentage: 50, amount: 350, color: "#FFD6A5" },
  ];

  const summary = {
    expenses: -700,
    income: 3000,
  };

  return (
    <Container>
      <Card>
        <Title>Detalle de Gastos</Title>

        {/* Period Selector */}
        <PeriodSelector>
          {["nov", "dic", "ene", "feb", "last", "current"].map((period, index) => (
            <PeriodButton
              key={index}
              active={selectedPeriod === period}
              onClick={() => setSelectedPeriod(period)}
            >
      {period === "last"
        ? "Mes pasado"
        : period === "current"
        ? "Este mes"
        : period === "ene"
        ? "ene 2025"
        : period === "feb"
        ? "feb 2025"
        : `${period} 2024`}
            </PeriodButton>
          ))}
        </PeriodSelector>

        <Content>
          {/* Bar Chart */}
          <BarChartContainer>
            {barData.map((item, index) => (
              <BarRow key={index}>
                <ColorDot color={item.color} />
                <DateLabel>{item.date}</DateLabel>
                <Bar>
                  <FilledBar color={item.color} width={item.percentage} opacity={1 - index * 0.15} />
                </Bar>
                <Amount>{item.amount} mxn</Amount>
                <Percentage>{item.percentage}%</Percentage>
              </BarRow>
            ))}
          </BarChartContainer>

          {/* Summary */}
          <SummaryContainer>
            <SummaryItem>
              <SummaryTitle>Gasto Mensual</SummaryTitle>
              <SummaryValue color="red">{summary.expenses.toLocaleString()} MXN</SummaryValue>
            </SummaryItem>
            <SummaryItem>
              <SummaryTitle>Ingreso Mensual</SummaryTitle>
              <SummaryValue color="green">+{summary.income.toLocaleString()} MXN</SummaryValue>
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