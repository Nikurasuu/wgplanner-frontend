import Button from "@mui/material/Button";
import { Grid, Accordion, AccordionSummary, AccordionDetails, Typography, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridActionsCellItemProps, GridColDef } from '@mui/x-data-grid';
import Paper from "@mui/material/Paper";
import { useState } from "react";
import { AddUserDialog } from "./AddUserDialog";
import { API_BASE_URL, GROUPS_ENDPOINT } from "../const";
import React from "react";

export function GroupDetails({
        groupData,
        setSuccess,
        setError,
    }: {
        groupData: any;
        setSuccess: (value: string) => void;
        setError: (value: string) => void;
    }) {
    const [openAddUserDialog, setOpenAddUserDialog] = useState(false);
    const [members, setMembers] = useState(groupData.members || []);

    const memberColumns: GridColDef[] = [
        {
            field: 'name',
            headerName: 'Name',
            width: 200,
        },
        {
        field: 'actions',
        type: 'actions',
        width: 80,
        getActions: (params) => [
          <DeleteUserActionItem
            label="Entfernen"
            showInMenu
            deleteUser={() => removeMember(params.id as string)}
            closeMenuOnClick={false}
          />,
        ],
      },
    ];

    return (
        <div>
            <AddUserDialog open={openAddUserDialog} onClose={() => setOpenAddUserDialog(false)} setMembers={setMembers} />
            <Grid container spacing={2}>
                <Grid size={12}>
                    <Paper elevation={3} style={{ padding: 16 }}>
                        <h2>{groupData.name}</h2>
                    </Paper>
                </Grid>

                <Grid size={12}>
                    <Paper elevation={3}>
                        <Accordion>
                            <AccordionSummary expandIcon={<span>▼</span>} aria-controls="members-content" id="members-header">
                                <Typography variant="h6">Mitglieder</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                {members.length > 0 ? (
                                    <DataGrid
                                        rows={members}
                                        columns={memberColumns}                                                                                
                                    />
                                ) : (
                                    <>
                                        <p>Keine Mitglieder gefunden.</p>
                                        
                                    </>
                                )}
                                <Button variant="contained" color="primary" onClick={() => setOpenAddUserDialog(true)}>
                                    Mitglied hinzufügen
                                </Button>
                            </AccordionDetails>
                        </Accordion>
                    </Paper>
                </Grid>

                <Grid size={12}>
                    <Paper elevation={3} style={{ padding: 16 }}>
                        <h3>Aufgaben</h3>
                        <p>Hier könnten Aufgaben angezeigt werden.</p>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );

    function removeMember(memberId: string) {
        fetch(`${API_BASE_URL}/${GROUPS_ENDPOINT}/${groupData.id}/members/${memberId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if (response.ok) {
                setSuccess("Mitglied entfernt!");
                setMembers(members.filter((m: any) => m.id !== memberId));
            } else {
                setError("Fehler beim Entfernen des Mitglieds.");
                console.error('Fehler beim Entfernen des Mitglieds');
            }
        })
        .catch(error => {
            setError("Netzwerkfehler beim Entfernen des Mitglieds.");
            console.error('Netzwerkfehler:', error);
        });
    }   

    function DeleteUserActionItem({
        deleteUser,
        ...props
        }: GridActionsCellItemProps & { deleteUser: () => void }) {
        const [open, setOpen] = React.useState(false);

        return (
            <>
                <GridActionsCellItem {...props} onClick={() => setOpen(true)} />
                <Dialog
                    open={open}
                    onClose={() => setOpen(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">Mitglied entfernen?</DialogTitle>
                    <DialogActions>
                        <Button onClick={() => setOpen(false)}>
                            Abbrechen
                        </Button>
                        <Button
                            onClick={() => {
                                setOpen(false);
                                deleteUser();
                            }}
                            color="warning"
                            autoFocus
                        >
                            Entfernen
                        </Button>
                    </DialogActions>
                </Dialog>
            </>
        );
    }
}