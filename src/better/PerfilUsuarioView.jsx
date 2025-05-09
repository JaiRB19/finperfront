import React, { useState, useEffect } from "react";
import api from "../components/axios";  // tu instancia de axios con baseURL
import styled from "styled-components";
import {
  UserIcon,
  ArrowLeft,
  Camera,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Lock,
  Bell,
  Eye,
  Shield,
  Save
} from "lucide-react";

const PerfilView = ({ changeComponent }) => {
  const [theme] = useState({ isDark: false }); 
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    birthdate: "",
    bio: "",
  });
  const [privacySettings, setPrivacySettings] = useState({
    showActivity: false,
    showBalance: false,
    twoFactorAuth: false,
    emailNotifications: false,
  });

  // Al montar, cargar datos de perfil
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        const { data } = await api.get("/api/profile", {
          headers: { Authorization: `Bearer ${token}` }
        });
        const d = data.data;
        setUserData({
          name: d.name || "",
          email: d.email || "",
          phone: d.phone || "",
          address: d.address || "",
          birthdate: d.birthdate || "",
          bio: d.bio || ""
        });
        setPrivacySettings(d.privacy_settings || {
          showActivity: false,
          showBalance: false,
          twoFactorAuth: false,
          emailNotifications: false
        });
      } catch (err) {
        console.error("Error cargando perfil:", err);
      }
    };
    fetchProfile();
  }, []);

  const handleInputChange = (field, value) => {
    setUserData(prev => ({ ...prev, [field]: value }));
  };

  const togglePrivacySetting = setting => {
    setPrivacySettings(prev => ({ ...prev, [setting]: !prev[setting] }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("auth_token");
      const payload = {
        ...userData,
        privacy_settings: privacySettings
      };
      const { data } = await api.put("/api/profile", payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // actualizar estado con la respuesta (por si backend transformó algo)
      const d = data.data;
      setUserData({
        name: d.name,
        email: d.email,
        phone: d.phone,
        address: d.address,
        birthdate: d.birthdate,
        bio: d.bio
      });
      setPrivacySettings(d.privacy_settings);
      setIsEditing(false);
    } catch (err) {
      console.error("Error guardando perfil:", err);
    }
  };

  const HandleChangeComponent = () => {
    changeComponent("opciones");
  };

  return (
    <Container>
      <ContentWrapper>
        {/* Header */}
        <Header>
          <BackButton onClick={HandleChangeComponent}>
            <ArrowLeft size={20} />
          </BackButton>
          <Title theme={theme}>Perfil de Usuario</Title>
          <EditButton theme={theme} onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? "Cancelar" : "Editar"}
          </EditButton>
        </Header>

        {/* Foto de perfil y nombre */}
        <ProfileSection theme={theme}>
          <ProfileContainer>
            <ProfileImageContainer>
              <ProfileImagePlaceholder theme={theme}>
                <UserIcon size={48} color={theme.isDark ? "#F78839" : "#D9632A"} />
              </ProfileImagePlaceholder>
              {isEditing && (
                <CameraButton>
                  <Camera size={16} color="white" />
                </CameraButton>
              )}
            </ProfileImageContainer>

            {isEditing ? (
              <UserNameInput
                theme={theme}
                value={userData.name}
                onChange={e => handleInputChange("name", e.target.value)}
              />
            ) : (
              <UserName theme={theme}>{userData.name}</UserName>
            )}

            <MemberSince theme={theme}>Miembro desde Enero 2025</MemberSince>
          </ProfileContainer>
        </ProfileSection>

        {/* Estadísticas del usuario */}
        <Card theme={theme}>
          <StatsGrid theme={theme}>
            {[
              { label: "Días activo", value: 0 },
              { label: "Transacciones", value: 0 },
              { label: "Presupuestos", value: 0 }
            ].map((stat, idx) => (
              <StatCard key={idx}>
                <StatValue theme={theme}>{stat.value}</StatValue>
                <StatLabel theme={theme}>{stat.label}</StatLabel>
              </StatCard>
            ))}
          </StatsGrid>
        </Card>

        {/* Información personal */}
        <Card theme={theme}>
          <SectionHeader theme={theme}>
            <SectionTitle theme={theme}>Información Personal</SectionTitle>
          </SectionHeader>
          <SectionBody>
            {[
              { field: "email", label: "Correo Electrónico", Icon: Mail },
              { field: "phone", label: "Teléfono", Icon: Phone },
              { field: "address", label: "Dirección", Icon: MapPin },
              { field: "birthdate", label: "Fecha de Nacimiento", Icon: Calendar },
              { field: "bio", label: "Biografía", Icon: UserIcon }
            ].map(({ field, label, Icon }) => (
              <FieldContainer key={field}>
                <FieldLabel theme={theme}>
                  <LabelIcon><Icon size={16} /></LabelIcon>
                  {label}
                </FieldLabel>
                {isEditing ? (
                  field === "bio" ? (
                    <TextArea
                      theme={theme}
                      value={userData[field]}
                      onChange={e => handleInputChange(field, e.target.value)}
                    />
                  ) : (
                    <FieldInput
                      theme={theme}
                      value={userData[field]}
                      onChange={e => handleInputChange(field, e.target.value)}
                    />
                  )
                ) : (
                  <FieldValue theme={theme}>{userData[field]}</FieldValue>
                )}
              </FieldContainer>
            ))}
          </SectionBody>
        </Card>

        {/* Privacidad y Seguridad */}
        <Card theme={theme}>
          <SectionHeader theme={theme}>
            <TitleWithIcon>
              <Lock size={20} color={theme.isDark ? "#F78839" : "#D9632A"} style={{ marginRight: "0.5rem" }} />
              <SectionTitle theme={theme}>Privacidad y Seguridad</SectionTitle>
            </TitleWithIcon>
          </SectionHeader>
          <div style={{ padding: "1rem" }}>
            {[
              { key: "showActivity", label: "Mostrar actividad reciente", Icon: Eye },
              { key: "showBalance", label: "Mostrar saldo en pantalla principal", Icon: Eye },
              { key: "twoFactorAuth", label: "Autenticación de dos factores", Icon: Shield },
              { key: "emailNotifications", label: "Notificaciones por correo", Icon: Bell }
            ].map(({ key, label, Icon }) => (
              <PrivacyItem theme={theme} key={key}>
                <PrivacyLabel theme={theme}>
                  <Icon size={16} style={{ marginRight: "0.5rem" }} />
                  {label}
                </PrivacyLabel>
                <Switch
                  theme={theme}
                  checked={privacySettings[key]}
                  onClick={() => togglePrivacySetting(key)}
                />
              </PrivacyItem>
            ))}
          </div>
        </Card>

        {/* Botón de guardar */}
        {isEditing && (
          <SaveButton onClick={handleSave}>
            <IconWrapper><Save size={20} /></IconWrapper>
            Guardar Cambios
          </SaveButton>
        )}
      </ContentWrapper>
    </Container>
  );
};

