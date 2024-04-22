import { Grid } from '@mui/material';
import { DataGrid, GridCallbackDetails, GridColDef, GridDensity, GridEventListener, GridRowSelectionModel } from '@mui/x-data-grid';
import { useState } from 'react';

type Props = {
  rows: any;
  columns: GridColDef[];
  checkboxSelection?: boolean;
  density?: GridDensity | undefined;
  handleSelectRows?: ((rowSelectionModel: GridRowSelectionModel, details: GridCallbackDetails<any>) => void) | undefined;
  handleRowClick?: GridEventListener<'rowClick'> | undefined;
};

export const DataGridDefault = ({
  rows,
  columns,
  checkboxSelection = false,
  density = 'compact',
  handleSelectRows,
  handleRowClick
}: Props) => {
  const [selectedRow, setSelectedRow] = useState<number>();

  const handleRowClickIntern: GridEventListener<'rowClick'> = (params, event, details) => {
    setSelectedRow(+params.id);
    if (handleRowClick) {
      handleRowClick(params, event, details);
    }
  };

  return (
    <Grid>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10
            }
          }
        }}
        autoHeight
        style={{
          fontSize: '14px'
        }}
        pageSizeOptions={[10]}
        onRowClick={handleRowClickIntern}
        disableRowSelectionOnClick
        checkboxSelection={checkboxSelection}
        density={density}
        onRowSelectionModelChange={handleSelectRows}
        getRowClassName={(params) => {
          return selectedRow === params.id ? 'selected-row' : '';
        }}
        sx={{
          '& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer': {
            display: 'none'
          },
          cursor: 'pointer',
          '& .selected-row': {
            backgroundColor: '#f0f0f0'
          }
        }}
        {...(handleSelectRows && { onRowSelectionModelChange: handleSelectRows })}
      />
    </Grid>
  );
};
