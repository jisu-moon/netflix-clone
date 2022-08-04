import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { getTopMovies, IGetMovies } from '../apis';
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
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(20, 20, 20, 1)),
    url(${props => props.bgPath});
  background-size: cover;
  background-position: center center;
`;
const BannerTitle = styled.h2`
  font-size: 64px;
  font-weight: bold;
  margin-bottom: 10px;
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
const BannerButtonLayer = styled.div`
  margin-top: 30px;
  display: flex;
  gap: 10px;
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

const randomRank = Math.floor(Math.random() * 5);

function Home() {
  const { data: topMovies, isLoading } = useQuery<IGetMovies>(
    ['movies', 'nowPlaying'],
    getTopMovies,
  );
  console.log(topMovies);
  return (
    <Wrapper>
      {isLoading ? (
        <Loading>Loading...</Loading>
      ) : (
        <>
          <Banner
            bgPath={makeImagePath(
              topMovies?.results[randomRank].backdrop_path || '',
            )}
          >
            <BannerTitle>{topMovies?.results[randomRank].title}</BannerTitle>
            <BannerOverview>
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
          </Banner>
          <Slider
            data={topMovies}
            sliderTitle='한국에서 가장 많이 본 영화 TOP20'
            top={true}
          />
          <Slider
            data={topMovies}
            sliderTitle='한국에서 가장 많이 본 영화 TOP20'
          />
        </>
      )}
    </Wrapper>
  );
}

export default Home;
