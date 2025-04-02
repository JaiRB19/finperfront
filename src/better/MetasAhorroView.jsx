import React from "react";
import styled from "styled-components";
import { CheckCircle, Clock } from "lucide-react";

const MetasAhorroView = () => {
  const goals = [
    { title: "Fondo de Emergencia", current: 6000, target: 10000, deadline: "30/06/25" },
    { title: "Vacaciones", current: 4000, target: 10000, deadline: "15/08/25" },
    { title: "Compra de Auto", current: 15000, target: 30000, deadline: "20/12/25" },
    { title: "Renovación Hogar", current: 8000, target: 20000, deadline: "10/11/25" }
  ];

  return (
    <Container>
      <Header>Metas de Ahorro</Header>
      {goals.map((goal, index) => {
        const percentage = Math.min((goal.current / goal.target) * 100, 100);
        const isCompleted = percentage === 100;

        return (
          <GoalItem key={index} completed={isCompleted}>
            <GoalHeader>
              {isCompleted ? <CheckCircle color="#34C759" size={20} /> : <Clock color="#FF9500" size={20} />}
              <GoalTitle>{goal.title}</GoalTitle>
            </GoalHeader>
            <ProgressBar percentage={percentage} />
            <ProgressText>{`${goal.current} MXN / ${goal.target} MXN (${percentage.toFixed(1)}%)`}</ProgressText>
            <GoalDeadline>Fecha límite: {goal.deadline}</GoalDeadline>
          </GoalItem>
        );
      })}
    </Container>
  );
};

export default MetasAhorroView;

const Container = styled.div`
  padding: 24px;
  width: 100%;
`;

const Header = styled.h2`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 16px;
  color: #000;
`;

const GoalItem = styled.div`
  margin: 12px 0;
  background-color: #f9f9fb;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const GoalHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const GoalTitle = styled.h5`
  font-size: 18px;
  font-weight: 600;
  color: #000;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 16px;
  background-color: #e5e5ea;
  border-radius: 8px;
  margin: 8px 0;
  position: relative;

  &:after {
    content: "";
    display: block;
    height: 100%;
    width: ${(props) => props.percentage}%;
    background-color: #ff9500;
    border-radius: 8px;
  }
`;

const ProgressText = styled.span`
  font-size: 14px;
  color: #8e8e93;
`;

const GoalDeadline = styled.p`
  font-size: 14px;
  color: #8e8e93;
`;