export default PerfilView;

// Styled Components
const Container = styled.div`
  padding: 1rem;
  
  @media (min-width: 768px) {
    padding: 1.5rem;
  }
`;

const ContentWrapper = styled.div`
  max-width: 100%;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const BackButton = styled.button`
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.5rem;
  padding: 0.5rem;
  cursor: pointer;
  border-radius: 0.375rem;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: bold;
  color: ${props => props.theme.isDark ? "#F78839" : "#D9632A"};
`;

const EditButton = styled.button`
  background: transparent;
  border: none;
  margin-left: auto;
  padding: 0.5rem;
  cursor: pointer;
  border-radius: 0.375rem;
  color: ${props => props.theme.isDark ? "#F78839" : "#D9632A"};
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

const Card = styled.div`
  border-radius: 1.5rem;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  background-color: ${props => props.theme.isDark ? "#1F2937" : "#FFFFFF"};
  margin-bottom: 1.5rem;
`;

const ProfileSection = styled(Card)`
  padding: 1.5rem;
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileImageContainer = styled.div`
  position: relative;
  margin-bottom: 1rem;
`;

const ProfileImagePlaceholder = styled.div`
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  background-color: ${props => props.theme.isDark ? "rgba(247, 136, 57, 0.2)" : "rgba(217, 99, 42, 0.1)"};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CameraButton = styled.button`
  position: absolute;
  bottom: 0;
  right: 0;
  height: 2rem;
  width: 2rem;
  border-radius: 50%;
  background-color: #D9632A;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  
  &:hover {
    background-color: #c55825;
  }
`;

const UserName = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: ${props => props.theme.isDark ? "#FFFFFF" : "inherit"};
`;

const UserNameInput = styled.input`
  text-align: center;
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
  max-width: 16rem;
  background-color: ${props => props.theme.isDark ? "#374151" : "#F9FAFB"};
  border: 0;
  border-bottom: 1px solid ${props => props.theme.isDark ? "#4B5563" : "#E5E7EB"};
  border-radius: 0.75rem;
  padding: 0.5rem;
  color: ${props => props.theme.isDark ? "#FFFFFF" : "inherit"};
  
  &:focus {
    outline: none;
    border-color: #D9632A;
    box-shadow: 0 0 0 1px #D9632A;
  }
