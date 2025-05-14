import React, { useState } from 'react';
import styled from 'styled-components';
import { CheckCircle, Clock, PlusCircle, Edit, Trash, X, Save, AlertTriangle } from 'lucide-react';

const MetasAhorroView = () => {
  const [goals, setGoals] = useState([
    { id: 1, title: 'Fondo de Emergencia', current: 6000, target: 10000, deadline: '2025-06-30' },
    { id: 2, title: 'Vacaciones', current: 4000, target: 10000, deadline: '2025-08-15' },
    { id: 3, title: 'Compra de Auto', current: 15000, target: 30000, deadline: '2025-12-20' },
    { id: 4, title: 'Renovación Hogar', current: 8000, target: 20000, deadline: '2025-11-10' }
  ]);
  
  const [newGoal, setNewGoal] = useState({ title: '', current: 0, target: 0, deadline: '' });
  const [editingGoal, setEditingGoal] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);

  const handleAddGoal = () => {
    if (newGoal.title && newGoal.target > 0) {
      setGoals([...goals, { ...newGoal, id: Date.now() }]);
      setNewGoal({ title: '', current: 0, target: 0, deadline: '' });
    }
  };

  const startEditing = (goal) => {
    setEditingGoal({ ...goal });
  };

  const cancelEditing = () => {
    setEditingGoal(null);
  };

  const saveEditedGoal = () => {
    if (editingGoal && editingGoal.title && editingGoal.target > 0) {
      setGoals(goals.map(goal => 
        goal.id === editingGoal.id ? editingGoal : goal
      ));
      setEditingGoal(null);
    }
  };

  const handleDeleteConfirmation = (id) => {
    setDeleteConfirmation(id);
  };

  const confirmDelete = () => {
    if (deleteConfirmation) {
      setGoals(goals.filter((goal) => goal.id !== deleteConfirmation));
      setDeleteConfirmation(null);
    }
  };

  const cancelDelete = () => {
    setDeleteConfirmation(null);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
      });
    } catch (e) {
      return dateString;
    }
  };

  return (
    <Container>
      <Header>Metas de Ahorro</Header>

      <AddGoalContainer>
        <InputField
          type="text"
          placeholder="Título"
          value={newGoal.title}
          onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
        />
        <InputField
          type="number"
          placeholder="Monto Actual"
          width="120px"
          value={newGoal.current || ''}
          onChange={(e) => setNewGoal({ ...newGoal, current: parseInt(e.target.value) || 0 })}
        />
        <InputField
          type="number"
          placeholder="Meta Objetivo"
          width="120px"
          value={newGoal.target || ''}
          onChange={(e) => setNewGoal({ ...newGoal, target: parseInt(e.target.value) || 0 })}
        />
        <InputField
          type="date"
          placeholder="Fecha Límite"
          width="160px"
          value={newGoal.deadline}
          onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
        />
        <AddButton onClick={handleAddGoal}>
          <PlusCircle size={20} />
          <span>Agregar</span>
        </AddButton>
      </AddGoalContainer>

      <GoalsList>
        {goals.map((goal) => {
          const percentage = Math.min((goal.current / goal.target) * 100, 100);
          const isCompleted = percentage === 100;
          const isEditing = editingGoal && editingGoal.id === goal.id;
          const isDeleting = deleteConfirmation === goal.id;

          return (
            <GoalCard key={goal.id} completed={isCompleted}>
              {isEditing ? (
                <EditContainer>
                  <EditHeader>
                    <EditTitle>Editar Meta</EditTitle>
                    <ButtonGroup>
                      <ActionButton color="#007AFF" onClick={saveEditedGoal}>
                        <Save size={16} />
                        <span>Guardar</span>
                      </ActionButton>
                      <ActionButton color="#8E8E93" onClick={cancelEditing}>
                        <X size={16} />
                        <span>Cancelar</span>
                      </ActionButton>
                    </ButtonGroup>
                  </EditHeader>
                  
                  <EditGrid>
                    <EditField>
                      <FieldLabel>Título</FieldLabel>
                      <InputField
                        type="text"
                        value={editingGoal.title}
                        onChange={(e) => setEditingGoal({ ...editingGoal, title: e.target.value })}
                      />
                    </EditField>
                    <EditField>
                      <FieldLabel>Monto Actual (MXN)</FieldLabel>
                      <InputField
                        type="number"
                        value={editingGoal.current || ''}
                        onChange={(e) => setEditingGoal({ ...editingGoal, current: parseInt(e.target.value) || 0 })}
                      />
                    </EditField>
                    <EditField>
                      <FieldLabel>Meta Objetivo (MXN)</FieldLabel>
                      <InputField
                        type="number"
                        value={editingGoal.target || ''}
                        onChange={(e) => setEditingGoal({ ...editingGoal, target: parseInt(e.target.value) || 0 })}
                      />
                    </EditField>
                    <EditField>
                      <FieldLabel>Fecha Límite</FieldLabel>
                      <InputField
                        type="date"
                        value={editingGoal.deadline}
                        onChange={(e) => setEditingGoal({ ...editingGoal, deadline: e.target.value })}
                      />
                    </EditField>
                  </EditGrid>
                </EditContainer>
              ) : isDeleting ? (
                <DeleteContainer>
                  <DeleteHeader>
                    <AlertTriangle color="#FF3B30" size={20} />
                    <DeleteTitle>¿Eliminar esta meta?</DeleteTitle>
                  </DeleteHeader>
                  
                  <DeleteMessage>
                    ¿Estás seguro que deseas eliminar la meta "{goal.title}"? Esta acción no se puede deshacer.
                  </DeleteMessage>
                  
                  <DeleteActions>
                    <ActionButton color="#FF3B30" onClick={confirmDelete}>
                      Confirmar Eliminación
                    </ActionButton>
                    <ActionButton color="#8E8E93" onClick={cancelDelete}>
                      Cancelar
                    </ActionButton>
                  </DeleteActions>
                </DeleteContainer>
              ) : (
                <>
                  <GoalHeader>
                    {isCompleted ? (
                      <CheckCircle color="#34C759" size={20} />
                    ) : (
                      <Clock color="#FF9500" size={20} />
                    )}
                    <GoalTitle>{goal.title}</GoalTitle>
                    <IconButton onClick={() => startEditing(goal)}>
                      <Edit size={18} color="#007AFF" />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteConfirmation(goal.id)}>
                      <Trash size={18} color="#FF3B30" />
                    </IconButton>
                  </GoalHeader>
                  
                  <ProgressBar>
                    <ProgressFill 
                      percentage={percentage} 
                      completed={isCompleted}
                    />
                  </ProgressBar>
                  
                  <GoalStats>
                    <StatsText>
                      {goal.current.toLocaleString()} MXN / {goal.target.toLocaleString()} MXN ({percentage.toFixed(1)}%)
                    </StatsText>
                    <StatsText>
                      Fecha límite: {formatDate(goal.deadline)}
                    </StatsText>
                  </GoalStats>
                </>
              )}
            </GoalCard>
          );
        })}
        
        {goals.length === 0 && (
          <EmptyState>
            No hay metas de ahorro. ¡Agrega una para comenzar!
          </EmptyState>
        )}
      </GoalsList>
    </Container>
  );
};

