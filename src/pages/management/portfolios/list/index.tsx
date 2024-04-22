import { Grid } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { LoadingCircular } from 'components/Loading/LoadingCircular';
import MainCard from 'components/MainCard';
import { useEffect, useState } from 'react';
import { DefaultSession } from 'sections/Default';
import { SearchBar } from 'components/SearchBar';
import { NoData } from 'components/NoData';
import { FieldValues } from 'react-hook-form';
import { DataGridDefault } from 'components/Datagrid';
import { IPortfolio } from 'types/portfolio/Portfolio';
import { portfoliosMock } from 'mock/portfolios/list';

const PageListPortfolios = () => {
  const [portfolios, setPortfolios] = useState<IPortfolio[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Nome',
      headerAlign: 'center',
      minWidth: 250,
      flex: 1
    },
    {
      field: 'apresentation',
      headerName: 'Apresentação',
      minWidth: 100,
      flex: 1
    },
    {
      field: 'createdAt',
      headerName: 'Criado em',
      minWidth: 150,
      flex: 1
    },
    {
      field: 'updatedAt',
      headerName: 'Atualizado em',
      minWidth: 150,
      flex: 1
    }
  ];

  useEffect(() => {
    getRows({});
  }, []);

  const getRows = async (data: FieldValues) => {
    setLoading(true);

    setPortfolios(portfoliosMock);
    setLoading(false);
  };

  return (
    <DefaultSession title="Meus portfólios">
      <Grid container justifyContent="right" pb={2}>
        <SearchBar handleCallBack={getRows} hasName hasHidden hasArchived hasCategory />
      </Grid>

      <MainCard>
        {loading ? (
          <LoadingCircular />
        ) : portfolios.length ? (
          <>
            <DataGridDefault rows={portfolios} columns={columns} density="compact" />
          </>
        ) : (
          <NoData />
        )}
      </MainCard>
    </DefaultSession>
  );
};

export default PageListPortfolios;
