import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Calendar, ArrowDown, ArrowUp, Filter, ChevronDown } from "lucide-react";
import api from "../components/axios";

export default function UltimosMovimientosView() {
  const [movements, setMovements] = useState([]);
  const [typeFilter, setTypeFilter] = useState("all");     // "all" | "Ingreso" | "Gasto"
  const [periodFilter, setPeriodFilter] = useState("month");
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [showPeriodDropdown, setShowPeriodDropdown] = useState(false);

  // 1) Traer transacciones
  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("auth_token");
        const { data } = await api.get("/api/transactions", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMovements(data.data);
      } catch (err) {
        console.error("Error cargando movimientos:", err);
      }
    })();
  }, []);

  const formatDate = (dateString) => {
    const d = new Date(dateString);
    return d.toLocaleDateString("es-MX", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });
  };

  // 2) Filtrado
  const filteredMovements = movements.filter((mv) => {
    // tipo
    if (typeFilter !== "all" && mv.type !== typeFilter) {
      return false;
    }
    // periodo
    const now = new Date();
    const mDate = new Date(mv.created_at || mv.date);
    if (periodFilter === "day") {
      return (
        mDate.getDate() === now.getDate() &&
        mDate.getMonth() === now.getMonth() &&
        mDate.getFullYear() === now.getFullYear()
      );
    } else if (periodFilter === "month") {
      return (
        mDate.getMonth() === now.getMonth() &&
        mDate.getFullYear() === now.getFullYear()
      );
    }
    return true; // all
  });

  return (
    <Card minWidth="500px" flex={2}>
      <CardHeader>
        <CardTitle>Últimos Movimientos</CardTitle>
        <FilterContainer>
          {/* Period Filter */}
          <FilterGroup>
            <FilterButton
              active={showPeriodDropdown}
              onClick={() => {
                setShowPeriodDropdown(!showPeriodDropdown);
                setShowTypeDropdown(false);
              }}
            >
              <FilterIcon><Calendar size={14} /></FilterIcon>
              {periodFilter === "day" ? "Hoy"
               : periodFilter === "month" ? "Este Mes"
               : "Todos"}
              <FilterIcon><ChevronDown size={12} /></FilterIcon>
            </FilterButton>
            {showPeriodDropdown && (
              <FilterDropdown>
                <FilterOption
                  active={periodFilter === "day"}
                  onClick={() => {
                    setPeriodFilter("day");
                    setShowPeriodDropdown(false);
                  }}
                >Hoy</FilterOption>
                <FilterOption
                  active={periodFilter === "month"}
                  onClick={() => {
                    setPeriodFilter("month");
                    setShowPeriodDropdown(false);
                  }}
                >Este Mes</FilterOption>
                <FilterOption
                  active={periodFilter === "all"}
                  onClick={() => {
                    setPeriodFilter("all");
                    setShowPeriodDropdown(false);
                  }}
                >Todos</FilterOption>
              </FilterDropdown>
            )}
          </FilterGroup>

          {/* Type Filter */}
          <FilterGroup>
            <FilterButton
              active={showTypeDropdown}
              onClick={() => {
                setShowTypeDropdown(!showTypeDropdown);
                setShowPeriodDropdown(false);
              }}
            >
              <FilterIcon><Filter size={14} /></FilterIcon>
              {typeFilter === "Gasto" ? "Gastos"
               : typeFilter === "Ingreso" ? "Ingresos"
               : "Todos"}
              <FilterIcon><ChevronDown size={12} /></FilterIcon>
            </FilterButton>
            {showTypeDropdown && (
              <FilterDropdown>
                <FilterOption
                  active={typeFilter === "all"}
                  onClick={() => {
                    setTypeFilter("all");
                    setShowTypeDropdown(false);
                  }}
                >Todos</FilterOption>
                <FilterOption
                  active={typeFilter === "Gasto"}
                  onClick={() => {
                    setTypeFilter("Gasto");
                    setShowTypeDropdown(false);
                  }}
                >Gastos</FilterOption>
                <FilterOption
                  active={typeFilter === "Ingreso"}
                  onClick={() => {
                    setTypeFilter("Ingreso");
                    setShowTypeDropdown(false);
                  }}
                >Ingresos</FilterOption>
              </FilterDropdown>
            )}
          </FilterGroup>
        </FilterContainer>
      </CardHeader>

      <MovementsList>
        {filteredMovements.length > 0 ? (
          filteredMovements.map((mv) => (
            <MovementItem key={mv.id} type={mv.type === "Gasto" ? "expense" : "income"}>
              <MovementHeader>
                <MovementTitle>
                  <FilterIcon>
                    {mv.type === "Gasto" ? (
                      <ArrowDown size={16} color="#dc3545" />
                    ) : (
                      <ArrowUp size={16} color="#28a745" />
                    )}
                  </FilterIcon>
                  <MovementText>{mv.note || mv.category?.name}</MovementText>
                </MovementTitle>
                <MovementAmount
                  danger={mv.type === "Gasto"}
                  success={mv.type === "Ingreso"}
                >
                  {mv.type === "Gasto" ? "-" : "+"}
                  {parseFloat(mv.amount).toLocaleString()} MXN
                </MovementAmount>
              </MovementHeader>
              <MovementDetails>
                <Calendar size={12} style={{ marginRight: "4px" }} />
                {formatDate(mv.created_at || mv.date)} • {mv.note || ""}
              </MovementDetails>
            </MovementItem>
          ))
        ) : (
          <NoMovements>
            No hay movimientos para el filtro seleccionado
          </NoMovements>
        )}
      </MovementsList>
    </Card>
  );
}

