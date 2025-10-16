import { render } from 'preact';
import 'preact/devtools'
import { LocationProvider, Router, Route } from 'preact-iso';

import { Home } from './pages/Home/index.jsx';
import { Group } from './pages/Group/index.jsx';
import { NotFound } from './pages/_404.jsx';
import './style.css';

export function App() {
	return (
		<LocationProvider>
			<main>
				<Router>
					<Route path="/" component={Home} />
					<Route path="/group/" component={Group} />
					<Route default component={NotFound} />
				</Router>
			</main>
		</LocationProvider>
	);
}

render(<App />, document.getElementById('app'));
