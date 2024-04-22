import { Grid } from '@mui/material';
import { GridColDef, GridEventListener, GridRenderCellParams, GridTreeNodeWithRender } from '@mui/x-data-grid';
import { LoadingCircular } from 'components/Loading/LoadingCircular';
import MainCard from 'components/MainCard';
import { formateDate } from 'helpers/formateDate';
import { useEffect, useState } from 'react';
import { DefaultSession } from 'sections/Default';
import api from 'services/api';
import { SearchBar } from 'components/SearchBar';
import { NoData } from 'components/NoData';
import { FieldValues } from 'react-hook-form';
import { IRecommendation } from 'types/recommendation/Recommendation';
import { IRecommendationAPI } from 'types/recommendation/RecommendationAPI';
import { DataGridDefault } from 'components/Datagrid';
import { PriorityDataGrid } from 'components/Datagrid/Priority';
import { TabRecommendations } from 'components/TabRecommendations';
// import { RecommendationsActionBar } from 'components/RecommendationsActionBar';
import { TakeOwnerShip } from 'components/Datagrid/TakeOwnerShip';
import { MarkAsNotRelevant } from 'components/Datagrid/MarkAsNotRelevant';
import { RequestCallBack } from 'components/Datagrid/RequestCallBack';
import { HideFor } from 'components/Datagrid/HideFor';
import useAuth from 'hooks/useAuth';
import { IconCategory } from 'components/Datagrid/IconCategory';
import { FixItBy } from 'components/Datagrid/FixItBy';

const PageListRecommendations = () => {
  const [recommendations, setRecommendations] = useState<IRecommendation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [recommendationId, setRecommendationId] = useState<number>(0);
  const [attPage, setAttPage] = useState<boolean>(false);

  const { user } = useAuth();
  const profileId = user?.profileId || 0;

  const columns: GridColDef[] = [
    {
      field: 'recommendationsCategoryName',
      headerName: 'Category',
      width: 80,
      renderCell: (params) => {
        return <IconCategory params={params} />;
      }
    },
    {
      field: 'findingTitle',
      headerName: 'Finding',
      headerAlign: 'center',
      minWidth: 250,
      flex: 1
    },
    {
      field: 'recommendationsPriorityId',
      headerName: 'Priority',
      minWidth: 100,
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        return <PriorityDataGrid params={params} />;
      }
    },
    {
      field: 'userImpact',
      headerName: 'User impact',
      minWidth: 150,
      flex: 1
    },
    {
      field: 'recommendationsSituationName',
      headerName: 'Status',
      minWidth: 140,
      flex: 1
    },
    {
      field: 'dateFound',
      headerName: 'Date found',
      minWidth: 100,
      flex: 1
    },
    {
      field: 'completion',
      headerName: 'Completion',
      minWidth: 100,
      flex: 1
    },
    {
      field: 'ownerUserName',
      headerName: 'Owner',
      headerAlign: 'center',
      minWidth: 120,
      flex: 1
    },

    ...(profileId !== 4
      ? [
          {
            field: 'actions',
            headerName: 'Actions',
            minWidth: 220,
            flex: 1,
            renderCell: (params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>) => {
              return (
                <Grid container>
                  <TakeOwnerShip attPage={attPage} setAttPage={setAttPage} params={params} />
                  <MarkAsNotRelevant attPage={attPage} setAttPage={setAttPage} params={params} />
                  <RequestCallBack attPage={attPage} setAttPage={setAttPage} params={params} />
                  <HideFor attPage={attPage} setAttPage={setAttPage} params={params} />
                  <FixItBy attPage={attPage} setAttPage={setAttPage} params={params} />
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
    setRecommendationId(0);

    const { text, hidden, archived, category } = data;
    const params_request = {
      ...(text && { text }),
      ...(category && { category }),
      ...(hidden ? (hidden === 1 || hidden === 2 ? { hidden: hidden === 1 } : {}) : { hidden: false }),
      ...((archived === 1 || archived === 2) && { status: archived === 1 })
    };

    try {
      const response = await api.get('/recommendations', { params: params_request });

      if (response.status === 200) {
        let a_recommendations: IRecommendation[] = [];
        response.data.map((rec: IRecommendationAPI) => {
          a_recommendations.push({
            ...rec,
            dateFound: formateDate(rec.dateFound),
            recommendationsSituationName: rec.recommendationsSituation?.name || '--',
            recommendationsPriorityName: rec.recommendationsPriority?.name || '--',
            recommendationsCategoryName: rec.recommendationsCategory?.name || '--',
            ownerUserName: rec.ownerUser?.name || '--',
            fixUserName: rec.fixUser?.name || '--'
          });
          return 0;
        });

        setRecommendations(a_recommendations);
      }
    } catch (error: any) {
      console.log(error);
    }
    setLoading(false);
  };

  // const handleSelectRows = (rowSelectionModel: GridRowSelectionModel, details: GridCallbackDetails<any>) => {
  //   const id = rowSelectionModel.shift();
  //   setRecommendationId(id as number);
  // };

  const handleRowClick: GridEventListener<'rowClick'> = (params) => {
    setRecommendationId(+params.id);
  };

  return (
    <DefaultSession title="Recommendations">
      <Grid container justifyContent="right" pb={2}>
        <SearchBar handleCallBack={getRows} hasTextRecommendation hasHidden hasArchived hasCategory />
      </Grid>

      <MainCard>
        {loading ? (
          <LoadingCircular />
        ) : recommendations.length ? (
          <>
            {/* <RecommendationsActionBar recommendationId={recommendationId} setAttPage={setAttPage} attPage={attPage} /> */}
            <DataGridDefault rows={recommendations} columns={columns} density="compact" handleRowClick={handleRowClick} />
          </>
        ) : (
          <NoData />
        )}
      </MainCard>

      {!!recommendations.length && (
        <MainCard sx={{ marginTop: '20px' }}>
          <TabRecommendations id={recommendationId} />
        </MainCard>
      )}
    </DefaultSession>
  );
};

export default PageListRecommendations;
