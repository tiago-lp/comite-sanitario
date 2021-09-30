import { Icon } from '@iconify/react';
import creditCardOutlined from '@iconify/icons-ant-design/credit-card-outlined';
import { alpha, styled } from '@material-ui/core/styles';
import { Card, Typography } from '@material-ui/core';
// utils

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.primary.darker,
  backgroundColor: theme.palette.primary.lighter
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
  color: theme.palette.primary.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0)} 0%, ${alpha(
    theme.palette.primary.dark,
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------


export default function AppWeeklySales({donations}) {
  const getTotal = () => {
    let total = 0;
    donations.forEach(donation => {
      if (Number(donation.type) === 1 && donation.received) {
        total += donation.value;
      };
    })
    return total;
  };

  return (
    <RootStyle>
      <IconWrapperStyle>
        <Icon icon={creditCardOutlined} width={24} height={24} />
      </IconWrapperStyle>
      <Typography variant="h3">
        {
          getTotal().toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})
        }
      </Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Total recebido (R$)
      </Typography>
    </RootStyle>
  );
}
