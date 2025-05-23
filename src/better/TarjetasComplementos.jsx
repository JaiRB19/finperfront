import React from "react";
import { useNavigate  } from 'react-router-dom';
import styled from "styled-components";
import { CreditCard as CreditCardIcon, Wallet, DollarSign } from "lucide-react";

// Componente de Tarjeta de Crédito
const CardsCredit = ({
  disponible = "", limite = "",
  gasto1 = "", gasto2 = "", gasto3 = "",
  fechaCorte = "", fechaPago = "", oculto,
  nombre = ""
}) => {

const navigate = useNavigate();

const handleCard = () => {
  navigate('/homecard');
};

  return (
    <Container>
      <CardCredito>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <h1 className="text-center font-weight-bold" style={{ color: "#D9632A", fontSize: "18px", marginRight: '10px' }}>
            CRÉDITO - {nombre}
          </h1>
        </div>
        <Row>
          {/* Tarjeta de crédito con estilo iOS */}
          <CreditCardStyled creditCard>
            <CardNumber>**** **** **** 5678</CardNumber>
            <CardLogo>MASTERCARD</CardLogo>
          </CreditCardStyled>

          {/* Sección de información del crédito */}
          <TransactionsSection>
            <SectionTitle>Límite de Crédito</SectionTitle>
            <ValuesRow>
              <Value type="normal">{oculto ? "****" : `$${limite}`}</Value>
            </ValuesRow>
            
            <Divider />
            
            <SectionTitle>Últimos Cargos</SectionTitle>
            <ValuesRow noMargin>
              <Value type="expense">{oculto ? "****" : `$${gasto1}`}</Value>
              <Value type="expense">{oculto ? "****" : `$${gasto2}`}</Value>
              <Value type="expense">{oculto ? "****" : `$${gasto3}`}</Value>
            </ValuesRow>
          </TransactionsSection>

          {/* Sección de disponible y fechas */}
          <BalanceSection>
            <SectionTitle>Disponible</SectionTitle>
            <BalanceValue>{oculto ? "****" : `$${disponible}`}</BalanceValue>
            <Divider />
            <SectionTitle>Fechas Importantes</SectionTitle>
            <DateInfo>
              <DateLabel>Corte:</DateLabel>
              <DateValue>{fechaCorte}</DateValue>
            </DateInfo>
            <DateInfo>
              <DateLabel>Pago:</DateLabel>
              <DateValue>{fechaPago}</DateValue>
            </DateInfo>
          </BalanceSection>
        </Row>
        <div className="d-flex justify-content-center mt-3">
          <ButtonEntrar onClick={handleCard}>Entrar</ButtonEntrar>
        </div>
      </CardCredito>
    </Container>
  );
};

// Componente de Monedero
const CardsMonedero = ({
  saldo = "",
  ingreso1 = "", ingreso2 = "", ingreso3 = "",
  gasto1 = "", gasto2 = "", gasto3 = "", oculto,
  nombre = ""
}) => {

const navigate = useNavigate();

const handleCard = () => {
  navigate('/homecard');
};

  return (
    <Container>
      <CardMonedero>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <h1 className="text-center font-weight-bold" style={{ color: "#D9632A", fontSize: "18px", marginRight: '10px' }}>
            MONEDERO - {nombre}
          </h1>
        </div>
        <Row>
          {/* Monedero con estilo iOS */}
          <MonederoStyled>
            <WalletIcon>
              <Wallet size={48} color="white" />
            </WalletIcon>
            <MonederoLabel>Efectivo Disponible</MonederoLabel>
          </MonederoStyled>

          {/* Sección de transacciones */}
          <TransactionsSection>
            <SectionTitle>Últimos Ingresos</SectionTitle>
            <ValuesRow>
              <Value type="income">{oculto ? "****" : `$${ingreso1}`}</Value>
              <Value type="income">{oculto ? "****" : `$${ingreso2}`}</Value>
              <Value type="income">{oculto ? "****" : `$${ingreso3}`}</Value>
            </ValuesRow>
            
            <Divider />
            
            <SectionTitle>Últimos Gastos</SectionTitle>
            <ValuesRow noMargin>
              <Value type="expense">{oculto ? "****" : `$${gasto1}`}</Value>
              <Value type="expense">{oculto ? "****" : `$${gasto2}`}</Value>
              <Value type="expense">{oculto ? "****" : `$${gasto3}`}</Value>
            </ValuesRow>
          </TransactionsSection>

          {/* Sección de saldo */}
          <BalanceSection>
            <SectionTitle>Efectivo Total</SectionTitle>
            <BalanceValue>{oculto ? "****" : `$${saldo}`}</BalanceValue>
          </BalanceSection>
        </Row>
        <div className="d-flex justify-content-center mt-3">
          <ButtonEntrar onClick={handleCard}>Entrar</ButtonEntrar>
        </div>
      </CardMonedero>

    </Container>
  );
};

