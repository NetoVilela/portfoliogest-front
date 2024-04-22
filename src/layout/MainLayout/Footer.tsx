import { Stack, Typography } from '@mui/material';

const Footer = () => (
  <Stack direction="row" justifyContent="center" alignItems="center" sx={{ p: '24px 16px 0px', mt: 'auto' }}>
    <Typography variant="caption">&copy; {new Date().getFullYear()} PortfolioGest. Todos os direitos reservados.</Typography>
  </Stack>
);

export default Footer;
