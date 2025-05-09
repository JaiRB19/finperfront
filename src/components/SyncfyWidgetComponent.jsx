import React, { useEffect, useState } from 'react';
import api from './axios'; // Asegúrate de que la ruta sea correcta según tu estructura de proyecto

const SyncfyWidget = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // Función para inicializar el widget
    const initializeWidget = async () => {
      try {
        setIsLoading(true);
        
        // Obtener el token de autenticación del localStorage
        const authToken = localStorage.getItem('auth_token');
        
        if (!authToken) {
          throw new Error('No se encontró token de autenticación. Por favor inicia sesión primero.');
        }
        
        // Hacer petición a la ruta syncfy/start
        const { data } = await api.post('/api/syncfy/start', {}, {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json'
          }
        });
        
        // Guardar el token del widget en localStorage (opcional)
        if (data && data.response && data.response.token) {
          localStorage.setItem('syncfy_session_token', data.response.token);
          localStorage.setItem('syncfy_rid', data.rid);
        }
        
        // Obtener el token del widget que viene en la respuesta
        const widgetToken = data.response.token;
        
        if (!widgetToken) {
          throw new Error('No se recibió el token de Syncfy');
        }
        
        // Cargar el CSS del widget
        const linkEl = document.createElement('link');
        linkEl.rel = 'stylesheet';
        linkEl.href = 'https://www.paybook.com/sync/widget/v2/widget.css';
        document.head.appendChild(linkEl);
        
        // Cargar el script del widget
        const scriptEl = document.createElement('script');
        scriptEl.src = 'https://www.paybook.com/sync/widget/v2/widget.js';
        scriptEl.async = true;
        
        // Cuando el script termine de cargar, inicializar el widget
        scriptEl.onload = () => {
          const widgetSettings = {
            token: widgetToken, // Usar el token recibido de la API
            config: {
              locale: 'es', // Cambiado a español
            }
          };
          
          const syncWidget = new window.SyncWidget(widgetSettings);
          syncWidget.open();
          setIsLoading(false);
        };
        
        document.body.appendChild(scriptEl);
        
        // Limpiar cuando el componente se desmonte
        return () => {
          document.head.removeChild(linkEl);
          document.body.removeChild(scriptEl);
        };
      } catch (err) {
        console.error('Error al inicializar Syncfy Widget:', err);
        setError(err.message || 'Error al inicializar el widget');
        setIsLoading(false);
      }
    };
    
    initializeWidget();
  }, []);
  
  return (
    <div>
      <h1>Widget de Sincronización</h1>
      {isLoading && <p>Cargando widget...</p>}
      {error && <p className="error">Error: {error}</p>}
      <div id="widget"></div>
    </div>
  );
};

export default SyncfyWidget;