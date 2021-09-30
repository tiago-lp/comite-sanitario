import { useEffect } from 'react';
// material
import { Box, Grid, Container, Typography } from '@material-ui/core';
// components
import Page from '../components/Page';
import {
  AppNewUsers,
  AppBugReports,
  AppItemOrders,
  AppWeeklySales,
  AppCurrentVisits,
} from '../components/_dashboard/app';
import AuthGuard from '../components/AuthGuard'
import { useDispatch, useSelector } from 'react-redux';
import { getDonationsRequest } from 'src/actions/donationActions';
import { getPeopleRequest } from 'src/actions/peopleActions';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const dispatch = useDispatch();
  const donation = useSelector(state => state.donation);
  const people = useSelector(state => state.people);

  useEffect(() => {
    dispatch(getDonationsRequest());
    dispatch(getPeopleRequest());
  }, [dispatch]);

  return (
    <AuthGuard>
      <Page title="Dashboard">
        <Container maxWidth="xl">
          <Box sx={{ pb: 5 }}>
            <Typography variant="h4">Bem-vindo!</Typography>
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <AppWeeklySales donations={donation.donations}/>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppNewUsers donations={donation.donations}/>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppItemOrders donations={donation.donations}/>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppBugReports people={people.people}/>
            </Grid>
{/* 
            <Grid item xs={12} md={6} lg={8}>
              <AppWebsiteVisits donations={donation.donations}/>
            </Grid> */}

            <Grid item xs={12} md={6} lg={4}>
              <AppCurrentVisits donations={donation.donations}/>
            </Grid>
          </Grid>
        </Container>
      </Page>
    </AuthGuard>
  );
}
