import React, { useState } from "react";
import styled from "styled-components";
import { CardsCredit, CardsMonedero, CardsDebit } from "../better/Cardsprueba";

const CardsInter = () => {
  const [filter, setFilter] = useState("all"); // "all", "debit", "credit", "monedero"
  const [search, setSearch] = useState("");

  // Datos de las tarjetas
  const cards = [
    { type: "debit", component: CardsDebit, saldo: "2,500.00", limite: "8,000.00", ingreso1: "1,200.00", ingreso2: "800.00", ingreso3: "500.00", gasto1: "350.00", gasto2: "125.00", gasto3: "75.00" },
    { type: "credit", component: CardsCredit, disponible: "25,000", limite: "50,000", gasto1: "2,500", gasto2: "1,800", gasto3: "3,200", fechaCorte: "20/04/2025", fechaPago: "05/05/2025" },
    { type: "monedero", component: CardsMonedero, saldo: "5,650", ingreso1: "2,000", ingreso2: "1,500", ingreso3: "3,000", gasto1: "500", gasto2: "350", gasto3: "700" }
  ];

  // Filtrar tarjetas según el tipo y la búsqueda
  const filteredCards = cards.filter(card => {
    const matchesFilter = filter === "all" || card.type === filter;
    const matchesSearch = Object.values(card).some(value => 
      typeof value === "string" && value.includes(search)
    );
    return matchesFilter && matchesSearch;
  });

  return (
    <Container>
      {/* Filtro */}
      <FilterContainer>
            <FilterButton active={filter === "all"} onClick={() => setFilter("all")}>Todos</FilterButton>
            <FilterButton active={filter === "debit"} onClick={() => setFilter("debit")}>Débito</FilterButton>
            <FilterButton active={filter === "credit"} onClick={() => setFilter("credit")}>Crédito</FilterButton>
            <FilterButton active={filter === "monedero"} onClick={() => setFilter("monedero")}>Monedero</FilterButton>
      </FilterContainer>
      
      {/* Barra de búsqueda */}
      <SearchInput
        type="text"
        placeholder="Buscar..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Botón de añadir */}
      <CreateButton>Añadir</CreateButton>

      {/* Renderizar tarjetas filtradas */}
      {filteredCards.map((card, index) => {
        const CardComponent = card.component;
        return <CardComponent key={index} {...card} />;
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
  /* Media query para pantallas más pequeñas (por ejemplo, móviles) */
  @media (max-width: 768px) {
    flex-direction: column; /* Cambia la dirección a columna */
    gap: 5px; /* Reduce el espacio entre los elementos */
  }

  /* Media query para pantallas aún más pequeñas (por ejemplo, móviles pequeños) */
  @media (max-width: 480px) {
    flex-direction: column; /* Asegura que la dirección sea columna */
    gap: 5px; /* Mantiene el espacio reducido */
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


const CreateButton = styled.button`
  background: #D9632A;
  color: white;
  padding: 10px;
  width: 30%;
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
