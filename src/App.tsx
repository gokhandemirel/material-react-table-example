import { styled } from '@mui/material';
import Table from './components/table';

const Wrapper = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  width: `1120px`,
  padding: '20px',
  margin: '0 auto'
});

function App() {
  return (
    <Wrapper>
      <Table />
    </Wrapper>
  );
}

export default App;
