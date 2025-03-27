import React, { useState } from "react";
import styled from "styled-components";
import { CreditCard, Wifi } from "lucide-react";

const TarjetaNuevaView = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardholderName, setCardholderName] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvv, setCvv] = useState("");

  // Formatear número de tarjeta para mostrar en grupos de 4 dígitos
  const formatCardNumber = (value) => {
    const val = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = val.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  // Manejar cambio en el número de tarjeta
  const handleCardNumberChange = (e) => {
    const formattedValue = formatCardNumber(e.target.value);
    setCardNumber(formattedValue);
  };

  return (
    <Container>
      <MaxWidthContainer>
        <FlexContainer>
          {/* Tarjeta de crédito */}
          <CardContainer>
            <CardWrapper>
              {/* Tarjeta principal */}
              <Card>
                <CardHeader>
                  <CardChip />
                  <BankLabel>
                    <BankText>BANK</BankText>
                    <Wifi className="h-5 w-5 text-white" style={{ transform: 'rotate(90deg)' }} />
                  </BankLabel>
                </CardHeader>

                <CardFooter>
                  <CardNumber>
                    {cardNumber || "1234 5678 9012 3456"}
                  </CardNumber>

                  <CardInfo>
                    <CardInfoSection>
                      <CardInfoLabel>CARDHOLDER NAME</CardInfoLabel>
                      <CardInfoValue>{cardholderName || "NOMBRE APELLIDO"}</CardInfoValue>
                    </CardInfoSection>
                    <CardInfoSection align="right">
                      <CardInfoLabel>EXPIRES</CardInfoLabel>
                      <CardInfoValue>
                        {expiryMonth || "12"}/{expiryYear || "24"}
                      </CardInfoValue>
                    </CardInfoSection>
                  </CardInfo>
                </CardFooter>
              </Card>

              {/* Sombra/tarjeta trasera */}
              <CardShadow />
            </CardWrapper>
          </CardContainer>

          {/* Formulario de pago */}
          <FormContainer>
            <FormTitle>Detalles de Pago</FormTitle>

            <FormFields>
              <FormGroup>
                <Label htmlFor="cardNumber">
                  Número de Tarjeta
                </Label>
                <Input
                  id="cardNumber"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                />
                <IconWrapper>
                  <CreditCard size={20} />
                </IconWrapper>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="cardholderName">
                  Nombre del Titular
                </Label>
                <Input
                  id="cardholderName"
                  value={cardholderName}
                  onChange={(e) => setCardholderName(e.target.value.toUpperCase())}
                  placeholder="NOMBRE APELLIDO"
                />
              </FormGroup>

              <ExpiryGrid>
                <FormGroup>
                  <Label htmlFor="expiryMonth">
                    Mes
                  </Label>
                  <Input
                    id="expiryMonth"
                    value={expiryMonth}
                    onChange={(e) => setExpiryMonth(e.target.value.replace(/\D/g, "").slice(0, 2))}
                    placeholder="MM"
                    maxLength={2}
                  />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="expiryYear">
                    Año
                  </Label>
                  <Input
                    id="expiryYear"
                    value={expiryYear}
                    onChange={(e) => setExpiryYear(e.target.value.replace(/\D/g, "").slice(0, 2))}
                    placeholder="YY"
                    maxLength={2}
                  />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="cvv">
                    CVV
                  </Label>
                  <Input
                    id="cvv"
                    type="password"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
                    placeholder="***"
                    maxLength={3}
                  />
                </FormGroup>
              </ExpiryGrid>

              <ButtonContainer>
                <PrimaryButton>
                  Confirmar
                </PrimaryButton>

                <OutlineButton>
                  Cancelar
                </OutlineButton>
              </ButtonContainer>
            </FormFields>
          </FormContainer>
        </FlexContainer>
      </MaxWidthContainer>
    </Container>
  );
};

export default TarjetaNuevaView;

// Styled Components
const Container = styled.div`
  padding: 1rem;
  width: 100%;

  
  @media (min-width: 768px) {
    padding: 1.5rem;
  }
`;

const MaxWidthContainer = styled.div`
  width: 100%;

  margin: 0 auto;
`;

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: #D9632A;
`;

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 95%;
  
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const CardContainer = styled.div`
  width: 100%;
  
  @media (min-width: 768px) {
    width: 50%;
  }
`;

const CardWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1.58/1;
  max-width: 28rem;
  margin: 0 auto;
`;

const Card = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 1rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  background-image: linear-gradient(to right, #D9632A, #F78839);
`;

const CardShadow = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 1rem;
  background-color: rgba(0, 0, 0, 0.1);
  transform: translate(0.75rem, 0.75rem);
  z-index: -10;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const CardChip = styled.div`
  width: 2.5rem;
  height: 2rem;
  border-radius: 0.375rem;
  background-color: #F7BF36;
  opacity: 0.8;
`;

const BankLabel = styled.div`
  display: flex;
  align-items: center;
`;

const BankText = styled.span`
  color: white;
  font-weight: bold;
  margin-right: 0.25rem;
`;

const CardFooter = styled.div`
  margin-top: auto;
`;

const CardNumber = styled.div`
  color: white;
  font-size: 1.125rem;
  font-family: monospace;
  letter-spacing: 0.05em;
  margin-bottom: 1rem;
`;

const CardInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const CardInfoSection = styled.div`
  ${props => props.align === "right" && `text-align: right;`}
`;

const CardInfoLabel = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.75rem;
  margin-bottom: 0.25rem;
`;

const CardInfoValue = styled.p`
  color: white;
  font-weight: ${props => props.fontWeight || "500"};
`;

const FormContainer = styled.div`
  width: 100%;
  
  @media (min-width: 768px) {
    width: 50%;
  }
  
  border-radius: 1.5rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  background-color: white;
`;

const FormTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
`;

const FormFields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormGroup = styled.div`
  position: relative;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #4b5563;
`;

const Input = styled.input`
  width: 100%;
  height: 3rem;
  padding: 0.5rem 0.75rem;
  background-color: #f9fafb;
  border: none;
  border-bottom: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #D9632A;
  }
  
  &::placeholder {
    color: #9ca3af;
  }
`;

const IconWrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  padding-right: 0.75rem;
  pointer-events: none;
  color: #9ca3af;

    & > * { /* Aplica el estilo a todos los hijos directos de IconWrapper */
    transform: translateY(15px); /* Ajusta este valor según cuánto quieras bajar el icono */
  }
`;

const ExpiryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  padding-top: 1rem;
`;

const PrimaryButton = styled.button`
  width: 200px; /* Ajusta este valor al ancho deseado */
  height: 3rem;
  border-radius: 9999px;
  background-color: #D9632A;
  color: white;
  border: none;
  font-weight: 500;
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    background-color: #F78839;
  }
`;

const OutlineButton = styled.button`
  height: 3rem;
  border-radius: 9999px;
  background-color: transparent;
  border: 1px solid #d1d5db;
  color: #4b5563;
  padding: 0 1.5rem;
  font-weight: 500;
  transition: all 0.2s;
  cursor: pointer;
  
  &:hover {
    background-color: #f3f4f6;
  }
`;