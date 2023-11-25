import React, { useState } from "react";
import { DataGrid, ptBR } from "@mui/x-data-grid";

const TranslatedDataGrid = ({ rows, columns, pageSize, onRowDoubleClick }) => {
    const rowsPerPageOptions = [5, 10, 25];
    const [gridPageSize, setGridPageSize] = useState(pageSize);

    
    const rowDoubleClickHandler = (params) => {
         if (onRowDoubleClick) {
            onRowDoubleClick(params.row);
        }
    };

    return (
        <div style={{ height: 530, width: '100%' }}>
            <DataGrid
            getRowId={(row) => row.id}
            rows={rows}
            columns={columns}
            localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
            pageSize={gridPageSize}
            onPageSizeChange={(newPageSize) => setGridPageSize(newPageSize)}
            pagination
            rowsPerPageOptions={rowsPerPageOptions}
            rowHeight={40}
            onRowDoubleClick={rowDoubleClickHandler}
            />
        </div>
    );
};

export default TranslatedDataGrid;
