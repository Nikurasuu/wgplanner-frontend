import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button, Alert, Snackbar } from "@mui/material";
import { useState, useEffect } from "react";
import { API_BASE_URL, GROUPS_ENDPOINT } from "../const";

export function EditUserDialog({open, onClose, setMembers, member}) {
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const[name, setName] = useState("");

    function editGroupMember() {
        const wgId = localStorage.getItem('wgId');
        if (!wgId) {
            window.location.href = '/';
            return;
        }

        fetch(`${API_BASE_URL}${GROUPS_ENDPOINT}/${wgId}/members/${member.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "name": name }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            setSuccess('Mitglied aktualisiert!');
            setMembers((prevMembers) =>
                prevMembers.map((m) => (m.id === member.id ? data : m))
            );
        })
        .catch((error) => {
            setError("Fehler beim Bearbeiten des Mitglieds.");
        });

        onClose();
    }

    return (
        <div>
            <Dialog open={open} onClose={onClose}>
                <DialogTitle>Mitglied bearbeiten</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Gib den neuen Namen des Mitglieds ein.
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
                        onChange={(e) => setName(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Abbrechen</Button>
                    <Button onClick={editGroupMember}>Speichern</Button>
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