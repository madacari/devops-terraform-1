import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Role, Sipionaute } from './BasicTable';
import { Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select } from '@mui/material';

export interface DialogUtils {
  setNewSipionauteInfo: any,
  setConfirm: any,
  setCancel: any,
  openDialog: boolean,
  nextId: number
}

export default function NewSipionauteDialog(dialogUtils: DialogUtils) {

  const [newSipionaute, setNewSipionaute] = React.useState<Sipionaute>({
    age: 0,
    checked: false,
    firstName: '',
    isCoach: false,
    lastName: '',
    role: Role.Dev,
    id: dialogUtils.nextId
  });

  const handleConfirm = () => {
    dialogUtils.setNewSipionauteInfo(newSipionaute);
    dialogUtils.setConfirm(true);
  }
  
  const handleCancel = () => {
    dialogUtils.setCancel(true);
  };

  const updateFirstName = (event: any) => {
    setNewSipionaute({...newSipionaute, firstName: event.target.value});
  }

  const updateLastName = (event: any) => {
    setNewSipionaute({...newSipionaute, lastName: event.target.value});
  }

  const updateAge = (event: any) => {
    setNewSipionaute({...newSipionaute, age: event.target.value});
  }

  const updateIsCoach = (event: any) => {
    console.log(event.target.checked);
    setNewSipionaute({...newSipionaute, isCoach: event.target.checked});
  }

  const updateRole = (event: any) => {
    setNewSipionaute({...newSipionaute, role: event.target.value});
  }

  return (
      <Dialog open={dialogUtils.openDialog} onClose={handleCancel}>
        <DialogTitle>Ajouter un nouveau Sipionaute</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Merci de renseigner les informations du nouveau Sipionaute
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Prénom"
            fullWidth
            variant="standard"
            onChange={updateFirstName}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nom de famille"
            fullWidth
            variant="standard"
            onChange={updateLastName}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Age"
            type={'number'}
            fullWidth
            variant="standard"
            onChange={updateAge}
            style={{paddingBottom: '24px'}}
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Role dans l'entreprise</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={newSipionaute.role}
              label="Role dans l'entreprise"
              onChange={updateRole}
            >
              {Object.keys(Role).map(role => <MenuItem value={role}>{role}</MenuItem>)}
            </Select>
          </FormControl>
          <FormControlLabel style={{paddingTop: '16px', paddingBottom: '16px'}} control={<Checkbox checked={newSipionaute.isCoach} />} onChange={updateIsCoach} label="Est coach" labelPlacement='start'/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Annuler</Button>
          <Button onClick={handleConfirm}>Créer</Button>
        </DialogActions>
      </Dialog>
  );
}