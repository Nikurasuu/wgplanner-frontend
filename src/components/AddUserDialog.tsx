import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button, Alert, Snackbar } from "@mui/material";
import { useState } from "react";
import { API_BASE_URL, GROUPS_ENDPOINT } from "../const";

export function AddUserDialog({open, onClose, setMembers}) {
    const [success, setSuccess] = useState("");
	const [error, setError] = useState("");
    const[name, setName] = useState("");

    function createGroupMember() {
        const wgId = localStorage.getItem('wgId');
        if (!wgId) {
            window.location.href = '/';
            return;
        }

        fetch(`${API_BASE_URL}${GROUPS_ENDPOINT}/${wgId}/members`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            setSuccess('Mitglied hinzugefügt!');
            setMembers((prevMembers) => [...prevMembers, data]);
        })
        .catch((error) => {
            setError("Fehler beim Hinzufügen des Mitglieds.");
        });

        setName("");
        onClose();
    }

    return (
        <div>
            <Dialog open={open} onClose={onClose}>
                <DialogTitle>Mitglied hinzufügen</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Gib den Namen des neuen Mitglieds ein.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={name}
                        onChange={(e) => setName((e.target as HTMLInputElement).value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Abbrechen</Button>
                    <Button onClick={createGroupMember}>Hinzufügen</Button>
                </DialogActions>
            </Dialog>

            <Snackbar open={!!success} autoHideDuration={6000} onClose={() => setSuccess("")}> 
                <Alert
                    onClose={() => setSuccess("")}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {success}
                </Alert>
            </Snackbar>
            <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError("")}>
                <Alert
                    onClose={() => setError("")}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {error}
                </Alert>
            </Snackbar>
        </div>
    );
}