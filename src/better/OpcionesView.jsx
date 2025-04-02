import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

const OpcionesCardView = ({changeComponentCard}) => {

  const handleChange = () => {
    changeComponentCard("inversiones");
  };

  return (
    <Container>
      <CardContainer>
        {/* Left Column - Options */}
        <Card>
          <CardTitle>Opciones</CardTitle>
          <FormGroup>
            <Label>Cambiar Nombre</Label>
            <Input type="text" placeholder="Nombre de la tarjeta" />
          </FormGroup>

          <FormGroup>
            <Label>Moneda</Label>
            <Select>
              <option>MXN</option>
              <option>DOLAR</option>
              <option>EURO</option>
            </Select>
          </FormGroup>

          <ButtonGroup>
            <ActionText>Exportar Archivo</ActionText>
            <Button primary>Exportar</Button>
          </ButtonGroup>

          <ButtonGroup>
            <ActionText danger>Eliminar Tarjeta</ActionText>
            <Button outline danger>Eliminar</Button>
          </ButtonGroup>
        </Card>

        {/* Right Column - Operations */}
        <Card>
          <CardTitle>Operaciones</CardTitle>
          <OperationRow>
            <OperationLabel>Simulador Virtual</OperationLabel>
            <Button primary onClick={handleChange}>Entrar</Button>
          </OperationRow>
          <ComingSoon>Muy Pronto...</ComingSoon>
        </Card>
      </CardContainer>
    </Container>
  );
};

export default OpcionesCardView;

// Orange-focused iOS-inspired color palette
const colors = {
  primary: "#FF9500", // iOS orange
  primaryDark: "#D9632A", // Darker orange for hover states
  primaryLight: "#FFBF66", // Lighter orange for effects
  danger: "#FF3B30", // iOS red
  cardBg: "#FFFFFF",
  text: "#000000",
  textSecondary: "#8E8E93", // iOS gray
  border: "#E5E5EA", // iOS light gray for borders
};

// iOS-inspired styled components with orange theme
const Container = styled.div`
  padding: 24px;
  width: 100%;
  background-color: ${colors.background};
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
`;

const Card = styled.div`
  background-color: ${colors.cardBg};
  border-radius: 16px;
  width: 100%;
  max-width: 380px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  height: 480px;
`;

const CardTitle = styled.h5`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 24px;
  text-align: center;
  color: ${colors.text};
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 15px;
  font-weight: 500;
  color: ${colors.textSecondary};
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  font-size: 16px;
  border-radius: 10px;
  border: 1px solid ${colors.border};
  background-color: ${colors.cardBg};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

  &:focus {
    outline: none;
    border-color: ${colors.primary};
    box-shadow: 0 0 0 1px ${colors.primary}40;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px 16px;
  font-size: 16px;
  border-radius: 10px;
  border: 1px solid ${colors.border};
  background-color: ${colors.cardBg};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  appearance: none;
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23FF9500%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");
  background-repeat: no-repeat;
  background-position: right 16px center;
  background-size: 12px;

  &:focus {
    outline: none;
    border-color: ${colors.primary};
    box-shadow: 0 0 0 1px ${colors.primary}40;
  }
`;

const ButtonGroup = styled.div`
  margin-bottom: 20px;
`;

const ActionText = styled.p`
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 8px;
  color: ${props => props.danger ? colors.danger : colors.textSecondary};
`;

const Button = styled.button`
  padding: 10px 20px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  background-color: ${props => props.primary ? colors.primary : 'transparent'};
  color: ${props => props.primary ? colors.cardBg : props.outline ? colors.primary : colors.danger};
  border: ${props => props.outline ? `1px solid ${props.danger ? colors.danger : colors.primary}` : 'none'};
  
  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
    background-color: ${props => props.primary ? colors.primaryDark : props.outline && !props.danger ? colors.primaryLight : 'transparent'};
  }
  
  &:active {
    transform: translateY(1px);
  }
`;

const ComingSoon = styled.p`
  font-style: italic;
  color: ${colors.textSecondary};
  font-size: 14px;
  margin-top: 12px;
`;

const OperationRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const OperationLabel = styled.span`
  font-size: 15px;
  font-weight: 500;
  color: ${colors.textSecondary};
`;