import React, { useState } from "react";
import { Eye, EyeClosed } from 'lucide-react';
import styled from "styled-components";
import { CardsCredit, CardsMonedero, CardsDebit } from "./TarjetasComplementos";

const CardsInter = ({ changeComponent }) => {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [oculto, setOculto] = useState(false);

  const toggleOcultar = () => setOculto(!oculto);

  const cards = [
    { type: "debit", component: CardsDebit, saldo: "2500.00", limite: "8000.00", ingreso1: "1200.00", ingreso2: "800.00", ingreso3: "500.00", gasto1: "350.00", gasto2: "125.00", gasto3: "75.00" },
    { type: "credit", component: CardsCredit, disponible: "25000", limite: "50000", gasto1: "2500", gasto2: "1800", gasto3: "3200", fechaCorte: "20/04/2025", fechaPago: "05/05/2025" },
    { type: "monedero", component: CardsMonedero, saldo: "5650", ingreso1: "2000", ingreso2: "1500", ingreso3: "3000", gasto1: "500", gasto2: "350", gasto3: "700" }
    
  ];

  const filteredCards = cards.filter(card =>
    (filter === "all" || card.type === filter) &&
    Object.values(card).some(value => typeof value === "string" && value.includes(search))
  );

  // Llama a la función changeComponent pasando el nombre del componente al que quieres cambiar
  const handleClick = () => {
    changeComponent("syncfy");
  };

  return (
    <Container>
      
      <FilterContainer>
        <FilterButton active={filter === "all"} onClick={() => setFilter("all")}>Todos</FilterButton>
        <FilterButton active={filter === "debit"} onClick={() => setFilter("debit")}>Débito</FilterButton>
        <FilterButton active={filter === "credit"} onClick={() => setFilter("credit")}>Crédito</FilterButton>
        <FilterButton active={filter === "monedero"} onClick={() => setFilter("monedero")}>Monedero</FilterButton>
      </FilterContainer>

      <SearchInput
        type="text"
        placeholder="Buscar..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <ButtonRow>
        <CreateButton onClick={handleClick}>Añadir</CreateButton>
        <EyeButton onClick={toggleOcultar}>
          {oculto ? <EyeClosed size={24} /> : <Eye size={24} />}
          <span>{oculto ? 'Mostrar' : 'Ocultar'}</span>
        </EyeButton>
      </ButtonRow>




      {filteredCards.map((card, index) => {
        
        const CardComponent = card.component;
        return <CardComponent key={index} {...card} oculto={oculto} />;
      })}
    </Container>
  );
};

export default CardsInter;

// Estilos
const Container = styled.div`
  padding: 16px;
  width: 100%;
  margin: 20px auto;
`;


const FilterContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 5px;
  }
`;

const FilterButton = styled.button`
  background: ${(props) => (props.active ? "#FF9500" : "#FFF")};
  color: ${(props) => (props.active ? "white" : "#FF9500")};
  border: 1px solid #FF9500;
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: #FFB340;
    color: white;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #E5E5EA;
  border-radius: 15px;
  font-size: 16px;
  margin-bottom: 15px;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-start; /* Alinea los elementos al inicio */
  align-items: center;
  margin-bottom: 15px;
  gap: 15px;
`;

const CreateButton = styled.button`
  background: #D9632A;
  color: white;
  padding: 10px;
  width: 30%;
  border: none;
  border-radius: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s;


  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #F78839;
  }
`;

const EyeButton = styled.button`
  background: rgba(224, 217, 217, 0.8);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  padding: 8px 12px; /* Aumenta el padding para el texto */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
  display: flex; /* Agrega flexbox para alinear icono y texto */
  align-items: center; /* Alinea verticalmente */
  gap: 8px; /* Espacio entre icono y texto */
  transition: 0.3s;

  &:hover {
    background:rgb(233, 225, 220);
  }

  &:active {
    background:rgb(230, 219, 212);
  }
`;
