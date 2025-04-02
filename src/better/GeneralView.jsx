import React from "react";
import styled from "styled-components";
import { PieChart, BarChart2 } from "lucide-react";
import UltimosMovimientosView from "./UltimosMovimientos";

const GeneralCardView = () => {
  return (
    <Container>
      {/* Top Row */}
      <Row marginBottom>
        <Card minWidth="250px">
          <CardTitle>Saldo Disponible</CardTitle>
          <DateRange>1/01/25 - 31/01/25</DateRange>
          <AmountDisplay>2,300 MXN</AmountDisplay>
        </Card>
        
        <Card minWidth="200px">
          <CardTitle>Gastos</CardTitle>
          <DateRange>1/01/25 - 31/01/25</DateRange>
          <AmountDisplay danger>700 MXN</AmountDisplay>
        </Card>
        
        <Card minWidth="200px">
          <CardTitle>Ingresos</CardTitle>
          <DateRange>1/01/25 - 31/01/25</DateRange>
          <AmountDisplay success>3000 MXN</AmountDisplay>
        </Card>
      </Row>
      
      {/* Bottom Row */}
      <Row>
        <Card minWidth="300px" style={{ flex: 2 }}>
          <CardTitle>Metas de Ahorro</CardTitle>
          <GoalItem>
            <GoalTitle>Fondo de Emergencia</GoalTitle>
            <GoalProgress>
              <ProgressBar percentage={60} />
              <ProgressText>60% - $6,000 / $10,000</ProgressText>
            </GoalProgress>
            <GoalDeadline>Fecha límite: 30/06/25</GoalDeadline>
          </GoalItem>

          <GoalItem>
            <GoalTitle>Vacaciones</GoalTitle>
            <GoalProgress>
              <ProgressBar percentage={40} />
              <ProgressText>40% - $4,000 / $10,000</ProgressText>
            </GoalProgress>
            <GoalDeadline>Fecha límite: 15/08/25</GoalDeadline>
          </GoalItem>
        </Card>
        
        <Card minWidth="200px" style={{ flex: 1 }}>
          <CardTitle>Visualización</CardTitle>
          <DateRange>1/01/25 - 31/01/25</DateRange>
          <ChartContainer>
            <PieChart size={80} color={colors.primary} strokeWidth={1.5} />
          </ChartContainer>
        </Card>
      </Row>
<br /><br />
      <UltimosMovimientosView />
    </Container>
  );
};

export default GeneralCardView;

const colors = {
  primary: "#FF9500",
  primaryDark: "#D9632A",
  danger: "#FF3B30",
  success: "#34C759",
  cardBg: "#FFFFFF",
  text: "#000000",
  textSecondary: "#8E8E93",
  border: "#E5E5EA",
  itemBg: "#F9F9FB",
};

const Container = styled.div`
  padding: 24px;
  width: 100%;
  background-color: ${colors.background};
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: ${(props) => (props.marginBottom ? "16px" : "0")};
`;

const Card = styled.div`
  background-color: ${colors.cardBg};
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  flex: 1;
  min-width: ${(props) => props.minWidth || "0"};
`;

const CardTitle = styled.h5`
  font-size: 17px;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: ${colors.text};
`;

const DateRange = styled.p`
  font-size: 13px;
  color: ${colors.textSecondary};
  margin: 0 0 12px 0;
`;

const AmountDisplay = styled.h3`
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  margin: 16px 0 0 0;
  color: ${(props) => {
    if (props.danger) return colors.danger;
    if (props.success) return colors.success;
    return colors.text;
  }};
`;

// Goal Styles
const GoalItem = styled.div`
  margin: 12px 0;
  background-color: ${colors.itemBg};
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
`;

const GoalTitle = styled.h6`
  font-size: 16px;
  margin: 0 0 8px 0;
  color: ${colors.text};
`;

const GoalProgress = styled.div`
  margin: 8px 0;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 12px;
  background-color: ${colors.border};
  border-radius: 8px;
  margin-bottom: 4px;
  position: relative;

  &:after {
    content: "";
    display: block;
    height: 100%;
    width: ${(props) => props.percentage}%;
    background-color: ${colors.primary};
    border-radius: 8px;
  }
`;

const ProgressText = styled.p`
  font-size: 14px;
  color: ${colors.textSecondary};
  margin: 0;
`;

const GoalDeadline = styled.p`
  font-size: 13px;
  color: ${colors.textSecondary};
  margin: 4px 0 0 0;
`;

const ChartContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 150px;
  margin-top: 20px;
`;
