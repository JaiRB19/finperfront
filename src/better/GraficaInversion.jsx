import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import { 
  TrendingUp, 
  DollarSign, 
  Calendar, 
  RefreshCw, 
  Info, 
  Download 
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const GraficaInversion = () => {
  const [activeTab, setActiveTab] = useState("simple");

  // Parámetros de inversión
  const [initialAmount, setInitialAmount] = useState(10000);
  const [monthlyContribution, setMonthlyContribution] = useState(1000);
  const [interestRate, setInterestRate] = useState(8);
  const [years, setYears] = useState(10);
  const [investmentType, setInvestmentType] = useState("moderate");

  // Resultados calculados
  const results = useMemo(() => calculateInvestment(), [initialAmount, monthlyContribution, interestRate, years, activeTab]);

  // Tipos de inversión predefinidos
  const investmentTypes = {
    conservative: { name: "Conservador", rate: 4 },
    moderate: { name: "Moderado", rate: 8 },
    aggressive: { name: "Agresivo", rate: 12 },
  };

  // Cambiar tasa de interés cuando cambie el tipo de inversión
  useEffect(() => {
    if (investmentType && investmentTypes[investmentType]) {
      setInterestRate(investmentTypes[investmentType].rate);
    }
  }, [investmentType]);

  // Función para calcular la inversión
  function calculateInvestment() {
    let balance = initialAmount;
    let totalContributions = initialAmount;
    const yearlyData = [];
    const monthlyRate = interestRate / 100 / 12;
    const totalMonths = years * 12;

    if (activeTab === "simple") {
      for (let year = 1; year <= years; year++) {
        const yearInterest = balance * (interestRate / 100);
        balance += yearInterest;
        for (let month = 1; month <= 12; month++) {
          balance += monthlyContribution;
          totalContributions += monthlyContribution;
        }
        yearlyData.push({
          year,
          balance: Math.round(balance),
          contributions: Math.round(totalContributions),
          interest: Math.round(balance - totalContributions),
        });
      }
    } else {
      for (let month = 1; month <= totalMonths; month++) {
        const monthlyInterest = balance * monthlyRate;
        balance += monthlyInterest;
        balance += monthlyContribution;
        totalContributions += monthlyContribution;
        if (month % 12 === 0) {
          const year = month / 12;
          yearlyData.push({
            year,
            balance: Math.round(balance),
            contributions: Math.round(totalContributions),
            interest: Math.round(balance - totalContributions),
          });
        }
      }
    }

    return {
      finalBalance: Math.round(balance),
      totalContributions: Math.round(totalContributions),
      totalInterest: Math.round(balance - totalContributions),
      yearlyData,
    };
  }

  // Formatear números como moneda
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Función para exportar datos a CSV
  const exportCSV = () => {
    const csvContent = [
      ["Año", "Balance", "Aportaciones", "Interés"].join(","),
      ...results.yearlyData.map(data => [data.year, data.balance, data.contributions, data.interest].join(","))
    ].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "inversiones.csv";
    link.click();
  };

  return (
    <Container>
      <Title>Simulador de Inversiones</Title>

      <Card>
        <Button onClick={exportCSV}>
          <Download size={16} /> Exportar CSV
        </Button>
      </Card>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={results.yearlyData}>
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="balance" stroke="#8884d8" />
          <Line type="monotone" dataKey="contributions" stroke="#82ca9d" />
          <Line type="monotone" dataKey="interest" stroke="#d9534f" />
        </LineChart>
      </ResponsiveContainer>
    </Container>
  );
};

export default GraficaInversion;


 // Definición de temas
const lightTheme = {
  primary: "#D9632A",
  primaryLight: "#F78839",
  background: "white",
  backgroundSecondary: "#f8f9fa",
  backgroundTertiary: "#f3f4f6",
  text: "#1f2937",
  textSecondary: "#6B7280",
  textTertiary: "#9CA3AF",
  border: "#E5E7EB",
  green: "#4CAF50",
  greenLight: "#e6f5e6",
  greenText: "#2E7D32",
  blue: "#2196F3",
  blueLight: "#e6f3fa",
  blueText: "#0d47a1",
  red: "#E53935",
  cardShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
  isDark: false
};

const darkTheme = {
  primary: "#F78839",
  primaryLight: "#D9632A",
  background: "#1f2937",
  backgroundSecondary: "#374151",
  backgroundTertiary: "#4b5563",
  text: "#f9fafb",
  textSecondary: "#e5e7eb",
  textTertiary: "#d1d5db",
  border: "#4b5563",
  green: "#4CAF50",
  greenLight: "rgba(76, 175, 80, 0.2)",
  greenText: "#81c784",
  blue: "#2196F3",
  blueLight: "rgba(33, 150, 243, 0.2)",
  blueText: "#90caf9",
  red: "#E53935",
  cardShadow: "0 1px 3px rgba(0, 0, 0, 0.3)",
  isDark: true
};

// Componentes estilizados
const Container = styled.div`
  padding: 1rem 1.5rem;
  width: 100%;
  margin: 0 auto;

  @media (min-width: 768px) {
    padding: 1.5rem;
  }
`;

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.primary};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 2fr;
  }
