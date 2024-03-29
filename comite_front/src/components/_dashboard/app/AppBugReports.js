import { Icon } from '@iconify/react';
import peopleFill from '@iconify/icons-eva/people-fill';
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
  color: theme.palette.error.darker,
  backgroundColor: theme.palette.error.lighter
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
  color: theme.palette.error.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.error.dark, 0)} 0%, ${alpha(
    theme.palette.error.dark,
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------


export default function AppBugReports({people}) {
  return (
    <RootStyle>
      <IconWrapperStyle>
        <Icon icon={peopleFill} width={24} height={24} />
      </IconWrapperStyle>
      <Typography variant="h3">{fShortenNumber(people.length)}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Pessoas cadastradas
      </Typography>
    </RootStyle>
  );
}
