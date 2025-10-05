import { useState } from 'react';
import { Alert, Grid, Paper, Snackbar, Typography } from '@mui/material';
import { API_BASE_URL, GROUPS_ENDPOINT } from '../../const';
import { GroupDetails } from '../../components/GroupDetails';
import { Footer } from '../../components/Footer';


export function Group() {
	const [success, setSuccess] = useState("");
	const [error, setError] = useState("");
	const [groupData, setGroupData] = useState(null);

	const wgId = localStorage.getItem('wgId')
	if (!wgId) {
		window.location.href = '/';
	}

	useState(() => {
		fetchGroupData();
	});

	return (
		<div className="home">
			
			{groupData ? (
				<GroupDetails groupData={groupData} setSuccess={setSuccess} setError={setError} />
			) : (
				<Typography variant="h6" gutterBottom>
					Lade WG-Daten...
				</Typography>
			)}

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

	function fetchGroupData() {
		fetch(`${API_BASE_URL}${GROUPS_ENDPOINT}/${wgId}`)
		.then(response => {
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			return response.json();
		})
		.then(data => {
			setGroupData(data);
			setSuccess("WG-Daten geladen");
		})
		.catch(error => {
			console.error('There was a problem with the fetch operation:', error);
			setError("Fehler beim Laden der WG-Daten");
		});
	}
}

