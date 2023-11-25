import React, { useEffect, useState } from 'react';
import { Box } from "@mui/material";
import DataGrid from "../../components/DataGrid";
import { apiGet } from '../../middlewares/communicationMiddleware';

const Dashboard = () => {
  const [brandList, setBrandList] = useState([]);
  
  useEffect(() => {
  getBrands();
  }, []);

   const getBrands = async () => {
    const response = await apiGet("/marca");
    setBrandList(response.data);
  }

   const rows = brandList.map((brand) => ({
    id: brand.codigo,
    name: brand.nome,
    type: brand.tipo
  }));

  const columns = [
    { field: "id", headerName: "Código", headerAlign: "center", align: "center", minWidth: 120 },
    { field: "name", headerName: "Nome", minWidth: 650 },
    { field: "type", headerName: "Tipo", minWidth: 100 }
  ];

  return (
    <Box sx={{margin: "20px", marginTop: "5px"}}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <div style={{ height: 800, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
          />
        </div>
      </Box>
    </Box>
  );
};

export default Dashboard;
