import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import {
  getNewMovie,
  getRatedMovie,
  getTopMovies,
  getTrendMovie,
  IGetMovies,
} from '../apis';
import Slider from '../Components/Slider';
import { makeImagePath } from '../utils';
import VideoWrap from '../Components/Video';
import { homeVideoState } from '../atoms';
import { useRecoilValue } from 'recoil';
import { motion } from 'framer-motion';

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
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(20, 20, 20, 1)),
    url(${props => props.bgPath});
  background-size: cover;
  background-position: center center;
  position: relative;
`;
const BannerTitle = styled(motion.h2)`
  font-weight: bold;
  margin-bottom: 10px;
  color: #fff;
  position: static;
  z-index: 2;
`;
const BannerOverview = styled(motion.p)`
  font-size: 18px;
  width: 50%;
  line-height: 1.3;
  padding-left: 2px;
  word-break: keep-all;
  color: #fff;
  position: static;
  z-index: 2;
  transform-origin: bottom;
`;
const BannerButtonLayer = styled.div`
  margin-top: 30px;
  display: flex;
  gap: 10px;
  position: static;
  z-index: 2;
  button {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 0 20px;
    border: 0;
    border-radius: 2px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
    svg {
      width: 30px;
    }
  }
`;
const PlayButton = styled.button`
  background: ${props => props.theme.white.lighter};
`;
const InfoButton = styled.button`
  background: rgba(255, 255, 255, 0.5);
  color: #fff;
  svg {
    fill: #fff;
  }
`;

const randomRank = Math.floor(Math.random() * 6);

function Home() {
  const videoShow = useRecoilValue(homeVideoState);
  const { data: topMovies, isLoading: moviesLoading } = useQuery<IGetMovies>(
    ['movies', 'top'],
    getTopMovies,
  );
  const { data: trendMovie, isLoading: trendMovieLoading } =
    useQuery<IGetMovies>(['movies', 'Trend'], getTrendMovie);
  const { data: ratedMovie, isLoading: ratedMovieLoading } =
    useQuery<IGetMovies>(['movies', 'rated'], getRatedMovie);
  const { data: newMovie, isLoading: newMovieLoading } = useQuery<IGetMovies>(
    ['movies', 'new'],
    getNewMovie,
  );
  console.log(newMovie);
  return (
    <Wrapper>
      {moviesLoading && trendMovieLoading && ratedMovieLoading ? (
        <Loading>Loading...</Loading>
      ) : (
        <>
          <Banner
            bgPath={makeImagePath(
              topMovies?.results[randomRank].backdrop_path || '',
            )}
          >
            <BannerTitle
              initial={false}
              animate={{
                y: videoShow ? 100 : 0,
                fontSize: videoShow ? '48px' : '64px',
              }}
              transition={{
                duration: 0.5,
                delay: 2,
              }}
            >
              {topMovies?.results[randomRank].title}
            </BannerTitle>
            <BannerOverview
              initial={false}
              animate={{
                y: videoShow ? 100 : 0,
                opacity: videoShow ? 0 : 1,
              }}
              transition={{
                duration: 0.5,
                delay: 2,
              }}
            >
              {topMovies?.results[randomRank].overview}
            </BannerOverview>
            <BannerButtonLayer>
              <PlayButton>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='48px'
                  height='48px'
                  viewBox='0 0 48 48'
                  version='1.1'
                >
                  <g
                    id='🔍-Product-Icons'
                    stroke='none'
                    strokeWidth='1'
                    fill='none'
                    fillRule='evenodd'
                  >
                    <g
                      id='ic_fluent_play_48_filled'
                      fill='#212121'
                      fillRule='nonzero'
                    >
                      <path
                        d='M13.7501344,8.41212026 L38.1671892,21.1169293 C39.7594652,21.9454306 40.3786269,23.9078584 39.5501255,25.5001344 C39.2420737,26.0921715 38.7592263,26.5750189 38.1671892,26.8830707 L13.7501344,39.5878797 C12.1578584,40.4163811 10.1954306,39.7972194 9.36692926,38.2049434 C9.12586301,37.7416442 9,37.2270724 9,36.704809 L9,11.295191 C9,9.50026556 10.4550746,8.045191 12.25,8.045191 C12.6976544,8.045191 13.1396577,8.13766178 13.5485655,8.31589049 L13.7501344,8.41212026 Z'
                        id='🎨-Color'
                      />
                    </g>
                  </g>
                </svg>
                <p>재생</p>
              </PlayButton>
              <InfoButton>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  xmlnsXlink='http://www.w3.org/1999/xlink'
                  version='1.1'
                  viewBox='0 0 245.334 245.334'
                  enableBackground='new 0 0 245.334 245.334'
                >
                  <g>
                    <path d='M122.667,0C55.028,0,0,55.028,0,122.667s55.027,122.667,122.666,122.667s122.667-55.028,122.667-122.667   S190.305,0,122.667,0z M122.667,215.334C71.57,215.334,30,173.764,30,122.667S71.57,30,122.667,30s92.667,41.57,92.667,92.667   S173.763,215.334,122.667,215.334z' />
                    <rect width='30' x='107.667' y='109.167' height='79' />
                    <rect width='30' x='107.667' y='57.167' height='29' />
                  </g>
                </svg>
                <p>상세 정보</p>
              </InfoButton>
            </BannerButtonLayer>
            <VideoWrap id={topMovies?.results[randomRank].id} />
          </Banner>
          <Slider
            data={topMovies}
            sliderTitle='오늘 대한민국의 TOP 10 영화'
            top={true}
          />
          <Slider data={trendMovie} sliderTitle='지금 뜨는 컨텐츠' />
          <Slider data={ratedMovie} sliderTitle='보고 또 봐도 좋은 명작' />
          <Slider data={newMovie} sliderTitle='곧 개봉 예정' />
        </>
      )}
    </Wrapper>
  );
}

export default Home;
