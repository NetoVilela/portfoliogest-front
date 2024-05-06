/* eslint-disable prettier/prettier */
import { Grid, Typography } from '@mui/material';
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
import { projectsMock } from 'mock/projects/list';
import { IProject } from 'types/project/Project';
import { projectSituations } from 'utils/datas_mock/projects/obj_project_situations';

const PageListProjects = () => {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [projectId, setProjectId] = useState<number>();
  const [loading, setLoading] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const [attPage, setAttPage] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const columns: GridColDef[] = [
    {
      field: 'title',
      headerName: 'Título',
      flex: 1
    },
    {
      field: 'description',
      headerName: 'Descrição',
      flex: 1
    },
    {
      field: 'situation',
      headerName: 'Situação',
      flex: 1,
      renderCell: (params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>) => {
        return <Typography> {projectSituations[params.row.situation as "schematized" | "in_development" | "finished"]} </Typography>;
      }
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
            <RemoveDataGrid params={params} callBack={getRows} urlDelete="/knowledges" />
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
      const response = await api.get('/projects', { params: params_request });

      if (response.status === 200) {
        let a_projects: IProject[] = [];
        response.data.map((project: IProject) => {
          a_projects.push({
            ...project,
            createdAt: formateDate(project.createdAt),
            updatedAt: formateDate(project.updatedAt),
          });
          return 0;
        });

        setProjects(a_projects);
      }
    } catch (error: any) {
      setProjects(projectsMock);
      console.log(error);
    }
    setLoading(false);
  };

  const handleEdit = (id: string) => {
    setProjectId(+id);
    handleOpen();
  };

  const handleNew = () => {
    setProjectId(0);
    handleOpen();
  };

  const handleCallbackNewProject = () => {
    setAttPage(!attPage);
  };

  return (
    <DefaultSession title="Listagem de projetos" handleClickNew={handleNew}>
      <Grid container justifyContent="right" pb={2}>
        <SearchBar handleCallBack={getRows} hasName placeholderName='Ex: Lista de tarefas' labelName='Título / Descrição' hasStatus />
      </Grid>
      <MainCard>
        {loading ? <LoadingCircular /> : projects.length ? <DataGridDefault rows={projects} columns={columns} /> : <NoData />}
      </MainCard>

      <ModalDefault open={open} handleClose={handleClose}>
        <FormContact handleCallBack={handleCallbackNewProject} id={projectId} />
      </ModalDefault>
    </DefaultSession>
  );
};

export default PageListProjects;