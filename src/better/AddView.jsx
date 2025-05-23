import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Plus, X } from "lucide-react";
import api from "../components/axios";

const IngresoGastoCardView = () => {
  const [type, setType] = useState("Ingreso");
  const [icons, setIcons] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Obtener categorías según tipo
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        const { data } = await api.get("/api/categories", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const filtered = data.data
          .filter(cat => cat.type === type)
          .map(cat => cat.name);
        setIcons(filtered);
      } catch (error) {
        console.error("Error al cargar categorías:", error);
      }
    };
    fetchCategories();
  }, [type]);

  // Crear nueva categoría
  const handleAddIcon = async () => {
    if (!newCategory.trim()) return;
    try {
      const token = localStorage.getItem("auth_token");
      const { data } = await api.post(
        "/api/categories",
        { name: newCategory, type },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIcons(prev => [...prev, data.data.name]);
      setNewCategory("");
      setShowModal(false);
    } catch (error) {
      console.error("Error al agregar categoría:", error);
    }
  };

  // Crear transacción
  const handleSubmitTransaction = async () => {
    if (!amount || !selectedCategory) {
      return alert("Debes indicar importe y seleccionar categoría.");
    }
    try {
      const token = localStorage.getItem("auth_token");
      await api.post(
        "/api/transactions",
        {
          amount: parseFloat(amount),
          note,
          type,
          category_name: selectedCategory,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Transacción registrada.");
      setAmount("");
      setNote("");
      setSelectedCategory("");
    } catch (err) {
      console.error("Error al registrar transacción:", err);
      alert("Ocurrió un error al registrar la transacción.");
    }
  };

  return (
    <Container>
      <ToggleGroup>
        <ToggleButton active={type === "Ingreso"} onClick={() => setType("Ingreso")}>
          Ingreso
        </ToggleButton>
        <ToggleButton active={type === "Gasto"} onClick={() => setType("Gasto")}>
          Gasto
        </ToggleButton>
      </ToggleGroup>

      <IconsRow>
        {icons.map((icon, index) => (
          <IconBox
            key={index}
            onClick={() => setSelectedCategory(icon)}
            style={{
              border: selectedCategory === icon ? "2px solid #007BFF" : "1px solid #ccc",
              cursor: "pointer",
            }}
          >
            <IconText>{icon}</IconText>
          </IconBox>
        ))}
        <PlusButton onClick={() => setShowModal(true)}>
          <Plus size={16} />
        </PlusButton>
      </IconsRow>

      <Divider />

      <FormSection>
        {/* Aquí mostramos la categoría seleccionada */}
        <LargeIconBox>
          <IconText>
            {selectedCategory || " "}
          </IconText>
        </LargeIconBox>

        <InputRow>
          <Label>Importe:</Label>
          <Input
            placeholder="MXN"
            value={amount}
            onChange={e => setAmount(e.target.value)}
          />
        </InputRow>
        <InputRow>
          <Label>Nota:</Label>
          <Input
            placeholder="Nota"
            value={note}
            onChange={e => setNote(e.target.value)}
          />
        </InputRow>
        <SubmitButton onClick={handleSubmitTransaction}>
          Aceptar
        </SubmitButton>
      </FormSection>

      {showModal && (
        <ModalOverlay>
          <ModalContent>
            <CloseButton onClick={() => setShowModal(false)}>
              <X size={18} />
            </CloseButton>
            <h3>Agregar Categoría</h3>
            <ModalInput
              type="text"
              value={newCategory}
              onChange={e => setNewCategory(e.target.value)}
              placeholder="Categoría a agregar"
            />
            <ModalButton onClick={handleAddIcon}>Crear</ModalButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default IngresoGastoCardView;




const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  gap: 1rem;
`;

const ToggleGroup = styled.div`
  display: flex;
  border: 2px solid #D9632A;
  border-radius: 999px;
  overflow: hidden;
`;

const ToggleButton = styled.button`
  background: ${(props) => (props.active ? "#D9632A" : "transparent")};
  color: ${(props) => (props.active ? "#fff" : "#000")};
  border: none;
  padding: 0.5rem 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
`;

const IconsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
  cursor: pointer;

  & > * {
    transition: transform 0.2s ease-in-out;
  }

  & > *:hover {
    transform: scale(1.1);
  }
`;

const IconBox = styled.div`
  width: 60px;
  height: 60px;
  background: #d9d9d9;
  border-radius: 10px;
`;

const PlusButton = styled.button`
  background: #D9632A;
  color: white;
  border: none;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    background: #F78839;
  }
`;

const Divider = styled.hr`
  width: 100%;
  margin: 2rem 0;
  border: 1px solid #ccc;
`;

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
  max-width: 400px;
`;

const LargeIconBox = styled.div`
  width: 80px;
  height: 80px;
  background: #d9d9d9;
  border-radius: 10px;
`;

const InputRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
`;

const Label = styled.p`
  width: 80px;
  margin: 0;
  font-weight: 500;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.75rem;
  border-radius: 10px;
  border: none;
  background: #eef2f7;
  font-size: 1rem;
`;

const SubmitButton = styled.button`
  background: #D9632A;
  color: white;
  padding: 0.75rem 2rem;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  margin-top: 1rem;
  cursor: pointer;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;
  width: 300px;
`;

const ModalInput = styled.input`
  padding: 0.75rem;
  border-radius: 10px;
  border: 1px solid #ccc;
  font-size: 1rem;
`;

const ModalButton = styled.button`
  background: #D9632A;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    background: #F78839;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: transparent;
  border: none;
  cursor: pointer;
`;

const IconText = styled.span`
  font-size: 0.7rem;
  text-align: center;
  padding: 4px;
  color: #444;
  word-break: break-word;
`;
