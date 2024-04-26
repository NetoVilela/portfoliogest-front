import { Grid } from '@mui/material';
import { GridColDef, GridRenderCellParams, GridTreeNodeWithRender } from '@mui/x-data-grid';
import { EditDataGrid } from 'components/Datagrid/Edit';
import { SwitchDataGrid } from 'components/Datagrid/Switch';
import { LoadingCircular } from 'components/Loading/LoadingCircular';
import MainCard from 'components/MainCard';
import { ModalDefault } from 'components/ModalDefault';
import { formateDate } from 'helpers/formateDate';
import { useEffect, useState } from 'react';
import { DefaultSession } from 'sections/Default';
import api from 'services/api';
import { SearchBar } from 'components/SearchBar';
import { NoData } from 'components/NoData';
import { FieldValues } from 'react-hook-form';
import { RemoveDataGrid } from 'components/Datagrid/Remove';
import { DataGridDefault } from 'components/Datagrid';
import { IPortfolio } from 'types/portfolio/Portfolio';
import { portfoliosMock } from 'mock/portfolios/list';
import { useNavigate } from 'react-router';

const PageListPortfolios = () => {
  const navigate = useNavigate();
  const [portfolios, setPortfolios] = useState<IPortfolio[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  // const [attPage, setAttPage] = useState<boolean>(false);
  // const [portfolioId, setPortfolioId] = useState<string>();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Portfólio',
      minWidth: 400,
      flex: 1
    },
    {
      field: 'createdAt',
      headerName: 'Criado em',
      width: 250
    },
    {
      field: 'updatedAt',
      headerName: 'Última atualização',
      minWidth: 100,
      flex: 1
    },
    {
      field: 'status',
      headerName: 'Status',
      minWidth: 100,
      flex: 1,
      renderCell: (params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>) => {
        return <SwitchDataGrid params={params} urlToggle="/portfolios/toggle-active" />;
      }
    },
    {
      field: 'actions',
      headerName: 'Ações',
      width: 100,
      renderCell: (params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>) => {
        return (
          <Grid display="flex" justifyContent="space-between" width="100%" alignItems="center">
            <EditDataGrid params={params} onClick={handleEdit} />
            <RemoveDataGrid params={params} callBack={getRows} urlDelete="/users" />
          </Grid>
        );
      }
    }
  ];

  useEffect(() => {
    getRows({});
  }, []);

  const getRows = async (data: FieldValues) => {
    setLoading(true);

    const { name, status } = data;
    const params_request = {
      ...(name && { name }),
      ...((status === 1 || status === 2) && { status: status === 1 })
    };

    try {
      const response = await api.get('/portfolios', { params: params_request });

      if (response.status === 200) {
        let a_portfolios: IPortfolio[] = [];
        response.data.map((portfolio: IPortfolio) => {
          a_portfolios.push({
            id: portfolio.id,
            createdAt: formateDate(portfolio.createdAt),
            updatedAt: formateDate(portfolio.updatedAt),
            name: portfolio.name,
            status: portfolio.status,
            apresentation: portfolio.apresentation
          });
          return 0;
        });

        setPortfolios(a_portfolios);
      }
    } catch (error: any) {
      setPortfolios(portfoliosMock);
      console.log(error);
    }
    setLoading(false);
  };

  const handleEdit = (id: string) => {
    // setPortfolioId(id);
    navigate(`/management/portfolios/form/${id}`);
    handleOpen();
  };

  // const handleCallbackNewCustomer = () => {
  //   setAttPage(!attPage);
  // };

  return (
    <DefaultSession title="Listagem de portfólios" redirectUrl={'/management/portfolios/form'}>
      <Grid container justifyContent="right" pb={2}>
        <SearchBar handleCallBack={getRows} hasName hasStatus />
      </Grid>
      <MainCard>
        {loading ? <LoadingCircular /> : portfolios.length ? <DataGridDefault rows={portfolios} columns={columns} /> : <NoData />}
      </MainCard>

      <ModalDefault open={open} handleClose={handleClose}>
        <>a</>
        {/* <FormUser handleCallBack={handleCallbackNewCustomer} id={userId} /> */}
      </ModalDefault>
    </DefaultSession>
  );
};

export default PageListPortfolios;
