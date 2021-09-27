import * as React from 'react';
import {
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
  TextField,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { addPersonRequest, editPersonRequest } from 'src/actions/peopleActions';


export default function FormDialog({open, person, handleClose, edit}) {
  const initialValues = {
    name: '',
    age: 0,
    phone: '',
    cpf: '',
    income: 0,
    geolocation: ''
  };
  const dispatch = useDispatch();

  const getValues = () => {
    if (edit) {
      return { ...person };
    }
    return { ...initialValues };
  }
  const [values, setValues] = React.useState(getValues);

  const handleFieldChange = (event, field, value) => {
    setValues(values => ({
      ...values,
      [field]: value
    }));
  };

  const handleSave = () => {
    if (edit) {
      dispatch(editPersonRequest(person.id, values))
    } else {
      dispatch(addPersonRequest(values));
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
          <TextField
            autoFocus
            margin="dense"
            id="age"
            label="Idade"
            type="number"
            variant="standard"
            fullWidth
            value={values.age || ''}
            onChange={event =>
              handleFieldChange(event, 'age', event.target.value)
            } 
          />
          <TextField
            autoFocus
            margin="dense"
            id="phone"
            label="Telefone"
            type="text"
            variant="standard"
            fullWidth
            value={values.phone || ''}
            onChange={event =>
              handleFieldChange(event, 'phone', event.target.value)
            } 
          />
          <TextField
            autoFocus
            margin="dense"
            id="cpf"
            label="CPF"
            type="text"
            variant="standard"
            fullWidth
            value={values.cpf || ''}
            onChange={event =>
              handleFieldChange(event, 'cpf', event.target.value)
            } 
          />
          <TextField
            autoFocus
            margin="dense"
            id="income"
            label="Renda"
            type="number"
            variant="standard"
            fullWidth
            value={values.income || ''}
            onChange={event =>
              handleFieldChange(event, 'income', event.target.value)
            } 
          />
          <TextField
            autoFocus
            margin="dense"
            id="geolocation"
            label="Localização"
            type="text"
            variant="standard"
            fullWidth
            value={values.geolocation || ''}
            onChange={event =>
              handleFieldChange(event, 'geolocation', event.target.value)
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