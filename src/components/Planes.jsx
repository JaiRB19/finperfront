import React from 'react';
import { Check, Crown, Zap, Star, Gem, ArrowRight } from 'lucide-react';
import styled from 'styled-components';
import { useNavigate, Route, Routes } from 'react-router-dom'; // Importa Route y Routes

const PlansView = () => {
  const navigate = useNavigate();

  const plans = [
    {
      name: "FREE",
      price: "$0",
      period: "por siempre",
      description: "Ideal para empezar a organizar tus finanzas",
      features: [
        "3 tarjetas guardadas",
        "5 transacciones/mes",
        "Estadísticas básicas",
        "Soporte por correo",
        "Acceso a 1 dispositivo"
      ],
      icon: <Star size={24} color="#6b7280" />,
      color: "#9ca3af",
      popular: false
    },
    {
      name: "PREMIUM",
      price: "$9",
      period: "por mes",
      description: "Para quienes quieren más control financiero",
      features: [
        "Tarjetas ilimitadas",
        "Transacciones ilimitadas",
        "Estadísticas avanzadas",
        "Soporte prioritario",
        "Hasta 3 dispositivos",
        "Exportación a Excel",
        "Categorización automática"
      ],
      icon: <Gem size={24} color="#f59e0b" />,
      color: "#f59e0b",
      popular: true
    },
    {
      name: "PRO",
      price: "$25",
      period: "por mes",
      description: "Solución completa para profesionales y negocios",
      features: [
        "Todo en PREMIUM",
        "Asesor financiero virtual",
        "Hasta 10 dispositivos",
        "Soporte 24/7",
        "Integración con bancos",
        "Informes personalizados",
        "Alertas inteligentes",
        "Acceso temprano a nuevas funciones"
      ],
      icon: <Crown size={24} color="#f59e0b" />,
      color: "#f59e0b",
      popular: false
    }
  ];

  const handleUpgrade = (plan) => {
    console.log(`Upgrading to ${plan}`);
    // Aquí puedes redirigir al proceso de pago
    // navigate('/checkout', { state: { plan } });
  };

  return (
    <PlansContainer>
      <Header>
        <Title>Elige tu plan perfecto</Title>
        <Subtitle>Compara características y selecciona lo que mejor se adapte a tus necesidades</Subtitle>
      </Header>
      
      <PlansGrid>
        {plans.map((plan, index) => (
          <PlanCard key={index} $color={plan.color} $popular={plan.popular}>
            {plan.popular && (
              <PopularBadge>
                <Zap size={14} />
                <span>MÁS POPULAR</span>
              </PopularBadge>
            )}
            
            <PlanHeader>
              {plan.icon}
              <PlanName>{plan.name}</PlanName>
              <PlanPrice $color={plan.color}>
                {plan.price} <small>/ {plan.period}</small>
              </PlanPrice>
              <PlanDescription>{plan.description}</PlanDescription>
            </PlanHeader>
            
            <PlanFeatures>
              {plan.features.map((feature, i) => (
                <FeatureItem key={i}>
                  <Check size={16} color={plan.color} />
                  <span>{feature}</span>
                </FeatureItem>
              ))}
            </PlanFeatures>
            
            <UpgradeButton 
              $color={plan.color}
              onClick={() => handleUpgrade(plan.name)}
            >
              {plan.name === 'FREE' ? 'Usar plan gratuito' : 'Actualizar ahora'}
              <ArrowRight size={16} />
            </UpgradeButton>
          </PlanCard>
        ))}
      </PlansGrid>
      
      <ComparisonSection>
        <ComparisonTitle>Comparación detallada</ComparisonTitle>
        <ComparisonTable>
          <thead>
            <tr>
              <th>Característica</th>
              {plans.map((plan, i) => (
                <th key={i}>{plan.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Tarjetas guardadas</td>
              <td>3</td>
              <td>Ilimitadas</td>
              <td>Ilimitadas</td>
            </tr>
            <tr>
              <td>Transacciones</td>
              <td>5/mes</td>
              <td>Ilimitadas</td>
              <td>Ilimitadas</td>
            </tr>
            <tr>
              <td>Soporte</td>
              <td>Correo</td>
              <td>Prioritario</td>
              <td>24/7</td>
            </tr>
            <tr>
              <td>Dispositivos</td>
              <td>1</td>
              <td>3</td>
              <td>10</td>
            </tr>
            <tr>
              <td>Exportación datos</td>
              <td>No</td>
              <td>Sí</td>
              <td>Sí</td>
            </tr>
          </tbody>
        </ComparisonTable>
      </ComparisonSection>
      
      <FAQSection>
        <SectionTitle>Preguntas frecuentes</SectionTitle>
        <FAQItem>
          <FAQQuestion>¿Puedo cambiar de plan más tarde?</FAQQuestion>
          <FAQAnswer>Sí, puedes actualizar o degradar tu plan en cualquier momento desde la configuración de tu cuenta.</FAQAnswer>
        </FAQItem>
        <FAQItem>
          <FAQQuestion>¿Hay un período de prueba para PREMIUM/PRO?</FAQQuestion>
          <FAQAnswer>¡Sí! Ofrecemos 14 días de prueba gratuita para que pruebes todas las funciones premium.</FAQAnswer>
        </FAQItem>
        <FAQItem>
          <FAQQuestion>¿Qué métodos de pago aceptan?</FAQQuestion>
          <FAQAnswer>Aceptamos todas las tarjetas principales, PayPal y transferencias bancarias.</FAQAnswer>
        </FAQItem>
      </FAQSection>
    </PlansContainer>
  );
};

export default PlansView;

// Estilos
const PlansContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #111827;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: #6b7280;
  max-width: 600px;
  margin: 0 auto;
`;

const PlansGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-bottom: 4rem;
`;

const PlanCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid ${props => props.$popular ? props.$color : '#e5e7eb'};
  position: relative;
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  }
`;

const PopularBadge = styled.div`
  position: absolute;
  top: -12px;
  right: 20px;
  background: #fff;
  padding: 0.25rem 1rem;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: #F78839;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
`;

const PlanHeader = styled.div`
  text-align: center;
  margin-bottom: 1.5rem;
`;

const PlanName = styled.h2`
  font-size: 1.5rem;
  color: #111827;
  margin: 0.5rem 0;
`;

const PlanPrice = styled.p`
  font-size: 2rem;
  font-weight: 700;
  margin: 0.5rem 0;
  color: ${props => props.$color || '#111827'}; // Usa el color del plan si está disponible
  
  small {
    font-size: 1rem;
    font-weight: 400;
    color: #6b7280;
  }
`;


const PlanDescription = styled.p`
  color: #6b7280;
  font-size: 0.9rem;
`;

const PlanFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 2rem 0;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  font-size: 0.95rem;
  
  span {
    flex: 1;
  }
`;

const UpgradeButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  background: ${props => props.$color || props.theme.colors.primary};
  color: white;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: opacity 0.2s;
  &:hover {
    opacity: 0.9;
  }
`;

const ComparisonSection = styled.section`
  margin: 4rem 0;
`;

const ComparisonTitle = styled.h2`
  text-align: center;
  font-size: 1.8rem;
  color: #111827;
  margin-bottom: 2rem;
`;

const ComparisonTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  th, td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #e5e7eb;
  }
  
  th {
    background: #f9fafb;
    font-weight: 600;
  }
  
  tr:nth-child(even) {
    background: #f9fafb;
  }
`;

const FAQSection = styled.section`
  margin-top: 4rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  color: #111827;
  text-align: center;
  margin-bottom: 2rem;
`;

const FAQItem = styled.div`
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const FAQQuestion = styled.h3`
  font-size: 1.1rem;
  color: #111827;
  margin-bottom: 0.5rem;
`;

const FAQAnswer = styled.p`
  color: #6b7280;
  line-height: 1.6;
`;