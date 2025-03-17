import React, { useState } from "react";
import styled from "styled-components";
import { TrendingUp, Lightbulb, Gift, Award, Bell, ChevronRight, Star } from "lucide-react";

function NovedadesView() {
  const [activeTab, setActiveTab] = useState("all");

  // Datos de ejemplo para las novedades
  const novedades = [
    {
      id: 1,
      type: "tip",
      title: "Ahorra automáticamente",
      description: "Configura transferencias automáticas a tu cuenta de ahorros cada vez que recibas un ingreso.",
      icon: <Lightbulb size={24} color="#F59E0B" />,
      date: "Hoy",
      isNew: true,
    },
    {
      id: 2,
      type: "update",
      title: "Nueva función: Presupuestos personalizados",
      description: "Ahora puedes crear presupuestos personalizados para cada categoría de gastos.",
      icon: <Bell size={24} color="#D9632A" />,
      date: "Ayer",
      isNew: true,
    },
    {
      id: 3,
      type: "news",
      title: "Inflación disminuye a 4.2% en el último trimestre",
      description: "Los expertos recomiendan revisar tus inversiones para aprovechar la nueva situación económica.",
      icon: <TrendingUp size={24} color="#10B981" />,
      image: "/placeholder.svg?height=120&width=320",
      date: "2 días atrás",
      isNew: false,
    },
    {
      id: 4,
      type: "achievement",
      title: "¡Felicidades! Has ahorrado por 3 meses consecutivos",
      description: "Continúa así y alcanzarás tus metas financieras más rápido.",
      icon: <Award size={24} color="#3B82F6" />,
      date: "1 semana atrás",
      isNew: false,
    },
    {
      id: 5,
      type: "promo",
      title: "Descuento especial en suscripción premium",
      description: "Obtén un 30% de descuento en tu suscripción anual a FinanzApp Premium.",
      icon: <Gift size={24} color="#8B5CF6" />,
      date: "2 semanas atrás",
      isNew: false,
    },
  ];

  // Filtrar novedades según la pestaña activa
  const filteredNovedades = activeTab === "all" ? novedades : novedades.filter((item) => item.type === activeTab);

  return (
    <Container>
      <ContentWrapper>
        <HeaderContainer>
          <Title>Novedades</Title>
          <MarkReadButton>
            Marcar todo como leído
          </MarkReadButton>
        </HeaderContainer>

        {/* Tabs */}
        <TabsContainer>
          <TabButton 
            active={activeTab === "all"}
            onClick={() => setActiveTab("all")}
          >
            Todos
          </TabButton>
          <TabButton 
            active={activeTab === "tip"}
            onClick={() => setActiveTab("tip")}
          >
            Consejos
          </TabButton>
          <TabButton 
            active={activeTab === "update"}
            onClick={() => setActiveTab("update")}
          >
            Actualizaciones
          </TabButton>
          <TabButton 
            active={activeTab === "news"}
            onClick={() => setActiveTab("news")}
          >
            Noticias
          </TabButton>
          <TabButton 
            active={activeTab === "achievement"}
            onClick={() => setActiveTab("achievement")}
          >
            Logros
          </TabButton>
          <TabButton 
            active={activeTab === "promo"}
            onClick={() => setActiveTab("promo")}
          >
            Promociones
          </TabButton>
        </TabsContainer>

        {/* Novedades Cards */}
        <CardsContainer>
          {filteredNovedades.map((item) => (
            <Card key={item.id}>
              <CardContent>
                <FlexContainer>
                  <IconContainer>
                    {item.icon}
                  </IconContainer>

                  <ContentContainer>
                    <CardHeader>
                      <CardTitle>{item.title}</CardTitle>
                      {item.isNew && <Badge>Nuevo</Badge>}
                    </CardHeader>

                    <CardDescription>{item.description}</CardDescription>

                    {item.image && (
                      <ImageContainer>
                        <img
                          src={item.image}
                          alt={item.title}
                          width={320}
                          height={120}
                        />
                      </ImageContainer>
                    )}

                    <CardFooter>
                      <CardDate>{item.date}</CardDate>
                      <ViewMoreButton>
                        Ver más <ChevronRight size={16} />
                      </ViewMoreButton>
                    </CardFooter>
                  </ContentContainer>
                </FlexContainer>
              </CardContent>
            </Card>
          ))}
        </CardsContainer>

        {/* Destacado */}
        <HighlightContainer>
          <FlexContainer>
            <HighlightIconContainer>
              <Star size={32} color="#D9632A" />
            </HighlightIconContainer>
            <div>
              <HighlightTitle>Consejo financiero del día</HighlightTitle>
              <HighlightDescription>
                La regla 50/30/20: Destina el 50% de tus ingresos a necesidades, 30% a deseos y 20% a ahorro e
                inversión.
              </HighlightDescription>
            </div>
          </FlexContainer>
        </HighlightContainer>
      </ContentWrapper>
    </Container>
  );
}