`;

const MemberSince = styled.p`
  font-size: 0.875rem;
  color: ${props => props.theme.isDark ? "#9CA3AF" : "#6B7280"};
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  
  & > *:not(:last-child) {
    border-right: 1px solid ${props => props.theme.isDark ? "#4B5563" : "#E5E7EB"};
  }
`;

const StatCard = styled.div`
  padding: 1rem;
  text-align: center;
`;

const StatValue = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${props => props.theme.isDark ? "#F78839" : "#D9632A"};
`;

const StatLabel = styled.p`
  font-size: 15px;
  font-weight: 400;
  color: ${props => props.theme.isDark ? "#9CA3AF" : "#6B7280"};
`;

const SectionHeader = styled.div`
  padding: 1rem 1.5rem;
  border-bottom: 1px solid ${props => props.theme.isDark ? "#4B5563" : "#E5E7EB"};
`;

const SectionTitle = styled.h3`
  font-weight: 600;
  color: ${props => props.theme.isDark ? "#FFFFFF" : "inherit"};
`;

const SectionBody = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const FieldLabel = styled.label`
  display: flex;
  align-items: center;
  color: ${props => props.theme.isDark ? "#9CA3AF" : "#6B7280"};
  margin-bottom: 0.25rem;
  font-size: 0.875rem;
`;

const LabelIcon = styled.span`
  margin-right: 0.5rem;
  display: flex;
  align-items: center;
`;

const FieldValue = styled.p`
  color: ${props => props.theme.isDark ? "#FFFFFF" : "inherit"};
`;

const FieldInput = styled.input`
  background-color: ${props => props.theme.isDark ? "#374151" : "#F9FAFB"};
  border: 0;
  border-bottom: 1px solid ${props => props.theme.isDark ? "#4B5563" : "#E5E7EB"};
  border-radius: 0.75rem;
  padding: 0.5rem;
  color: ${props => props.theme.isDark ? "#FFFFFF" : "inherit"};
  
  &:focus {
    outline: none;
    border-color: #D9632A;
    box-shadow: 0 0 0 1px #D9632A;
  }
`;

const TextArea = styled.textarea`
  background-color: ${props => props.theme.isDark ? "#374151" : "#F9FAFB"};
  border: 0;
  border-bottom: 1px solid ${props => props.theme.isDark ? "#4B5563" : "#E5E7EB"};
  border-radius: 0.75rem;
  padding: 0.5rem;
  min-height: 100px;
  resize: vertical;
  color: ${props => props.theme.isDark ? "#FFFFFF" : "inherit"};
  
  &:focus {
    outline: none;
    border-color: #D9632A;
    box-shadow: 0 0 0 1px #D9632A;
  }
`;

const TitleWithIcon = styled.div`
  display: flex;
  align-items: center;
`;

const PrivacyItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 0;
  
  &:not(:first-child) {
    border-top: 1px solid ${props => props.theme.isDark ? "#4B5563" : "#E5E7EB"};
  }
`;

const PrivacyLabel = styled.label`
  display: flex;
  align-items: center;
  font-weight: 500;
  color: ${props => props.theme.isDark ? "#E5E7EB" : "inherit"};
`;

const Switch = styled.div`
  position: relative;
  width: 2.5rem;
  height: 1.5rem;
  border-radius: 9999px;
  background-color: ${props => props.checked ? "#F78839" : props.theme.isDark ? "#4B5563" : "#D1D5DB"};
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:after {
    content: "";
    position: absolute;
    top: 0.125rem;
    left: ${props => props.checked ? "calc(100% - 1.25rem - 0.125rem)" : "0.125rem"};
    width: 1.25rem;
    height: 1.25rem;
    border-radius: 50%;
    background-color: white;
    transition: left 0.2s;
  }
`;

const SaveButton = styled.button`
  width: 100%;
  height: 3rem;
  border-radius: 9999px;
  background-color: #D9632A;
  color: white;
  font-weight: 500;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-bottom: 2rem;
  
  &:hover {
    background-color: #c55825;
  }
`;

const IconWrapper = styled.span`
  margin-right: 0.5rem;
  display: flex;
  align-items: center;
`;