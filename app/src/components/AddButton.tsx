import { Alert, Button, Snackbar } from "@mui/material";
import { useState } from "react";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Role, Sipionaute, SipionauteUtils } from "./BasicTable";
import NewSipionauteDialog from "./NewSipionauteDialog";

export default function AddButton(sipionauteUtils: SipionauteUtils) {

  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const createNewSipionaute = (newSipionaute: Sipionaute) => {
    sipionauteUtils.setSipionautes([...sipionauteUtils.sipionautes, newSipionaute]);
    setOpenSnackBar(true);
  }

  const handleCloseSnackbar = () => {
    setOpenSnackBar(false);
  }

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  }

  const handleConfirmDialog = () => {
    setOpenSnackBar(true);
    setIsDialogOpen(false);
  }

  const handleCancelDialog = () => {
    setIsDialogOpen(false);
  }

  return (
    <>
    <Button variant="contained" onClick={handleOpenDialog} endIcon={<AddCircleIcon />}>Ajouter un nouveau Sipionaute</Button>
    <Snackbar anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }} open={openSnackBar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
      <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
        Nouveau Sipionaute ajouté avec succès !
      </Alert>
    </Snackbar>
    <NewSipionauteDialog
      nextId={sipionauteUtils.sipionautes.length}
      openDialog={isDialogOpen}
      setCancel={handleCancelDialog}
      setConfirm={handleConfirmDialog}
      setNewSipionauteInfo={createNewSipionaute}
    />
    </>
  )
}