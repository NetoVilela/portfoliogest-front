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
import { ICourse } from 'types/course/Course';
import { coursesMock } from 'mock/courses/list';
import { getDegreeById } from 'helpers/degree/getDegreeById';
import { courseSituations } from 'utils/datas_mock/courses/obj_course_situations';

const PageListCourses = () => {
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [courseId, setCourseId] = useState<number>();
  const [loading, setLoading] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const [attPage, setAttPage] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Curso',
      flex: 1
    },
    {
      field: 'institutionAcronym',
      headerName: 'Instituição',
      flex: 1
    },
    {
      field: 'degree',
      headerName: 'Grau',
      flex: 1,
      renderCell: (params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>) => {
        return <Typography> {getDegreeById(params.row.degree)} </Typography>;
      }
    },
    {
      field: 'situation',
      headerName: 'Situação',
      flex: 1,
      renderCell: (params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>) => {
        return <Typography> {courseSituations[params.row.situation as "in_progress" | "paused" | "concluded"]} </Typography>;
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
      const response = await api.get('/courses', { params: params_request });

      if (response.status === 200) {
        let a_courses: ICourse[] = [];
        response.data.map((course: ICourse) => {
          a_courses.push({
            ...course,
            createdAt: formateDate(course.createdAt),
            updatedAt: formateDate(course.updatedAt),
          });
          return 0;
        });

        setCourses(a_courses);
      }
    } catch (error: any) {
      setCourses(coursesMock);
      console.log(error);
    }
    setLoading(false);
  };

  const handleEdit = (id: string) => {
    setCourseId(+id);
    handleOpen();
  };

  const handleNew = () => {
    setCourseId(0);
    handleOpen();
  };

  const handleCallbackNewCourse = () => {
    setAttPage(!attPage);
  };

  return (
    <DefaultSession title="Listagem de cursos" handleClickNew={handleNew}>
      <Grid container justifyContent="right" pb={2}>
        <SearchBar handleCallBack={getRows} hasName placeholderName='Ex: Informática' labelName='Curso' hasStatus />
      </Grid>
      <MainCard>
        {loading ? <LoadingCircular /> : courses.length ? <DataGridDefault rows={courses} columns={columns} /> : <NoData />}
      </MainCard>

      <ModalDefault open={open} handleClose={handleClose}>
        <FormContact handleCallBack={handleCallbackNewCourse} id={courseId} />
      </ModalDefault>
    </DefaultSession>
  );
};

export default PageListCourses;