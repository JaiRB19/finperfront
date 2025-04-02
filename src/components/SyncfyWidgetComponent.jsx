import React, { useState, useEffect, useRef } from "react";
import "@paybook/sync-widget/dist/widget.css";
import SyncWidget from "@paybook/sync-widget";

import styled from 'styled-components';

const SyncfyWidgetComponent = () => {
  const [isWidgetOpen, setIsWidgetOpen] = useState(false);
  const syncWidgetRef = useRef(null);

  useEffect(() => {
    const params = {
      token: "1d4efd3ee37336d51607995e93d0d4bcb7886e73dbc5ba4a742c8de0c9caa983",
      config: {
        locale: "es",
        entrypoint: {
          country: "MX",
          siteOrganizationType: "56cf4f5b784806cf028b4568",
        },
        navigation: {
          displayStatusInToast: true,
        },
      },
    };

    syncWidgetRef.current = new SyncWidget(params);
    
    return () => {
      if (isWidgetOpen && syncWidgetRef.current) {
        syncWidgetRef.current.close();
      }
    };
  }, []);

  const handleOpenWidget = () => {
    if (syncWidgetRef.current) {
      syncWidgetRef.current.open();
      setIsWidgetOpen(true);
    }
  };

  const handleCloseWidget = () => {
    if (syncWidgetRef.current) {
      syncWidgetRef.current.close();
      setIsWidgetOpen(false);
    }
  };

  return (
    <WidgetContainer>
      <WidgetTitle>Syncfy Widget</WidgetTitle>
      
      {!isWidgetOpen ? (
        <OpenWidgetButton onClick={handleOpenWidget}>
          Abrir Widget de Sincronización
        </OpenWidgetButton>
      ) : (
        <OpenWidgetButton onClick={handleCloseWidget}>
          Cerrar Widget
        </OpenWidgetButton>
      )}
      
      <WidgetContent id="widget" />
    </WidgetContainer>
  );
};

export default SyncfyWidgetComponent;

const WidgetContainer = styled.div`
  background-color: #f8f9fa;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 20px;
  width: 70%;
  margin-left: auto;
  margin-right: auto;
`;

const WidgetTitle = styled.h2`
  color: #FF7F50;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 16px;
  text-align: center;
  border-bottom: 2px solid #e2e8f0;
  padding-bottom: 10px;
`;

const WidgetContent = styled.div`
  min-height: 400px;
  border-radius: 8px;
  background-color: white;
  
  /* Puedes sobrescribir algunos estilos del widget aquí */
  & .sync-widget-container {
    border-radius: 8px;
  }
`;

const OpenWidgetButton = styled.button`
  background-color: #D9632A;
  color: white;
  font-weight: 600;
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin: 20px auto;
  display: block;
  font-size: 16px;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #F78839;
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(30, 64, 175, 0.3);
  }
`;