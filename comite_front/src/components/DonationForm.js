import * as React from 'react';
import {
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { addDonationRequest, editDonationRequest } from 'src/actions/donationActions';


export default function DonationForm({open, donation, handleClose, edit}) {
  const initialValues = {
    name: '',
    type: '1',
    value: 0,
    received: '1',
    destined_to: '2',
    description: '',
  };

  const dispatch = useDispatch();

  const getValues = () => {
    if (edit) {
      return { 
        ...donation,
        type: String(donation.type || 1),
        destined_to: String(donation.destined_to || 2),
        received: String(donation.received ? 2 : 1)
      };
    }
    return { ...initialValues };
  };

  const [values, setValues] = React.useState(getValues);

  const handleFieldChange = (event, field, value) => {
    setValues(values => ({
      ...values,
      [field]: value
    }));
  };

  const handleSave = () => {
    values.received = String(values.received) === '1' ? false : true;
    if (edit) {
      dispatch(editDonationRequest(donation.id, values))
    } else {
      dispatch(addDonationRequest(values));
    }
    handleClose();
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{edit ? 'Editar' : 'Cadastrar'} Pessoa</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nome"
            type="text"
            variant="standard"
            fullWidth
            value={values.name || ''}
            onChange={event =>
              handleFieldChange(event, 'name', event.target.value)
            } 
          />
          <FormControl fullWidth style={{ marginTop: '8px' }}>
            <InputLabel id="type">Tipo</InputLabel>
            <Select
              labelId="type"
              id="type-select"
              value={values.type}
              label="Tipo"
              onChange={event =>
                handleFieldChange(event, 'type', event.target.value)
              }
              variant="standard"
            >
              <MenuItem value={1}>Dinheiro</MenuItem>
              <MenuItem value={2}>Alimento</MenuItem>
              <MenuItem value={3}>Outros</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            id="value"
            label="Valor"
            type="number"
            variant="standard"
            fullWidth
            value={values.value || ''}
            onChange={event =>
              handleFieldChange(event, 'value', event.target.value)
            } 
          />
          <FormControl fullWidth style={{ marginTop: '8px' }}>
            <InputLabel id="received">Recebido</InputLabel>
            <Select
              labelId="received"
              id="received-select"
              value={values.received}
              label="Recebido"
              onChange={event =>
                handleFieldChange(event, 'received', event.target.value)
              }
              variant="standard"
            >
              <MenuItem value={1}>Não</MenuItem>
              <MenuItem value={2}>Sim</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth style={{ marginTop: '8px' }}>
            <InputLabel id="destined_to">Tipo</InputLabel>
            <Select
              labelId="destined_to"
              id="destined_to-select"
              value={values.destined_to}
              label="Destinatário"
              onChange={event =>
                handleFieldChange(event, 'destined_to', event.target.value)
              }
              variant="standard"
            >
              <MenuItem value={2}>Pessoa</MenuItem>
              <MenuItem value={3}>Organização</MenuItem>
            </Select>
          </FormControl>
          <TextField
            multiline
            margin="dense"
            id="description"
            label="Descrição"
            type="text"
            variant="standard"
            fullWidth
            value={values.description || ''}
            onChange={event =>
              handleFieldChange(event, 'description', event.target.value)
            } 
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSave}>Salvar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
