import { Icon } from '@iconify/react';
import creditCardOutlined from '@iconify/icons-ant-design/credit-card-outlined';
// material
import { alpha, styled } from '@material-ui/core/styles';
import { Card, Typography } from '@material-ui/core';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.warning.darker,
  backgroundColor: theme.palette.warning.lighter
}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  color: theme.palette.warning.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.warning.dark, 0)} 0%, ${alpha(
    theme.palette.warning.dark,
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------


export default function AppItemOrders({donations}) {
  const getTotal = () => {
    let total = 0;
    donations.forEach(donation => {
      if (!donation.received) {
        total += 1;
      };
    })
    return total;
  }

  return (
    <RootStyle>
      <IconWrapperStyle>
        <Icon icon={creditCardOutlined} width={24} height={24} />
      </IconWrapperStyle>
      <Typography variant="h3">{fShortenNumber(getTotal())}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Doações pendentes
      </Typography>
    </RootStyle>
  );
}
