import { TableBody, TableRow, useTheme } from '@mui/material';
import { TableHead } from '@mui/material';
import { Table, TableContainer } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { RecommendationDashboardType } from 'types/recommendation/RecommendationDashboard';
import { Typography } from '@mui/material';

type Props = {
  data: RecommendationDashboardType | null;
};
export const TableByCategories = ({ data }: Props) => {
  const theme = useTheme();
  return (
    <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Category</StyledTableCell>
            <StyledTableCell align="center">Open</StyledTableCell>
            <StyledTableCell align="center">Archived</StyledTableCell>
            <StyledTableCell align="center">Hidden</StyledTableCell>
            <StyledTableCell align="center">Total</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.totalByCategories.map((total, index) => {
            return (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  <Typography component="span" fontWeight="bold">
                    {total.categoryName}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell align="center" sx={{ color: 'green' }}>
                  <Typography component="span" fontWeight="bold" color={theme.palette.success.main}>
                    {total.openRecommendationCount}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Typography component="span" fontWeight="bold" color={theme.palette.error.darker}>
                    {total.archivedRecommendationCount}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Typography component="span" fontWeight="bold" color={theme.palette.warning.darker}>
                    {total.hiddenRecommendationCount}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Typography component="span" fontWeight="bold">
                    {total.recommendationCount}
                  </Typography>
                </StyledTableCell>
              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    // backgroundColor: theme.palette.common.black,
    // color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    // backgroundColor: theme.palette.action.hover
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0
  }
}));