`;

const Card = styled.div`
  background-color: ${props => props.theme.background};
  border-radius: 1.5rem;
  overflow: hidden;
  box-shadow: ${props => props.theme.cardShadow};
  padding: 1.5rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  color: ${props => props.theme.text};
`;

const IconWrapper = styled.div`
  margin-right: 0.5rem;
  color: ${props => props.theme.primary};
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const FormGroupHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const Label = styled.label`
  color: ${props => props.theme.textSecondary};
  display: block;
  margin-bottom: 0.5rem;
`;

const ValueLabel = styled.span`
  color: ${props => props.theme.primary};
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  height: 3rem;
  background-color: ${props => props.theme.backgroundTertiary};
  border: none;
  border-bottom: 1px solid ${props => props.theme.border};
  border-radius: 0.75rem;
  padding: 0 1rem;
  color: ${props => props.theme.text};
  outline: none;

  &:focus {
    border-bottom-color: ${props => props.theme.primary};
    box-shadow: 0 0 0 1px ${props => props.theme.primary};
  }
`;

const SliderContainer = styled.div`
  margin-top: 0.5rem;
  width: 100%;
`;

const Slider = styled.input.attrs({ type: 'range' })`
  width: 100%;
  height: 5px;
  background: ${props => `linear-gradient(
    to right,
    ${props.theme.primary} 0%,
    ${props.theme.primary} ${props.value / props.max * 100}%,
    ${props.theme.backgroundTertiary} ${props.value / props.max * 100}%,
    ${props.theme.backgroundTertiary} 100%
  )`};
  border-radius: 5px;
  outline: none;
  -webkit-appearance: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: ${props => props.theme.primary};
    cursor: pointer;
  }

  &::-moz-range-thumb {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: ${props => props.theme.primary};
    cursor: pointer;
  }
`;

const TabsContainer = styled.div`
  width: 100%;
  background-color: ${props => props.theme.backgroundTertiary};
  border-radius: 0.5rem;
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const TabButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: ${props => props.active ? props.theme.primary : 'transparent'};
  color: ${props => props.active ? 'white' : props.theme.text};
  border: none;
  cursor: pointer;
  font-weight: ${props => props.active ? '600' : '400'};
  transition: all 0.2s ease;

  &:hover {
    background-color: ${props => props.active ? props.theme.primary : props.theme.backgroundSecondary};
  }
`;

const Select = styled.select`
  width: 100%;
  height: 3rem;
  background-color: ${props => props.theme.backgroundTertiary};
  border: none;
  border-bottom: 1px solid ${props => props.theme.border};
  border-radius: 0.75rem;
  padding: 0 1rem;
  color: ${props => props.theme.text};
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;

  &:focus {
    border-bottom-color: ${props => props.theme.primary};
    box-shadow: 0 0 0 1px ${props => props.theme.primary};
  }
`;

const Option = styled.option`
  padding: 0.5rem;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: ${props => props.variant === 'outline' ? 'transparent' : props.theme.primary};
  color: ${props => props.variant === 'outline' ? props.theme.primary : 'white'};
  border: ${props => props.variant === 'outline' ? `1px solid ${props.theme.border}` : 'none'};
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${props => props.variant === 'outline' ? props.theme.backgroundTertiary : props.theme.primaryLight};
  }
`;

const ResultsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin-bottom: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const ResultCard = styled.div`
  padding: 1rem;
  border-radius: 0.75rem;
  background-color: ${props => {
    if (props.variant === 'primary') return `${props.theme.primary}10`;
    if (props.variant === 'green') return `${props.theme.greenLight}`;
    return props.theme.backgroundTertiary;
  }};
`;

const ResultLabel = styled.p`
  font-size: 0.875rem;
  color: ${props => props.theme.textSecondary};
  margin-bottom: 0.25rem;
`;

const ResultValue = styled.p`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => {
    if (props.variant === 'primary') return props.theme.primary;
    if (props.variant === 'green') return props.theme.greenText;
    return props.theme.text;
  }};
`;

const ChartContainer = styled.div`
  position: relative;
  height: 250px;
  width: 100%;
`;

const TableHeader = styled.div`
  padding: 1rem 1.5rem;
  border-bottom: 1px solid ${props => props.theme.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Table = styled.table`
  width: 100%;
`;

const Th = styled.th`
  padding: 0.75rem 1.5rem;
  text-align: left;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: ${props => props.theme.textSecondary};
  background-color: ${props => props.theme.backgroundTertiary};
`;

const Td = styled.td`
  padding: 1rem 1.5rem;
  white-space: nowrap;
  font-size: 0.875rem;
  color: ${props => props.color ? props.color : props.theme.text};
  background-color: ${props => props.isEven ? props.theme.backgroundTertiary : 'transparent'};
`;

const AlertBox = styled.div`
  background-color: ${props => props.theme.blueLight};
  border-radius: 0.75rem;
  padding: 1rem;
  display: flex;
  align-items: flex-start;
`;

const AlertText = styled.p`
  font-size: 0.875rem;
  color: ${props => props.theme.blueText};
`;