// Componente de Tarjeta de Débito
const CardsDebit = ({
    saldo = "", 
    limite = "",
    gasto1 = "", gasto2 = "", gasto3 = "",
    ingreso1 = "", ingreso2 = "", ingreso3 = "", oculto,
    nombre = ""
}) => {

const navigate = useNavigate();

const handleCard = () => {
  navigate('/homecard');
};

  return (
      <Container>
        <CardDebito>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <h1 className="text-center font-weight-bold" style={{ color: "#D9632A", fontSize: "18px", marginRight: '10px' }}>
            DÉBITO - {nombre}
          </h1>
        </div>
          <Row>
            {/* Tarjeta de débito con estilo iOS */}
            <DebitCardStyled>
              <CardNumber>**** **** **** 4321</CardNumber>
              <CardLogo>VISA</CardLogo>
            </DebitCardStyled>
  
            {/* Sección de transacciones */}
            <TransactionsSection>
              <SectionTitle>Últimos Ingresos</SectionTitle>
              <ValuesRow>
                <Value type="income">{oculto ? "****" : `$${ingreso1}`}</Value>
                <Value type="income">{oculto ? "****" : `$${ingreso2}`}</Value>
                <Value type="income">{oculto ? "****" : `$${ingreso3}`}</Value>
              </ValuesRow>
              
              <Divider />
              
              <SectionTitle>Últimos Gastos</SectionTitle>
              <ValuesRow noMargin>
                <Value type="expense">{oculto ? "****" : `$${gasto1}`}</Value>
                <Value type="expense">{oculto ? "****" : `$${gasto2}`}</Value>
                <Value type="expense">{oculto ? "****" : `$${gasto3}`}</Value>
              </ValuesRow>
            </TransactionsSection>
  
            {/* Sección de saldo y límite */}
            <BalanceSection>
              <SectionTitle>Saldo Disponible</SectionTitle>
              <BalanceValue debit>{oculto ? "****" : `$${saldo}`}</BalanceValue>
              <Divider />
              <SectionTitle>Límite Diario</SectionTitle>
              <DateInfo>
                <DateLabel>Retiro:</DateLabel>
                <DateValue>${limite}</DateValue>
              </DateInfo>
            </BalanceSection>
          </Row>
          <div className="d-flex justify-content-center mt-3">
            <ButtonEntrar onClick={handleCard}>Entrar</ButtonEntrar>
          </div>
        </CardDebito>

      </Container>
    );
  };


export { CardsCredit, CardsMonedero, CardsDebit };

// Aquí están los estilos compartidos y específicos

