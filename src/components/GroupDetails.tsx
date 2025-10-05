import Button from "@mui/material/Button";
import { Grid, Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from "@mui/material/Paper";
import { useState } from "react";
import { AddUserDialog } from "./AddUserDialog";

export function GroupDetails(groupData: any) {
    const [openAddUserDialog, setOpenAddUserDialog] = useState(false);
    const [members, setMembers] = useState(groupData.members || []);

    const memberColumns: GridColDef<(typeof members)[number]>[] = [
        {
            field: 'name',
            headerName: 'Name',
            width: 360,
        }
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
                                        initialState={{
                                        pagination: {
                                                paginationModel: {
                                                pageSize: 5,
                                                },
                                            },
                                        }}
                                        pageSizeOptions={[5]}
                                        checkboxSelection
                                        disableRowSelectionOnClick
                                    />
                                ) : (
                                    <>
                                        <p>Keine Mitglieder gefunden.</p>
                                        
                                    </>
                                )}
                                <Button variant="contained" color="primary" onClick={() => setOpenAddUserDialog(true)}>
                                    Mitglied hinzufügen
                                </Button>
                                <Button variant="contained" disabled={true} color="primary" style={{ marginLeft: 8 }}>
                                    Mitglied entfernen
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
}