import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { getMovies, IGetMovies } from '../apis';
import Slider from '../Components/Slider';
import { makeImagePath } from '../utils';

const Wrapper = styled.div`
  width: 100vw;
  overflow: hidden;
`;
const Loading = styled.div`
  width: 100vw;
  height: calc(100vw - 70px);
  position: fixed;
  top: 70px;
  left: 0;
  background: #000;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Banner = styled.div<{ bgPath: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${props => props.bgPath});
  background-size: cover;
  background-position: center center;
`;
const BannerTitle = styled.h2`
  font-size: 64px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #fff;
`;
const BannerOverview = styled.p`
  font-size: 18px;
  width: 50%;
  line-height: 1.3;
  padding-left: 2px;
  word-break: keep-all;
  color: #fff;
`;

const randomRank = Math.floor(Math.random() * 5);

function Home() {
  const { data: genreMovies, isLoading } = useQuery<IGetMovies>(
    ['movies', 'nowPlaying'],
    getMovies,
  );
  return (
    <Wrapper>
      {isLoading ? (
        <Loading>Loading...</Loading>
      ) : (
        <>
          <Banner
            bgPath={makeImagePath(
              genreMovies?.results[randomRank].backdrop_path || '',
            )}
          >
            <BannerTitle>{genreMovies?.results[randomRank].title}</BannerTitle>
            <BannerOverview>
              {genreMovies?.results[randomRank].overview}
            </BannerOverview>
          </Banner>
          <Slider data={genreMovies} />
        </>
      )}
    </Wrapper>
  );
}

export default Home;
