import React, { useState } from 'react';
import styled from 'styled-components';

function CalendarioView() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [currentMonth, setCurrentMonth] = useState(new Date());
  
    // Obtener el nombre del mes
    const monthNames = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
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
        const isSelected = selectedDate.getDate() === i && selectedDate.getMonth() === month && selectedDate.getFullYear() === year;
        const isToday = new Date().getDate() === i && new Date().getMonth() === month && new Date().getFullYear() === year;
  
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
    <CalendarContainer>
      <Header>
        <MonthNavButton onClick={() => changeMonth(-1)}>&lt;</MonthNavButton>
        <MonthTitle>
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
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
  );
}

export default CalendarioView;

// Estilos con styled-components
const CalendarContainer = styled.div`
  width: 100%;
  max-width: 400px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
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
`;

const MonthNavButton = styled.button`
  background: none;
  border: none;
  color: #e86833;
  font-size: 18px;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
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
`;

const Day = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  border-radius: 50%;
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