export default NovedadesView;

// Styled Components
const Container = styled.div`
  padding: 16px;
  
  @media (min-width: 768px) {
    padding: 24px;
  }
`;

const ContentWrapper = styled.div`
  max-width: 95%;
  margin: 0 auto;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #D9632A;
`;

const MarkReadButton = styled.button`
  background: transparent;
  color: #D9632A;
  font-size: 14px;
  border: none;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 4px;
  
  &:hover {
    background-color: rgba(217, 99, 42, 0.1);
  }
`;

const TabsContainer = styled.div`
  display: flex;
  overflow-x: auto;
  padding-bottom: 8px;
  margin-bottom: 24px;
  gap: 8px;
  
  &::-webkit-scrollbar {
    height: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #D9632A;
    border-radius: 4px;
  }
`;

const TabButton = styled.button`
  background: ${props => props.active ? '#D9632A' : 'transparent'};
  color: ${props => props.active ? 'white' : '#666'};
  border: 1px solid ${props => props.active ? '#D9632A' : '#e5e5e5'};
  border-radius: 9999px;
  padding: 8px 16px;
  font-size: 14px;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: ${props => props.active ? '#D9632A' : '#D9632A'};
    color: ${props => props.active ? 'white' : '#D9632A'};
  }
`;

const CardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Card = styled.div`
  background: white;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
  
  &:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`;

const CardContent = styled.div`
  padding: 20px;
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: flex-start;
`;

const IconContainer = styled.div`
  height: 48px;
  width: 48px;
  border-radius: 9999px;
  background-color: #f9f9f9;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
  flex-shrink: 0;
`;

const ContentContainer = styled.div`
  flex: 1;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4px;
`;

const CardTitle = styled.h3`
  font-weight: 600;
  color: #333;
`;

const Badge = styled.span`
  background-color: #D9632A;
  color: white;
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 9999px;
`;

const CardDescription = styled.p`
  color: #666;
  font-size: 14px;
  margin-bottom: 8px;
`;

const ImageContainer = styled.div`
  margin-top: 12px;
  margin-bottom: 12px;
  border-radius: 12px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }
`;

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
`;

const CardDate = styled.span`
  font-size: 12px;
  color: #888;
`;

const ViewMoreButton = styled.button`
  background: transparent;
  color: #D9632A;
  font-size: 14px;
  border: none;
  cursor: pointer;
  padding: 4px 8px;
  height: 32px;
  display: flex;
  align-items: center;
  
  svg {
    margin-left: 4px;
  }
  
  &:hover {
    background-color: rgba(217, 99, 42, 0.1);
    border-radius: 4px;
  }
`;

const HighlightContainer = styled.div`
  margin-top: 32px;
  background: linear-gradient(to right, rgba(217, 99, 42, 0.1), rgba(247, 136, 57, 0.1));
  border-radius: 24px;
  padding: 20px;
`;

const HighlightIconContainer = styled.div`
  background: white;
  padding: 12px;
  border-radius: 16px;
  margin-right: 16px;
`;

const HighlightTitle = styled.h3`
  font-weight: 600;
  color: #333;
`;

const HighlightDescription = styled.p`
  color: #666;
`;