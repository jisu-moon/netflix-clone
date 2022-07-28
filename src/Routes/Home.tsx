import { useQuery } from '@tanstack/react-query';
import { getMovies } from '../apis';

function Home() {
  const { data, isLoading } = useQuery(['movies', 'nowPlaying'], getMovies);
  console.log(data, isLoading);
  return <div style={{ height: '500vh' }}>Home</div>;
}

export default Home;
