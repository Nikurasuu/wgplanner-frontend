import { useState, useEffect } from 'react';
import { useLocation } from 'preact-iso';
import { Alert, Button, Grid, Paper, Snackbar, TextField } from '@mui/material';
import { API_BASE_URL, GROUPS_ENDPOINT } from '../../const';
import { Footer } from '../../components/Footer';


export function Home() {
	const [success, setSuccess] = useState("");
	const [error, setError] = useState("");
	const [wgId, setWgId] = useState("");
	const [newWGName, setNewWGName] = useState("");
	const location = useLocation();


	// Set wgId from session storage only once on mount
	useEffect(() => {
		const id = getWgIdFromLocalStorage();
		if (id) setWgId(id);
	}, []);

	return (
		<div className="home">
			<Grid container spacing={2} justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
				<Grid size={16}>
					<Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
						<h1>WG-Planner</h1>
						<TextField 
							fullWidth 
							id="outlined-basic" 
							label="WG-Kennung" 
							variant="outlined" 
							size="small" 
							type= "password"
							value={wgId}
							onChange={(e) => setWgId(e.target.value)}
						/>
						<Button
							fullWidth
							variant="contained"
							color="primary"
							onClick={() => openGroup(wgId)}
							disabled={!wgId.trim()}
						>
							Anmelden
						</Button>
						<p> Oder </p>
						<TextField
							fullWidth
							id="outlined-basic"
							label="Name der neuen WG"
							variant="outlined"
							size="small"
							value={newWGName}
							onChange={(e) => setNewWGName(e.target.value)}
						/>
						<Button
							fullWidth
							variant="contained"
							color="primary"
							onClick={createNewGroup}
							disabled={!newWGName.trim()}
						>
							Wohngemeinschaft erstellen
						</Button>
					</Paper>
				</Grid>
			</Grid>

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
			<Footer />
        </div>
    );



	function createNewGroup() {
		fetch(`${API_BASE_URL}${GROUPS_ENDPOINT}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ name: newWGName }),
		})
		.then(response => {
			if (!response.ok) {
				setError('Fehler beim Erstellen der WG');
				throw new Error('Fehler beim Erstellen der WG');
			}
			return response.json();
		})
		.then(data => {
			setSuccess('Wohngemeinschaft erstellt!');
			openGroup(data.id);
		})
		.catch(error => {
			console.error('Error:', error);
			setError('Fehler beim Erstellen der WG');
		});
	}

	function openGroup(wgId) {
		localStorage.setItem('wgId', wgId);
		location.route('/group/');
	}

	function getWgIdFromLocalStorage() {
		const Id = localStorage.getItem('wgId');
		if (Id) {
			setSuccess("Du wurdest wiedererkannt!");
			return Id;
		}
		return ""
	}
}

