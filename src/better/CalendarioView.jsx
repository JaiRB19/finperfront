import React, { useState } from 'react';
import styled from 'styled-components';

function CalendarioView() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [currentMonth, setCurrentMonth] = useState(new Date());
  
    // Obtener el nombre del mes
    const monthNames = [
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 
      'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];
  
    // Generar los días del mes
    const generateDays = () => {
      const year = currentMonth.getFullYear();
      const month = currentMonth.getMonth();
      const firstDayOfMonth = new Date(year, month, 1).getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const days = [];
  
      // Días vacíos al inicio del mes
      for (let i = 0; i < firstDayOfMonth; i++) {
        days.push(<Day key={`empty-${i}`} empty />);
      }
  
      // Días del mes
      for (let i = 1; i <= daysInMonth; i++) {
        const isSelected = selectedDate.getDate() === i && 
                           selectedDate.getMonth() === month && 
                           selectedDate.getFullYear() === year;
        const isToday = new Date().getDate() === i && 
                        new Date().getMonth() === month && 
                        new Date().getFullYear() === year;
  
        days.push(
          <Day
            key={i}
            selected={isSelected}
            today={isToday}
            onClick={() => setSelectedDate(new Date(year, month, i))}
          >
            {i}
          </Day>
        );
      }
  
      return days;
    };
  
    // Cambiar al mes anterior o siguiente
    const changeMonth = (direction) => {
      const newMonth = new Date(currentMonth);
      newMonth.setMonth(currentMonth.getMonth() + direction);
      setCurrentMonth(newMonth);
    };

  return (
    <PageContainer>
      <CalendarContainer>
        <Header>
          <MonthNavButton onClick={() => changeMonth(-1)}>&lt;</MonthNavButton>
          <MonthTitle>
            {monthNames[currentMonth.getMonth()]} de {currentMonth.getFullYear()}
          </MonthTitle>
          <MonthNavButton onClick={() => changeMonth(1)}>&gt;</MonthNavButton>
        </Header>

        <Weekdays>
          {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map((day) => (
            <Weekday key={day}>{day}</Weekday>
          ))}
        </Weekdays>

        <DaysGrid>{generateDays()}</DaysGrid>
      </CalendarContainer>

      <SidePanel>
        <Card>
          <CardHeader>
            <CardTitle>Añadir Evento</CardTitle>
          </CardHeader>
          <CardContent>
            <EventTitle>No hay eventos para este día</EventTitle>
            <AddEventButton>+ Añadir Evento</AddEventButton>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Próximos Eventos</CardTitle>
          </CardHeader>
          <CardContent>
            <NoEventsText>No hay eventos próximos</NoEventsText>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resumen Mensual</CardTitle>
          </CardHeader>
          <CardContent>
            <SummaryItem positive>
              <span>Ingresos</span>
              <span>+$30,000</span>
            </SummaryItem>
            <SummaryItem negative>
              <span>Gastos</span>
              <span>-$13,500</span>
            </SummaryItem>
            <SummaryItem balance>
              <span>Balance</span>
              <span>+$16,500</span>
            </SummaryItem>
          </CardContent>
        </Card>
      </SidePanel>
    </PageContainer>
  );
}

export default CalendarioView;

// Styled Components
const PageContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  gap: 30px;
  padding: 20px;
`;

const CalendarContainer = styled.div`
  flex: 1;
  min-width: 500px;
  height: 550px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const SidePanel = styled.div`
  width: 350px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Card = styled.div`
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const CardHeader = styled.div`
  padding: 15px 20px;
  background-color: #f8f8f8;
  border-bottom: 1px solid #f0f0f0;
`;

const CardTitle = styled.h3`
  margin: 0;
  font-size: 16px;
  color: #1c1c1e;
  font-weight: 600;
`;

const CardContent = styled.div`
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const MonthTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #e86833;
  margin: 0;
  text-transform: capitalize;
`;

const MonthNavButton = styled.button`
  background: none;
  border: none;
  color: #e86833;
  font-size: 18px;
  cursor: pointer;
  padding: 8px;
  border-radius: 85%;
  transition: background 0.2s ease;

  &:hover {
    background: #ffe0b2;
  }
`;

const Weekdays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
  margin-bottom: 12px;
`;

const Weekday = styled.div`
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  color: #8e8e93;
`;

const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
  flex-grow: 1;
`;

const Day = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
    border-radius: 10px; /* Redondeamos las esquinas */
  font-size: 16px;
  font-weight: ${(props) => (props.today || props.selected ? '600' : '400')};
  background-color: ${(props) => {
    if (props.selected) return '#e86833';
    if (props.today) return '#ffe0b2';
    return 'transparent';
  }};
  color: ${(props) => {
    if (props.selected) return '#ffffff';
    if (props.today) return '#e86833';
    return '#1c1c1e';
  }};
  cursor: ${(props) => (props.empty ? 'default' : 'pointer')};
  transition: all 0.2s ease;

  &:hover {
    background-color: ${(props) => (props.empty ? 'transparent' : '#fff3e0')};
  }
`;

const EventTitle = styled.p`
  color: #8e8e93;
  margin-bottom: 15px;
  text-align: center;
`;

const AddEventButton = styled.button`
  background-color: #e86833;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  margin-top: auto;
  align-self: center;

  &:hover {
    background-color: #d45a22;
  }
`;

const NoEventsText = styled.p`
  color: #8e8e93;
  text-align: center;
  margin: auto 0;
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 8px 0;
  color: ${props => 
    props.positive ? '#2e7d32' : 
    props.negative ? '#c62828' : 
    props.balance ? '#e86833' : '#1c1c1e'
  };
  font-weight: ${props => props.balance ? '600' : '400'};
`;