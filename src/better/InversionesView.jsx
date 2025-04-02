import React, { useState, useEffect } from 'react';
import { 
  ArrowUpRight, 
  TrendingUp, 
  PieChart, 
  DollarSign, 
  Clock, 
  Plus,
  Edit,
  Trash2,
  Info,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';



const InversionesView = ({ changeComponentCard }) => {
  // Estados
  const [activeTab, setActiveTab] = useState('mis-inversiones');
  const [showAddForm, setShowAddForm] = useState(false);
  const [investments, setInvestments] = useState([]);
  const [newInvestment, setNewInvestment] = useState({
    name: '',
    type: 'acciones',
    amount: '',
    date: '',
    returnRate: '',
    broker: '',
    notes: ''
  });
  const [expandedInvestment, setExpandedInvestment] = useState(null);
  const [performanceData, setPerformanceData] = useState([]);

  // Datos de ejemplo (en una app real vendrían de una API)
  useEffect(() => {
    const mockInvestments = [
      {
        id: 1,
        name: 'ETF S&P 500',
        type: 'acciones',
        amount: 50000,
        date: '2023-01-15',
        returnRate: 12.5,
        broker: 'GBM',
        notes: 'Inversión a largo plazo',
        currentValue: 56250,
        history: [
          { date: '2023-01-15', value: 50000 },
          { date: '2023-06-15', value: 52500 },
          { date: '2024-01-15', value: 56250 }
        ]
      },
      {
        id: 2,
        name: 'FIBRAS',
        type: 'bienes-raices',
        amount: 30000,
        date: '2023-03-10',
        returnRate: 8.2,
        broker: 'CETES',
        notes: 'Renta mensual',
        currentValue: 32460,
        history: [
          { date: '2023-03-10', value: 30000 },
          { date: '2023-09-10', value: 31200 },
          { date: '2024-03-10', value: 32460 }
        ]
      }
    ];

    const mockPerformance = [
      { month: 'Ene', return: 2.1 },
      { month: 'Feb', return: 1.8 },
      { month: 'Mar', return: 3.2 },
      { month: 'Abr', return: -0.5 },
      { month: 'May', return: 2.7 },
      { month: 'Jun', return: 1.5 }
    ];

    setInvestments(mockInvestments);
    setPerformanceData(mockPerformance);
  }, []);

  // Manejadores
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewInvestment(prev => ({ ...prev, [name]: value }));
  };

  const handleAddInvestment = (e) => {
    e.preventDefault();
    const newId = investments.length > 0 ? Math.max(...investments.map(i => i.id)) + 1 : 1;
    
    const investmentToAdd = {
      ...newInvestment,
      id: newId,
      amount: parseFloat(newInvestment.amount),
      returnRate: parseFloat(newInvestment.returnRate),
      currentValue: parseFloat(newInvestment.amount) * (1 + parseFloat(newInvestment.returnRate)/100),
      history: [{ 
        date: new Date().toISOString().split('T')[0], 
        value: parseFloat(newInvestment.amount) 
      }]
    };
    
    setInvestments([...investments, investmentToAdd]);
    setNewInvestment({
      name: '',
      type: 'acciones',
      amount: '',
      date: '',
      returnRate: '',
      broker: '',
      notes: ''
    });
    setShowAddForm(false);
  };

  const handleDeleteInvestment = (id) => {
    setInvestments(investments.filter(inv => inv.id !== id));
  };

  const toggleExpandInvestment = (id) => {
    setExpandedInvestment(expandedInvestment === id ? null : id);
  };

  // Calcula el rendimiento total
  const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0);
  const currentValue = investments.reduce((sum, inv) => sum + (inv.currentValue || inv.amount), 0);
  const totalReturn = ((currentValue - totalInvested) / totalInvested * 100) || 0;

  return (
    <InversionesContainer>
      <Header>
        <Title>
          <TrendingUp size={24} />
          <h2>Mis Inversiones</h2>
        </Title>
        <button 
          className="btn-add"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          <Plus size={18} />
          Nueva Inversión
        </button>
      </Header>

      {/* Pestañas */}
      <Tabs>
        <Tab 
          active={activeTab === 'mis-inversiones'}
          onClick={() => setActiveTab('mis-inversiones')}
        >
          Mis Inversiones
        </Tab>
        <Tab 
          active={activeTab === 'rendimiento'}
          onClick={() => setActiveTab('rendimiento')}
        >
          Rendimiento
        </Tab>
        <Tab 
          active={activeTab === 'analisis'}
          onClick={() => setActiveTab('analisis')}
        >
          Análisis
        </Tab>
      </Tabs>

      {/* Resumen */}
      <SummaryCards>
        <SummaryCard>
          <div className="icon">
            <DollarSign size={20} />
          </div>
          <div>
            <h4>Total Invertido</h4>
            <p>${totalInvested.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</p>
          </div>
        </SummaryCard>
        <SummaryCard>
          <div className="icon">
            <PieChart size={20} />
          </div>
          <div>
            <h4>Valor Actual</h4>
            <p>${currentValue.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</p>
          </div>
        </SummaryCard>
        <SummaryCard>
          <div className="icon">
            <ArrowUpRight size={20} />
          </div>
          <div>
            <h4>Rendimiento</h4>
            <p className={totalReturn >= 0 ? 'positive' : 'negative'}>
              {totalReturn.toFixed(2)}%
            </p>
          </div>
        </SummaryCard>
      </SummaryCards>

      {/* Formulario para agregar inversión */}
      {showAddForm && (
        <AddInvestmentForm onSubmit={handleAddInvestment}>
          <h4>Agregar Nueva Inversión</h4>
          <FormRow>
            <FormGroup>
              <label>Nombre</label>
              <input
                type="text"
                name="name"
                value={newInvestment.name}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <label>Tipo</label>
              <select
                name="type"
                value={newInvestment.type}
                onChange={handleInputChange}
                required
              >
                <option value="acciones">Acciones</option>
                <option value="fondos">Fondos de inversión</option>
                <option value="bienes-raices">Bienes Raíces</option>
                <option value="cripto">Criptomonedas</option>
                <option value="otros">Otros</option>
              </select>
            </FormGroup>
          </FormRow>
          
          <FormRow>
            <FormGroup>
              <label>Monto Inicial (MXN)</label>
              <input
                type="number"
                name="amount"
                value={newInvestment.amount}
                onChange={handleInputChange}
                min="0"
                step="0.01"
                required
              />
            </FormGroup>
            <FormGroup>
              <label>Tasa de Retorno Esperada (%)</label>
              <input
                type="number"
                name="returnRate"
                value={newInvestment.returnRate}
                onChange={handleInputChange}
                step="0.1"
                required
              />
            </FormGroup>
          </FormRow>
          
          <FormRow>
            <FormGroup>
              <label>Fecha de Inversión</label>
              <input
                type="date"
                name="date"
                value={newInvestment.date}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <label>Broker/Plataforma</label>
              <input
                type="text"
                name="broker"
                value={newInvestment.broker}
                onChange={handleInputChange}
              />
            </FormGroup>
          </FormRow>
          
          <FormGroup>
            <label>Notas</label>
            <textarea
              name="notes"
              value={newInvestment.notes}
              onChange={handleInputChange}
              rows="3"
            />
          </FormGroup>
          
          <FormActions>
            <button type="button" onClick={() => setShowAddForm(false)}>
              Cancelar
            </button>
            <button type="submit" className="primary">
              Agregar Inversión
            </button>
          </FormActions>
        </AddInvestmentForm>
      )}

      {/* Contenido de las pestañas */}
      {activeTab === 'mis-inversiones' && (
        <InvestmentsList>
          {investments.length === 0 ? (
            <EmptyState>
              <Info size={48} />
              <p>No tienes inversiones registradas</p>
              <button onClick={() => setShowAddForm(true)}>
                Agregar primera inversión
              </button>
            </EmptyState>
          ) : (
            investments.map(investment => (
              <InvestmentItem key={investment.id}>
                <InvestmentHeader onClick={() => toggleExpandInvestment(investment.id)}>
                  <div className="info">
                    <h4>{investment.name}</h4>
                    <span className={`type ${investment.type}`}>
                      {investment.type === 'acciones' && 'Acciones'}
                      {investment.type === 'fondos' && 'Fondos'}
                      {investment.type === 'bienes-raices' && 'Bienes Raíces'}
                      {investment.type === 'cripto' && 'Cripto'}
                      {investment.type === 'otros' && 'Otros'}
                    </span>
                  </div>
                  <div className="amount">
                    <span className="current">
                      ${investment.currentValue.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                    </span>
                    <span className={`return ${investment.returnRate >= 0 ? 'positive' : 'negative'}`}>
                      {investment.returnRate >= 0 ? '+' : ''}{investment.returnRate}%
                    </span>
                    {expandedInvestment === investment.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </InvestmentHeader>
                
                {expandedInvestment === investment.id && (
                  <InvestmentDetails>
                    <DetailRow>
                      <div>
                        <label>Monto Inicial</label>
                        <p>${investment.amount.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</p>
                      </div>
                      <div>
                        <label>Fecha de Inversión</label>
                        <p>{new Date(investment.date).toLocaleDateString('es-MX')}</p>
                      </div>
                      <div>
                        <label>Broker/Plataforma</label>
                        <p>{investment.broker || 'No especificado'}</p>
                      </div>
                    </DetailRow>
                    
                    {investment.notes && (
                      <DetailRow>
                        <div className="full-width">
                          <label>Notas</label>
                          <p>{investment.notes}</p>
                        </div>
                      </DetailRow>
                    )}
                    
                    <DetailActions>
                      <button className="edit">
                        <Edit size={16} />
                        Editar
                      </button>
                      <button 
                        className="delete"
                        onClick={() => handleDeleteInvestment(investment.id)}
                      >
                        <Trash2 size={16} />
                        Eliminar
                      </button>
                    </DetailActions>
                  </InvestmentDetails>
                )}
              </InvestmentItem>
            ))
          )}
        </InvestmentsList>
      )}

      {activeTab === 'rendimiento' && (
        <PerformanceSection>
          <PerformanceChart>
            <h4>Rendimiento Mensual</h4>
            <ChartContainer>
              {performanceData.map((item, index) => (
                <ChartBar key={index} height={Math.abs(item.return) * 10}>
                  <div className={`bar ${item.return >= 0 ? 'positive' : 'negative'}`} />
                  <span>{item.month}</span>
                  <span className="return-value">
                    {item.return >= 0 ? '+' : ''}{item.return}%
                  </span>
                </ChartBar>
              ))}
            </ChartContainer>
          </PerformanceChart>
          
          <AllocationChart>
            <h4>Distribución de Inversiones</h4>
            <PieChartContainer>
              {investments.length > 0 ? (
                <>
                  <PieChart>
                    {investments.map((inv, i) => {
                      const percentage = (inv.amount / totalInvested) * 100;
                      const color = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'][i % 5];
                      return (
                        <PieSlice 
                          key={i}
                          percentage={percentage}
                          color={color}
                          startAngle={i === 0 ? 0 : investments.slice(0, i).reduce((sum, inv) => {
                            return sum + (inv.amount / totalInvested) * 360;
                          }, 0)}
                        />
                      );
                    })}
                  </PieChart>
                  <Legend>
                    {investments.map((inv, i) => {
                      const color = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'][i % 5];
                      return (
                        <LegendItem key={i}>
                          <div className="color-box" style={{ backgroundColor: color }} />
                          <span>{inv.name}</span>
                          <span className="percentage">
                            {((inv.amount / totalInvested) * 100).toFixed(1)}%
                          </span>
                        </LegendItem>
                      );
                    })}
                  </Legend>
                </>
              ) : (
                <p>No hay datos para mostrar</p>
              )}
            </PieChartContainer>
          </AllocationChart>
        </PerformanceSection>
      )}

      {activeTab === 'analisis' && (
        <AnalysisSection>
          <div className="analysis-card">
            <h4>Diversificación</h4>
            <p>Evalúa cómo están distribuidas tus inversiones entre diferentes tipos de activos.</p>
            <ul>
              <li>Acciones: 60%</li>
              <li>Bienes Raíces: 30%</li>
              <li>Otros: 10%</li>
            </ul>
          </div>
          
          <div className="analysis-card">
            <h4>Riesgo vs. Retorno</h4>
            <p>Tus inversiones tienen un perfil de riesgo moderado con retornos esperados del 8-12% anual.</p>
          </div>
          
          <div className="analysis-card">
            <h4>Recomendaciones</h4>
            <p>Considera diversificar más en bonos para reducir el riesgo.</p>
            <p>Revisa periódicamente el rendimiento de tus fondos de inversión.</p>
          </div>
        </AnalysisSection>
      )}
    </InversionesContainer>
  );
};

// Estilos
const InversionesContainer = styled.div`
  padding: 20px;
  width: 100%;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  .btn-add {
    background: #D9632A;
    color: white;
    border: none;
    padding: 10px 16px;
    border-radius: 8px;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    transition: background 0.2s;

    &:hover {
      background: #F78839;
    }
  }
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  h2 {
    margin: 0;
    font-size: 24px;
    color: #1F2937;
  }

  svg {
    color: #D9632A;
  }
`;

const Tabs = styled.div`
  display: flex;
  border-bottom: 1px solid #E5E7EB;
  margin-bottom: 20px;
`;

const Tab = styled.button`
  padding: 12px 16px;
  background: none;
  border: none;
  border-bottom: 2px solid ${props => props.active ? '#D9632A' : 'transparent'};
  color: ${props => props.active ? '#1F2937' : '#6B7280'};
  font-weight: ${props => props.active ? '600' : '500'};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: #1F2937;
  }
`;

const SummaryCards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
`;

const SummaryCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  gap: 16px;

  .icon {
    background: #F3F4F6;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      color: #6B7280;
    }
  }

  h4 {
    margin: 0 0 4px 0;
    font-size: 14px;
    color: #6B7280;
    font-weight: 500;
  }

  p {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    color: #1F2937;

    &.positive {
      color: #10B981;
    }

    &.negative {
      color: #EF4444;
    }
  }
`;

const AddInvestmentForm = styled.form`
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  margin-bottom: 24px;

  h4 {
    margin-top: 0;
    margin-bottom: 20px;
    color: #1F2937;
  }
`;

const FormRow = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FormGroup = styled.div`
  flex: 1;

  label {
    display: block;
    margin-bottom: 8px;
    font-size: 14px;
    color: #6B7280;
    font-weight: 500;
  }

  input, select, textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #E5E7EB;
    border-radius: 6px;
    font-size: 14px;

    &:focus {
      outline: none;
      border-color: #D9632A;
      box-shadow: 0 0 0 2px rgba(217, 99, 42, 0.2);
    }
  }

  textarea {
    resize: vertical;
  }
`;

const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 20px;

  button {
    padding: 10px 16px;
    border-radius: 6px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;

    &:first-child {
      background: none;
      border: 1px solid #E5E7EB;
      color: #6B7280;

      &:hover {
        background: #F3F4F6;
      }
    }

    &.primary {
      background: #D9632A;
      color: white;
      border: none;

      &:hover {
        background: #F78839;
      }
    }
  }
`;

const InvestmentsList = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`;

const InvestmentItem = styled.div`
  border-bottom: 1px solid #F3F4F6;
  padding: 16px;

  &:last-child {
    border-bottom: none;
  }
`;

const InvestmentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  .info {
    h4 {
      margin: 0;
      font-size: 16px;
      color: #1F2937;
    }

    .type {
      font-size: 12px;
      padding: 2px 8px;
      border-radius: 4px;
      background: #F3F4F6;
      color: #6B7280;

      &.acciones {
        background: #DBEAFE;
        color: #1E40AF;
      }

      &.fondos {
        background: #D1FAE5;
        color: #065F46;
      }

      &.bienes-raices {
        background: #FCE7F3;
        color: #9D174D;
      }

      &.cripto {
        background: #EFF6FF;
        color: #1E40AF;
      }

      &.otros {
        background: #ECFDF5;
        color: #047857;
      }
    }
  }

  .amount {
    display: flex;
    align-items: center;
    gap: 16px;

    .current {
      font-weight: 600;
      color: #1F2937;
    }

    .return {
      font-weight: 500;
      font-size: 14px;

      &.positive {
        color: #10B981;
      }

      &.negative {
        color: #EF4444;
      }
    }

    svg {
      color: #9CA3AF;
    }
  }
`;

const InvestmentDetails = styled.div`
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px dashed #E5E7EB;
`;

const DetailRow = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 16px;

  &.full-width {
    flex-direction: column;
  }

  div {
    flex: 1;

    label {
      display: block;
      font-size: 12px;
      color: #6B7280;
      margin-bottom: 4px;
    }

    p {
      margin: 0;
      font-size: 14px;
      color: #1F2937;
    }
  }
`;

const DetailActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 16px;

  button {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px 12px;
    border-radius: 6px;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s;

    &.edit {
      background: none;
      border: 1px solid #E5E7EB;
      color: #6B7280;

      &:hover {
        background: #F3F4F6;
      }
    }

    &.delete {
      background: none;
      border: 1px solid #FEE2E2;
      color: #EF4444;

      &:hover {
        background: #FEE2E2;
      }
    }
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  text-align: center;

  svg {
    color: #9CA3AF;
    margin-bottom: 16px;
  }

  p {
    color: #6B7280;
    margin-bottom: 20px;
  }

  button {
    background: #D9632A;
    color: white;
    border: none;
    padding: 10px 16px;
    border-radius: 6px;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.2s;

    &:hover {
      background: #F78839;
    }
  }
`;

const PerformanceSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-top: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const PerformanceChart = styled.div`
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);

  h4 {
    margin-top: 0;
    margin-bottom: 20px;
    color: #1F2937;
  }
`;

const ChartContainer = styled.div`
  display: flex;
  align-items: flex-end;
  height: 200px;
  gap: 12px;
  padding-top: 20px;
`;

const ChartBar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  height: 100%;

  .bar {
    width: 30px;
    height: ${props => props.height}px;
    background: #10B981;
    border-radius: 4px 4px 0 0;
    margin-bottom: 8px;

    &.negative {
      background: #EF4444;
    }
  }

  span {
    font-size: 12px;
    color: #6B7280;

    &.return-value {
      font-weight: 500;
      margin-top: 4px;
      color: #1F2937;
    }
  }
`;

const AllocationChart = styled.div`
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);

  h4 {
    margin-top: 0;
    margin-bottom: 20px;
    color: #1F2937;
  }
`;

// Versión corregida del gráfico de pastel
const PieChartContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
  min-height: 200px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const PieChartWrapper = styled.div`
  width: 160px;
  height: 160px;
  border-radius: 50%;
  position: relative;
  background: #F3F4F6;
`;

const PieSlice = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  clip-path: polygon(50% 50%, 50% 0, ${props => {
    const angle = props.startAngle + props.percentage * 3.6;
    const x = 50 + 50 * Math.sin(angle * Math.PI / 180);
    const y = 50 - 50 * Math.cos(angle * Math.PI / 180);
    return `${x}% ${y}%`;
  }});
  background: ${props => props.color};
  transform: rotate(${props => props.startAngle}deg);
`;

const Legend = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  .color-box {
    width: 12px;
    height: 12px;
    border-radius: 2px;
  }

  span {
    font-size: 14px;
    color: #6B7280;

    &:first-of-type {
      min-width: 120px;
    }

    &.percentage {
      font-weight: 500;
      color: #1F2937;
    }
  }
`;

const AnalysisSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;

  .analysis-card {
    background: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);

    h4 {
      margin-top: 0;
      margin-bottom: 12px;
      color: #1F2937;
    }

    p {
      color: #6B7280;
      margin-bottom: 12px;
      font-size: 14px;
      line-height: 1.5;
    }

    ul {
      padding-left: 20px;
      margin: 0;
      color: #6B7280;
      font-size: 14px;
    }
  }
`;

export default InversionesView;