// Tema de colores con naranja como primario
const theme = {
    primary: "#FF9500", // Naranja iOS
    primaryDark: "#FF7601",
    primaryLight: "#FFB340",
    background: "#F2F2F7", // Fondo gris claro típico de iOS
    card: "#FFFFFF",
    text: "#000000",
    textSecondary: "#8A8A8E",
    border: "#E5E5EA",
    success: "#34C759", // Verde iOS para ingresos
    danger: "#FF3B30",   // Rojo iOS para gastos
    creditPrimary: "#D40D12", // Rojo para tarjetas de crédito
    creditDark: "#B00000",
    monederoPrimary: "#5B8E22", // Verde para monedero/efectivo
    monederoDark: "#4A7A19",
    debitPrimary: "#007AFF", // Azul iOS para débito
    debitDark: "#0062CC"
  };
  
  // Contenedor principal (ya existente en tu código)
  const Container = styled.div`
    padding: 16px;
    width: 100%;
    margin: 20px auto;
  `;


  // Tarjeta de débito estilizada
  const CardDebito = styled.div`
  background-color: ${theme.card};
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  padding: 24px;
  border-top: 3px solid ${theme.debitPrimary};
  `;
  
  
  // Tarjetas con estilo iOS (bordes redondeados, sombra sutil)
  const CardCredito = styled.div`
    background-color: ${theme.card};
    border-radius: 16px;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
    padding: 24px;
    border-top: 3px solid ${theme.creditPrimary};
  `;
  
  const CardMonedero = styled.div`
    background-color: ${theme.card};
    border-radius: 16px;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
    padding: 24px;
    border-top: 3px solid ${theme.monederoPrimary};
  `;
  
  // Diseño de fila flexible (ya existente en tu código)
  const Row = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    align-items: center;
  `;

  // Tarjeta estilizada específica para débito
  const DebitCardStyled = styled.div`
    background: linear-gradient(135deg, ${theme.debitPrimary} 0%, ${theme.debitDark} 100%);
    border-radius: 12px;
    color: white;
    height: 180px;
    width: 280px;
    position: relative;
    padding: 20px;
    box-shadow: 0 8px 16px rgba(0, 122, 255, 0.2);
    
    /* Simulación de chip de tarjeta */
    &::before {
      content: "";
      position: absolute;
      top: 65px;
      left: 25px;
      width: 40px;
      height: 30px;
      background-color: rgba(255, 255, 255, 0.4);
      border-radius: 6px;
    }
  `;
  
  // Tarjeta estilizada - ahora puede ser de crédito o monedero
  const CreditCardStyled = styled.div`
    background: ${props => props.creditCard 
      ? `linear-gradient(135deg, ${theme.creditPrimary} 0%, ${theme.creditDark} 100%)`
      : `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primaryDark} 100%)`
    };
    border-radius: 12px;
    color: white;
    height: 180px;
    width: 280px;
    position: relative;
    padding: 20px;
    box-shadow: ${props => props.creditCard 
      ? '0 8px 16px rgba(212, 13, 18, 0.2)'
      : '0 8px 16px rgba(255, 149, 0, 0.2)'
    };
    
    /* Simulación de chip de tarjeta */
    &::before {
      content: "";
      position: absolute;
      top: 65px;
      left: 25px;
      width: 40px;
      height: 30px;
      background-color: rgba(255, 255, 255, 0.4);
      border-radius: 6px;
    }
  `;
  
  // Monedero estilizado
  const MonederoStyled = styled.div`
    background: linear-gradient(135deg, ${theme.monederoPrimary} 0%, ${theme.monederoDark} 100%);
    border-radius: 12px;
    color: white;
    height: 180px;
    width: 280px;
    position: relative;
    padding: 20px;
    box-shadow: 0 8px 16px rgba(91, 142, 34, 0.2);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `;
  
  const WalletIcon = styled.div`
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
  `;
  
  const MonederoLabel = styled.div`
    font-size: 18px;
    font-weight: 500;
    text-align: center;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  `;
  
  // Número de tarjeta (ya existente en tu código)
  const CardNumber = styled.div`
    font-size: 18px;
    letter-spacing: 2px;
    margin-top: 70px;
    font-weight: 500;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  `;
  
  // Logo de tarjeta (ya existente en tu código)
  const CardLogo = styled.div`
    position: absolute;
    bottom: 20px;
    right: 20px;
    font-weight: bold;
    font-size: 24px;
    font-style: italic;
    letter-spacing: 1px;
  `;
  
  // Sección de transacciones (ya existente en tu código)
  const TransactionsSection = styled.div`
    background-color: ${theme.background};
    border-radius: 12px;
    padding: 20px;
    flex: 1;
    min-width: 260px;
  `;
  
  // Título de sección (ya existente en tu código)
  const SectionTitle = styled.h6`
    color: ${theme.textSecondary};
    font-size: 13px;
    font-weight: 600;
    margin-bottom: 12px;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  `;
  
  // Fila de valores (ya existente en tu código)
  const ValuesRow = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: ${props => props.noMargin ? "0" : "16px"};
  `;
  
  // Valor con formato específico (ingresos o gastos) (ya existente en tu código, ampliado)
  const Value = styled.span`
    font-weight: 600;
    font-size: 15px;
    color: ${props => {
      if (props.type === "income") return theme.success;
      if (props.type === "expense") return theme.danger;
      if (props.type === "credit") return theme.creditPrimary;
      return theme.text;
    }};
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  `;
  
  // Divisor estilo iOS (ya existente en tu código)
  const Divider = styled.hr`
    border: none;
    height: 1px;
    background-color: ${theme.border};
    margin: 16px 0;
  `;
  
  // Sección de saldo (ya existente en tu código)
  const BalanceSection = styled.div`
    text-align: center;
    padding: 20px;
    background-color: ${theme.background};
    border-radius: 12px;
    min-width: 160px;
  `;
  
  // Valor del saldo (ya existente en tu código, modificado para crédito)
  const BalanceValue = styled.div`
    font-size: 24px;
    font-weight: 700;
    color: ${props => props.credit ? theme.creditPrimary : 
           props => props.cash ? theme.monederoPrimary : theme.primary};
    margin-top: 8px;
    margin-bottom: 8px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  `;
  
  // Botón de creación (ya existente en tu código, modificado)
  const CreateButton = styled.button`
    background: #D9632A;
    color: white;
    padding: 10px;
    width: 80%;
    border: none;
    border-radius: 15px;
    font-weight: 600;
    cursor: pointer;
    margin: 15px auto;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    
    &:hover {
      background: #F78839;
    }
  `;
  
  // Para la información de fechas
  const DateInfo = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    margin-bottom: 4px;
  `;
  
  const DateLabel = styled.span`
    color: ${theme.textSecondary};
    font-weight: 500;
  `;
  
  const DateValue = styled.span`
    font-weight: 600;
  `;

  const ButtonEntrar = styled.button`
  background-color: rgba(255, 149, 0, 0.1); /* Naranja iOS con transparencia */
  border: none;
  border-radius: 12px; /* Bordes más redondeados, estilo iOS moderno */
  padding: 12px 20px; /* Padding más generoso */
  cursor: pointer;
  font-weight: 500; /* Semi-bold para texto iOS */
  box-shadow: none; /* iOS moderno usa menos sombras */
  transition: all 0.2s ease; /* Transición ligeramente más rápida */
  color: #ff9500; /* Naranja iOS estándar para el texto */
  font-size: 17px; /* Tamaño de fuente estándar iOS */
  font-family: -apple-system, BlinkMacSystemFont, 'San Francisco', 'Helvetica Neue', sans-serif; /* Fuentes iOS */
  
  /* Estado de hover */
  &:hover {
    background-color: rgba(255, 149, 0, 0.15);
  }
  
  /* Estado activo al hacer clic */
  &:active {
    background-color: rgba(255, 149, 0, 0.2);
    transform: scale(0.98); /* Efecto sutil de presión */
  }
  
  /* Quitar el outline al hacer focus para mantener el estilo iOS */
  &:focus {
    outline: none;
  }
`;