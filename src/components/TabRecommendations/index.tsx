/* eslint-disable jsx-a11y/iframe-has-title */
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import api from 'services/api';
import { useEffect, useState } from 'react';
import { IRecommendationAPI } from 'types/recommendation/RecommendationAPI';
import { LoadingCircular } from 'components/Loading/LoadingCircular';
import { Grid } from '@mui/material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export const NoData = () => {
  return (
    <Grid container justifyContent="center">
      <Typography fontWeight="bold">No data</Typography>
    </Grid>
  );
};

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

type PropsContentTab = {
  title: string;
  text: string;
  loading: boolean;
};
const ContentTab = ({ title, text, loading }: PropsContentTab) => {
  if (loading) {
    return <LoadingCircular minHeight="0" />;
  }

  return (
    <Grid container>
      {text ? (
        <>
          <Grid item xs={12}>
            <Typography variant="h6" fontWeight="bold" textAlign="justify">
              {title}
            </Typography>
          </Grid>
          <br />
          <Grid item xs={12}>
            <Typography variant="body1" textAlign="justify">
              {text}
            </Typography>
          </Grid>
        </>
      ) : (
        <NoData />
      )}
    </Grid>
  );
};

type Props = {
  id: number;
};
export const TabRecommendations = ({ id }: Props) => {
  const [value, setValue] = useState(0);
  const [recommendation, setRecommendation] = useState<IRecommendationAPI>();
  const [loading, setLoading] = useState(false);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (id) {
      getData(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const getData = async (id: number) => {
    setLoading(true);
    try {
      const response = await api.get(`/recommendations/${id}`);

      if (response.status === 200) {
        setRecommendation(response.data);
      }
    } catch (error: any) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="tab recommendations" variant="scrollable" scrollButtons="auto">
          <Tab label="FINDING" {...a11yProps(0)} />
          <Tab label="RECOMMENDATION" {...a11yProps(1)} />
          <Tab label="IMPACT" {...a11yProps(2)} />
          <Tab label="USE FULL LINKS" {...a11yProps(3)} />
          <Tab label="WATCH VIDEO" {...a11yProps(4)} />
          <Tab label="AUDIT LOGS" {...a11yProps(5)} />
          <Tab label="FIX IT BY" {...a11yProps(6)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <ContentTab loading={loading} title={recommendation?.findingTitle as string} text={recommendation?.findingText as string} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <ContentTab loading={loading} title="Recommendation" text={recommendation?.recommendationText as string} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <ContentTab loading={loading} title={recommendation?.userImpact as string} text={recommendation?.impactText as string} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <Grid container>
          {recommendation?.recommendationsLink.length ? (
            <>
              <Typography variant="h6" fontWeight="bold" textAlign="justify">
                Links:
              </Typography>
              {recommendation?.recommendationsLink.map((link, index) => {
                return (
                  <Grid key={index + 1} item xs={12}>
                    <a href={link.link}>{link.link}</a>
                  </Grid>
                );
              })}
            </>
          ) : (
            <NoData />
          )}
        </Grid>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        <Grid container justifyContent="center">
          <iframe
            width="560"
            height="315"
            src={recommendation?.watchVideoLink as string}
            title="Watch video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </Grid>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={5}>
        <Grid container>
          {recommendation?.recommendationsLog.length ? (
            <>
              <Typography variant="h6" fontWeight="bold" textAlign="justify">
                Logs:
              </Typography>
              {recommendation?.recommendationsLog &&
                recommendation?.recommendationsLog.map((log, index) => {
                  return (
                    <Grid key={index + 1} item xs={12}>
                      <Typography sx={{ fontStyle: 'italic' }}>- {log.text}</Typography>
                    </Grid>
                  );
                })}
            </>
          ) : (
            <NoData />
          )}
        </Grid>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={6}>
        <ContentTab loading={loading} title={'Fix it by'} text={recommendation?.fixUser?.name || ''} />
      </CustomTabPanel>
    </Box>
  );
};
