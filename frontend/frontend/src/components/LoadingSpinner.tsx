import CircularProgress from '@mui/material/CircularProgress';

export default function LoadingSpinner() {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <CircularProgress />
      <p>Loading...</p>
    </div>
  );
}
