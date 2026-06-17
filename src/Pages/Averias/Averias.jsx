import { useEffect, useState } from "react";
import DashboardLayout from "../../Components/DashboardLayout/DashboardLayout";
import ReportesAverias from "../../Components/ReportesAverias/ReportesAverias";
import "./Averias.css";

export default function Averias() {
  return (
    <DashboardLayout title="Control de Averías">
      <div className="averias-container">
        <div className="averias-header">
          <h1>Reportes de Averías del Sistema</h1>
          <p>Visualización de todos los reportes de avería creados</p>
        </div>
        
        <ReportesAverias />
      </div>
    </DashboardLayout>
  );
}
