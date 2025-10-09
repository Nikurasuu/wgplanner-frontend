export function Footer() {
    return (
        <footer
            style={{
                position: 'fixed',
                left: 0,
                bottom: 0,
                width: '100%',
                textAlign: 'center',
                padding: '10px',
                borderTop: '1px solid #ccc',
                background: '#fff',
                zIndex: 100,
            }}
        >
            <p>WG-Planner v1.0</p>
        </footer>
    );
}