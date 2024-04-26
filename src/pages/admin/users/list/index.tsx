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
import { IUser } from 'types/user/User';
import { IUserAPI } from 'types/user/UserAPI';
import FormUser from '../form';
import { DataGridDefault } from 'components/Datagrid';
import useAuth from 'hooks/useAuth';
import { usersMock } from 'mock/users/list';
import { UserInfo } from './components/UserInfo';

const PageListUsers = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const [attPage, setAttPage] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { user } = useAuth();
  const profileId = user?.profileId || 0;

  const columns: GridColDef[] = [
    { field: 'userId', headerName: 'ID', width: 90 },
    {
      field: 'user',
      headerName: 'Usuário',
      minWidth: 400,
      flex: 1,
      renderCell: (params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>) => {
        return <UserInfo params={params} />;
      }
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 250
    },
    {
      field: 'roleName',
      headerName: 'Perfil',
      minWidth: 100,
      flex: 1
    },

    ...(profileId !== 4
      ? [
          {
            field: 'status',
            headerName: 'Status',
            renderCell: (params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>) => {
              return <SwitchDataGrid params={params} urlToggle="/users/toggle-active" />;
            }
          },
          {
            field: 'actions',
            headerName: 'Actions',
            width: 100,
            renderCell: (params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>) => {
              return (
                <Grid display="flex" justifyContent="space-between" width="100%" alignItems="center">
                  <EditDataGrid params={params} onClick={handleEdit} />
                  {params.row.id !== user?.id && <RemoveDataGrid params={params} callBack={getRows} urlDelete="/users" />}
                </Grid>
              );
            }
          }
        ]
      : [])
  ];

  useEffect(() => {
    getRows({});
  }, [attPage]);

  const getRows = async (data: FieldValues) => {
    setLoading(true);

    const { name, status } = data;
    const params_request = {
      ...(name && { name }),
      ...((status === 1 || status === 2) && { status: status === 1 })
    };

    try {
      const response = await api.get('/users', { params: params_request });

      if (response.status === 200) {
        let a_users: IUser[] = [];
        response.data.map((user: IUserAPI) => {
          a_users.push({
            id: user.id,
            userId: user.user_id,
            createdAt: formateDate(user.createdAt),
            name: user.name,
            status: user.status,
            email: user.email,
            roleName: user?.role?.name || '--'
          });
          return 0;
        });

        setUsers(a_users);
      }
    } catch (error: any) {
      setUsers(usersMock);
      console.log(error);
    }
    setLoading(false);
  };

  const handleNew = () => {
    setUserId('');
    handleOpen();
  };

  const handleEdit = (id: string) => {
    console.log(id);
    setUserId(id);
    handleOpen();
  };

  const handleCallbackNewCustomer = () => {
    setAttPage(!attPage);
  };

  return (
    <DefaultSession title="Listagem de usuários" handleClickNew={handleNew}>
      <Grid container justifyContent="right" pb={2}>
        <SearchBar handleCallBack={getRows} hasNameOrEmail hasStatus />
      </Grid>
      <MainCard>{loading ? <LoadingCircular /> : users.length ? <DataGridDefault rows={users} columns={columns} /> : <NoData />}</MainCard>

      <ModalDefault open={open} handleClose={handleClose}>
        <FormUser handleCallBack={handleCallbackNewCustomer} id={userId} />
      </ModalDefault>
    </DefaultSession>
  );
};

export default PageListUsers;
