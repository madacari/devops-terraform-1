import { Alert, Button, Snackbar } from "@mui/material";
import { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { SipionauteUtils } from "./BasicTable";



export default function DeleteButton(sipionauteUtils: SipionauteUtils) {

  const [open, setOpen] = useState(false);

  const deleteSipionauteChecked = () => {
    const sipionauteBuffer = [...sipionauteUtils.sipionautes];
    sipionauteUtils.setSipionautes(sipionauteBuffer.filter(sipionaute => !sipionaute.checked));
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <>
    <Button variant="contained" color='error' onClick={deleteSipionauteChecked} endIcon={<DeleteIcon />}>Supprimer les Sipionautes</Button>
    <Snackbar anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }} open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
        Sipionautes supprimés !
      </Alert>
    </Snackbar>
    </>
  )
}