export default MetasAhorroView;

// Styled Components
const Container = styled.div`
  padding: 24px;
  width: 100%;
`;

const Header = styled.h2`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 20px;
  color: #000;
`;

const AddGoalContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
  padding: 16px;
  background-color: #f9f9fb;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`;

const InputField = styled.input`
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #E5E5EA;
  font-size: 14px;
  flex-grow: ${props => props.width ? '0' : '1'};
  width: ${props => props.width || 'auto'};
  
  &:focus {
    outline: none;
    border-color: #007AFF;
    box-shadow: 0 0 0 2px rgba(0, 122, 255, 0.1);
  }
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  background-color: #34C759;
  color: white;
  padding: 10px 14px;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #2EAF4F;
  }
`;

const GoalsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const GoalCard = styled.div`
  background-color: #FFFFFF;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border-left: 4px solid ${props => props.completed ? '#34C759' : '#FF9500'};
`;

const GoalHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
`;

const GoalTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1C1C1E;
  flex-grow: 1;
  margin: 0;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #F2F2F7;
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background-color: #E5E5EA;
  border-radius: 4px;
  margin-bottom: 12px;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  width: ${props => props.percentage}%;
  background-color: ${props => props.completed ? '#34C759' : '#FF9500'};
  border-radius: 4px;
  transition: width 0.3s ease-in-out;
`;

const GoalStats = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const StatsText = styled.span`
  font-size: 14px;
  color: #8E8E93;
`;

const EditContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const EditHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const EditTitle = styled.h4`
  font-size: 16px;
  font-weight: 600;
  color: #1C1C1E;
  margin: 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  background-color: ${props => props.color};
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.2s;
  
  &:hover {
    opacity: 0.9;
  }
`;

const EditGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
`;

const EditField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const FieldLabel = styled.label`
  font-size: 13px;
  color: #8E8E93;
`;

const DeleteContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const DeleteHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const DeleteTitle = styled.h4`
  font-size: 16px;
  font-weight: 600;
  color: #FF3B30;
  margin: 0;
`;

const DeleteMessage = styled.p`
  font-size: 14px;
  color: #3C3C43;
  margin: 0;
`;

const DeleteActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px 0;
  color: #8E8E93;
  font-size: 16px;
`;