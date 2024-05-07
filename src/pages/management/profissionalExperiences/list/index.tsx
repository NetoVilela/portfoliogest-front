/* eslint-disable prettier/prettier */
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
import FormContact from '../form';
import { IProfessionalExperience } from 'types/professionalExperience/professionalExperience';
import { professionalExperiencesMock } from 'mock/professionalExperiences/list';

const PageListProfessionalExperiences = () => {
  const [experiences, setExperiences] = useState<IProfessionalExperience[]>([]);
  const [experienceId, setExperienceId] = useState<number>();
  const [loading, setLoading] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const [attPage, setAttPage] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const columns: GridColDef[] = [
    {
      field: 'jobName',
      headerName: 'Cargo',
      flex: 1
    },
    {
      field: 'companyName',
      headerName: 'Empresa',
      flex: 1
    },
    {
      field: 'createdAt',
      headerName: 'Criado em',
      width: 200
    },
    {
      field: 'updatedAt',
      headerName: 'Última atualização',
      flex: 1
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      renderCell: (params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>) => {
        return <SwitchDataGrid params={params} urlToggle="/knowledges/toggle-active" />;
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
            <RemoveDataGrid params={params} callBack={getRows} urlDelete="/professional_experiences" />
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
      const response = await api.get('/professional_experiences', { params: params_request });

      if (response.status === 200) {
        let a_experiences: IProfessionalExperience[] = [];
        response.data.map((course: IProfessionalExperience) => {
          a_experiences.push({
            ...course,
            createdAt: formateDate(course.createdAt),
            updatedAt: formateDate(course.updatedAt),
          });
          return 0;
        });

        setExperiences(a_experiences);
      }
    } catch (error: any) {
      setExperiences(professionalExperiencesMock);
      console.log(error);
    }
    setLoading(false);
  };

  const handleEdit = (id: string) => {
    setExperienceId(+id);
    handleOpen();
  };

  const handleNew = () => {
    setExperienceId(0);
    handleOpen();
  };

  const handleCallbackNewExperience = () => {
    setAttPage(!attPage);
  };

  return (
    <DefaultSession title="Listagem de experiências" handleClickNew={handleNew}>
      <Grid container justifyContent="right" pb={2}>
        <SearchBar handleCallBack={getRows} hasName placeholderName='Ex: Estagiário' labelName='Experiência profissional' hasStatus />
      </Grid>
      <MainCard>
        {loading ? <LoadingCircular /> : experiences.length ? <DataGridDefault rows={experiences} columns={columns} /> : <NoData />}
      </MainCard>

      <ModalDefault open={open} handleClose={handleClose}>
        <FormContact handleCallBack={handleCallbackNewExperience} id={experienceId} />
      </ModalDefault>
    </DefaultSession>
  );
};

export default PageListProfessionalExperiences;