const colors = {
  primary: "#FF9500", // iOS orange
  primaryLight: "#FFF0DD", // Light orange background
  danger: "#FF3B30", // iOS red
  dangerLight: "#FFF0F0", // Light red background
  success: "#34C759", // iOS green
  successLight: "#F0FFF5", // Light green background
  cardBg: "#FFFFFF",
  text: "#000000",
  textSecondary: "#8E8E93", // iOS gray
  border: "#E5E5EA", // iOS light gray for borders
  itemBg: "#F9F9FB", // Light background for items
};

const Card = styled.div`
  background-color: ${colors.cardBg};
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  min-width: ${props => props.minWidth || '0'};
  flex: ${props => props.flex || 1};
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const CardTitle = styled.h5`
  font-size: 17px;
  font-weight: 600;
  margin: 0;
  color: ${colors.text};
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const FilterGroup = styled.div`
  position: relative;
`;

const FilterButton = styled.button`
  background-color: ${colors.background};
  border: none;
  border-radius: 8px;
  padding: 6px 12px;
  font-size: 13px;
  color: ${colors.text};
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: ${colors.border};
  }
  
  &:active {
    transform: translateY(1px);
  }
  
  ${props => props.active && `
    background-color: ${colors.primaryLight};
    color: ${colors.primary};
    font-weight: 500;
  `}
`;

const FilterIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FilterDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: ${colors.cardBg};
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 8px;
  margin-top: 4px;
  z-index: 10;
  min-width: 120px;
`;

const FilterOption = styled.div`
  padding: 8px 12px;
  font-size: 14px;
  color: ${colors.text};
  border-radius: 8px;
  cursor: pointer;
  
  &:hover {
    background-color: ${colors.background};
  }
  
  ${props => props.active && `
    background-color: ${colors.primaryLight};
    color: ${colors.primary};
    font-weight: 500;
  `}
`;

const MovementsList = styled.div`
  overflow-y: auto;
  max-height: 220px;
  padding: 8px 4px;
  
  /* iOS-style scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 20px;
  }
`;

const MovementItem = styled.div`
  background-color: ${props => props.type === 'expense' ? colors.dangerLight : props.type === 'income' ? colors.successLight : colors.itemBg};
  padding: 16px;
  border-radius: 12px;
  margin-bottom: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
`;

const MovementHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
`;

const MovementTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const MovementText = styled.span`
  font-size: 15px;
  font-weight: 500;
  color: ${colors.text};
`;

const MovementAmount = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: ${props => props.danger ? colors.danger : props.success ? colors.success : colors.text};
`;

const MovementDetails = styled.div`
  display: flex;
  align-items: center;
  font-size: 13px;
  color: ${colors.textSecondary};
`;

const NoMovements = styled.div`
  padding: 20px;
  text-align: center;
  color: ${colors.textSecondary};
  font-style: italic;
`;