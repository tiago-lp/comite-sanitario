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
import Map from './Map';
import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete';
import { makeStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles(
  (theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      position: 'absolute',
      zIndex: 2,
      flexGrow: 1,
      marginTop: theme.spacing(1),
      width: '512px',
    },
  }),
  { name: 'LocationSearchInput' }
);

const renderSuggestion = (suggestion, getSuggestionItemProps) => {
  return (
    <MenuItem
      component='div'
      style={{
        fontWeight: 400,
      }}
      {...getSuggestionItemProps(suggestion)}
      key={suggestion.placeId}>
      {suggestion.description}
    </MenuItem>
  );
};

export default function FormDialog({open, person, handleClose, edit}) {
  const initialValues = {
    name: '',
    age: 0,
    phone: '',
    cpf: '',
    income: 0,
    geolocation: '',
    latitude: -7.2246984,
    longitude: -35.8887188,
    address: ''
  };
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleSelect = (address) => {
    geocodeByAddress(address).then((results) => {
      handleFieldChange({}, 'latitude', results[0].geometry.location.lat())
      handleFieldChange({}, 'longitude', results[0].geometry.location.lng())
      handleAddressChange(results[0].formatted_address)
    });
  };

  const handleError = (status, clearSuggestions) => {
    clearSuggestions();
  };

  const getValues = () => {
    if (edit) {
      let latitude = Number(person.geolocation?.split(";")[0] || -7.2246984);
      let longitude = Number(person.geolocation?.split(";")[1] || -35.8887188);
      return { ...person, latitude, longitude };
    }
    return { ...initialValues, geolocation: `${initialValues.latitude};${initialValues.longitude}` };
  };

  const [values, setValues] = React.useState(getValues);

  const handleFieldChange = (event, field, value) => {
    setValues(values => ({
      ...values,
      [field]: value
    }));
  };

  const handleSave = () => {
    let saveValues = {
      name: values.name,
      age: values.age,
      phone: values.phone,
      cpf: values.cpf,
      income: values.income,
      geolocation: `${values.latitude};${values.longitude}`,
      address: values.address
    }
    if (edit) {
      dispatch(editPersonRequest(person.id, saveValues))
    } else {
      dispatch(addPersonRequest(saveValues));
    }
    handleClose();
  };

  const handleAddressChange = (value) => {
    setValues(values => ({
      ...values,
      address: value
    }));
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
          <PlacesAutocomplete
            value={values.address}
            onChange={newValue =>
              handleAddressChange(newValue)
            } 
            onSelect={handleSelect}
            onError={handleError}
            googleCallbackName='initAutocomplete'>
            {({ getInputProps, suggestions, getSuggestionItemProps }) => (
              <div className={classes.root}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="address"
                  label="Localização"
                  type="text"
                  variant="standard"
                  fullWidth
                  value={values.address || ''}
                  onChange={event =>
                    handleFieldChange(event, 'address', event.target.value)
                  }
                  {...getInputProps({label: "Localização", disabled: false})}
                />
                <Paper className={classes.paper}>
                  {suggestions.map((suggestion) => {
                    return renderSuggestion(suggestion, getSuggestionItemProps);
                  })}
                </Paper>
              </div>
            )}
          </PlacesAutocomplete>
          <Map lat={values.latitude} lng={values.longitude}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSave}>Salvar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
