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
import { skillsMock } from 'mock/knowledges/list';
import { ISkill } from 'types/skill/Skill';

const PageListSkills = () => {
  const [skills, setSkills] = useState<ISkill[]>([]);
  const [knowledgeId, setKnowledgeId] = useState<number>();
  const [loading, setLoading] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const [attPage, setAttPage] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Conhecimento',
      flex: 1
    },
    {
      field: 'description',
      headerName: 'Descrição',
      flex: 1
    },
    {
      field: 'level',
      headerName: 'Nível',
      flex: 1,
      renderCell: (params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>) => {
        return <Typography> {params.row.level} / 10 </Typography>;
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
        return <SwitchDataGrid params={params} urlToggle="/skills/toggle-active" />;
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
            <RemoveDataGrid params={params} callBack={getRows} urlDelete="/skills" />
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
      const response = await api.get('/skills', { params: params_request });

      if (response.status === 200) {
        let a_skills: ISkill[] = [];
        response.data.map((knowledge: ISkill) => {
          a_skills.push({
            id: knowledge.id,
            createdAt: formateDate(knowledge.createdAt),
            updatedAt: formateDate(knowledge.updatedAt),
            name: knowledge.name,
            status: knowledge.status,
            description: knowledge.description,
            level: knowledge.level
          });
          return 0;
        });

        setSkills(a_skills);
      }
    } catch (error: any) {
      setSkills(skillsMock);
      console.log(error);
    }
    setLoading(false);
  };

  const handleEdit = (id: string) => {
    setKnowledgeId(+id);
    handleOpen();
  };

  const handleNew = () => {
    setKnowledgeId(0);
    handleOpen();
  };

  const handleCallbackNewCustomer = () => {
    setAttPage(!attPage);
  };

  return (
    <DefaultSession title="Listagem de habilidades" handleClickNew={handleNew}>
      <Grid container justifyContent="right" pb={2}>
        <SearchBar handleCallBack={getRows} hasName placeholderName='Ex: ReactJS' labelName='Conhecimento / Descrição' hasStatus />
      </Grid>
      <MainCard>
        {loading ? <LoadingCircular /> : skills.length ? <DataGridDefault rows={skills} columns={columns} /> : <NoData />}
      </MainCard>

      <ModalDefault open={open} handleClose={handleClose}>
        <FormContact handleCallBack={handleCallbackNewCustomer} id={knowledgeId} />
      </ModalDefault>
    </DefaultSession>
  );
};

export default PageListSkills;