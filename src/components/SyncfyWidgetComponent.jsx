import React, { useEffect } from "react";
import "@paybook/sync-widget/dist/widget.css";
import SyncWidget from "@paybook/sync-widget";

const SyncfyWidgetComponent = () => {
  useEffect(() => {
    const params = {
      token: "c48885860ce00e3b8926ef8ee5c27523d99493b7bb4c3416af4521e6255a09d8", 
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

    // Crear e inicializar el widget
    const syncWidget = new SyncWidget(params);
    syncWidget.open();

    return () => {
      syncWidget.close(); 
    };
  }, []);

  return (
    <div>
      <h2>Syncfy Widget</h2>
      <div id="widget"></div>
    </div>
  );
};

export default SyncfyWidgetComponent;
