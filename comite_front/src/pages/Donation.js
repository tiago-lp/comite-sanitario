import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
// material
import {
  Card,
  Table,
  Stack,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
} from '@material-ui/core';
// components
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { DonationListHead, DonationListToolbar, DonationMoreMenu } from '../components/_dashboard/donation';
//
import { useDispatch, useSelector } from 'react-redux';
import { getDonationsRequest } from 'src/actions/donationActions';
import AuthGuard from '../components/AuthGuard';
import DonationForm from 'src/components/DonationForm';
import { DONATION_TYPES, DESTINATION_TYPES } from 'src/utils/enums';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Nome', alignRight: false },
  { id: 'type', label: 'Tipo', alignRight: false },
  { id: 'value', label: 'Valor', alignRight: false },
  { id: 'received', label: 'Recebido', alignRight: false },
  { id: 'destined_to', label: 'Destinatário', alignRight: false },
  { id: 'description', label: 'Descrição', alignRight: false },
  { id: '' }
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_donation) => _donation.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Donation() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const dispatch = useDispatch();
  const donation = useSelector(state => state.donation);
  const [openDescription, setOpenDescription] = useState(false);
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState('');

  const handleCloseDescription = () => {
    setOpenDescription(false);
    setDescription('');    
  };

  const handleOpenDescription = (description) => {
    setDescription(description);
    setOpenDescription(true);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getDonationsRequest());
  }, [dispatch]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = donation.donations.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - donation.donations.length) : 0;

  const filteredDonations = applySortFilter(donation.donations, getComparator(order, orderBy), filterName);

  const isDonationNotFound = filteredDonations.length === 0;

  return !donation.isLoading && (
    <AuthGuard>

      <Page title="Doações">
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
            Doações
            </Typography>
            <Button
              variant="contained"
              onClick={handleClickOpen}
              startIcon={<Icon icon={plusFill} />}
            >
              Adicionar Doação
            </Button>
          </Stack>

          <Card>
            <DonationListToolbar
              numSelected={selected.length}
              filterName={filterName}
              onFilterName={handleFilterByName}
            />

            <Scrollbar>
              <TableContainer sx={{ minWidth: 800 }}>
                <Table>
                  <DonationListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={donation.donations.length}
                    numSelected={selected.length}
                    onRequestSort={handleRequestSort}
                    onSelectAllClick={handleSelectAllClick}
                  />
                  <TableBody>
                    {donation.donations
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row) => {
                        const { id, name, type, value, received, destined_to, description } = row;
                        const isItemSelected = selected.indexOf(name) !== -1;

                        return (
                          <TableRow
                            hover
                            key={id}
                            tabIndex={-1}
                            role="checkbox"
                            selected={isItemSelected}
                            aria-checked={isItemSelected}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                checked={isItemSelected}
                                onChange={(event) => handleClick(event, name)}
                              />
                            </TableCell>
                            <TableCell component="th" scope="row" padding="none">
                              <Stack direction="row" alignItems="center" spacing={2}>
                                <Typography variant="subtitle2" noWrap>
                                  {name}
                                </Typography>
                              </Stack>
                            </TableCell>
                            <TableCell align="left">{DONATION_TYPES[Number(type)]}</TableCell>
                            <TableCell align="left">{value.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}</TableCell>
                            <TableCell align="left">{received ? 'Sim' : 'Não'}</TableCell>
                            <TableCell align="left">{DESTINATION_TYPES[Number(destined_to)]}</TableCell>
                            <TableCell align="left">
                              <Button
                                variant="contained"
                                onClick={() => handleOpenDescription(description)}
                              >
                                Descrição
                              </Button>
                            </TableCell>
                            <TableCell align="right">
                              <DonationMoreMenu id={id} donation={row}/>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                  {isDonationNotFound && (
                    <TableBody>
                      <TableRow>
                        <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                          <SearchNotFound searchQuery={filterName} />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
            </Scrollbar>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={donation.donations.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Card>
        </Container>
      </Page>
      <DonationForm open={open} donation={{}} handleClose={handleClose} />
      <div>
        <Dialog open={openDescription} onClose={handleCloseDescription} fullWidth>
          <DialogTitle>Descrição</DialogTitle>
          <DialogContent>
            <Typography gutterBottom>
              {description || 'Sem descrição'}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDescription}>ok</Button>
          </DialogActions>
        </Dialog>
      </div>
    </AuthGuard>
  );
}
