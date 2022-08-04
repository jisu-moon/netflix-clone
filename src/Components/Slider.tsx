import { useQuery } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import styled from 'styled-components';
import { getGenres, IGenres, IGetMovies } from '../apis';
import { makeImagePath } from '../utils';

const slideOffset = 6;

const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 10vh;
  &:hover button {
    opacity: 1;
  }
`;
const Cover = styled.div`
  padding-bottom: 10%;
  position: relative;
`;
const SliderTitle = styled.h2`
  margin-left: 35px;
  font-size: 24px;
  font-weight: bold;
  color: #fff;
  letter-spacing: 0.5px;
  margin-bottom: 20px;
`;
const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  width: calc(100% - 70px);
  position: absolute;
  top: 0px;
  left: 35px;
  height: 100%;
`;
const Box = styled(motion.div)<{ bgpath: string }>`
  width: 100%;
  height: 100%;
  background: url(${props => props.bgpath});
  background-size: cover;
  background-position: center bottom;
  transform-origin: center bottom;
  border-radius: 5px;
  cursor: pointer;
  &:first-child {
    transform-origin: left bottom;
  }
  &:last-child {
    transform-origin: right bottom;
  }
`;
const ArrowBtn = styled.button`
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 2;
  height: 100%;
  font-size: 24px;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  width: 35px;
  border: 0;
  cursor: pointer;
  opacity: 0;
  transition: 0.3s;
  &:hover {
    background: ${props => props.theme.black.lighter};
    font-size: 32px;
  }
`;
const Info = styled(motion.div)`
  width: 100%;
  background: ${props => props.theme.black.veryDark};
  position: absolute;
  bottom: 5px;
  left: 0;
  opacity: 0;
  padding: 12px;
  transform: translateY(100%);
  box-shadow: 0px 2px 10px #000;
  border-radius: 0 0 5px 5px;
  z-index: -1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  h2 {
    font-size: 14px;
  }
`;
const IconWrap = styled.div`
  height: 100%;
  position: relative;
  div {
    position: absolute;
    right: 5px;
    top: 0.1px;
    background: ${props => props.theme.red};
    padding: 5px;
    font-weight: bold;
    text-align: center;
    border-radius: 0 0px 4px 15px;
    p {
      font-size: 8px;
      margin-bottom: -2px;
    }
  }
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;
const Title = styled.h2`
  margin: 0 auto;
  margin-bottom: 15px;
  word-break: keep-all;
  font-weight: bold;
  text-shadow: 1px 1px 2px #000;
  font-size: 16px;
  padding: 0 15px;
  text-align: center;
`;
const ButtonWrap = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 6px;
  button {
    cursor: pointer;
    font-size: 20px;
    border-radius: 20px;
    width: 33px;
    height: 33px;
    color: #fff;
    &:hover {
      opacity: 0.5;
    }
    svg {
      height: auto;
      fill: #fff;
    }
  }
`;
const PlayButton = styled.button`
  background: ${props => props.theme.white.lighter};
  border: 0;
  position: relative;
  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-46%, -50%);
    width: 20px;
  }
`;
const PlusButton = styled.button`
  background-color: transparent;
  border: 2px solid ${props => props.theme.white.veryDark};
`;
const LikeButton = styled.button`
  background-color: transparent;
  border: 2px solid ${props => props.theme.white.veryDark};
  position: relative;
  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 12px;
  }
`;
const VideoDataWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  p {
    border: 0.5px solid ${props => props.theme.white.veryDark};
    font-size: 10px;
    padding: 1px 5px;
    border-radius: 4px;
    color: #fff;
    font-weight: 300;
  }
`;
const StarLating = styled.span`
  color: #46d369;
  font-weight: bold;
  font-size: 12px;
`;
const Adult = styled.span<{ adult: boolean }>`
  font-size: 16px;
  font-weight: bold;
  padding: 3px;
  color: #fff;
  background: ${props => (props.adult ? '#9f2930' : '#cf723b')};
  border-radius: 3px;
`;
const ReleaseDate = styled.span`
  font-size: 12px;
  font-weight: 500;
`;
const GenresWrap = styled.div`
  span {
    font-size: 12px;
    color: #fff;
    &:after {
      content: '•';
      margin: 0 3px;
      color: ${props => props.theme.white.veryDark};
    }
    &:last-child:after {
      content: '';
    }
  }
`;

const rowVariants = {
  initial: (back: boolean) => ({
    x: back ? -window.innerWidth + 10 : window.innerWidth - 10,
  }),
  animate: {
    x: 0,
  },
  exit: (back: boolean) => ({
    x: back ? window.innerWidth - 10 : -window.innerWidth + 10,
  }),
};
const boxVariants = {
  hover: {
    scale: 1.3,
    transition: {
      delay: 0.3,
      duration: 0.3,
      type: 'tween',
    },
  },
  init: {
    scale: 1,
    transition: {
      duration: 0.3,
      type: 'tween',
    },
  },
};
const InfoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.3,
      duaration: 0.1,
      type: 'tween',
    },
  },
};
interface IProps {
  data?: IGetMovies;
  sliderTitle: string;
  top?: boolean;
}

function Slider({ data, sliderTitle, top }: IProps) {
  const { data: genres, isLoading } = useQuery<IGenres>(
    ['movies', 'Genres'],
    getGenres,
  );
  const [back, setBack] = useState(false);
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const toggleLeaving = () => setLeaving(prev => !prev);
  const incraseSlide = (type: boolean) => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      setBack(type);
      const maxLength = Math.floor(data?.results.length / slideOffset);
      setIndex(prev =>
        type
          ? index === 0
            ? maxLength
            : prev - 1
          : index === maxLength
          ? 0
          : prev + 1,
      );
    }
  };
  return (
    <Wrapper>
      <SliderTitle>{sliderTitle}</SliderTitle>
      <Cover>
        <ArrowBtn onClick={() => incraseSlide(true)}>&lt;</ArrowBtn>
        <AnimatePresence
          initial={false}
          custom={back}
          onExitComplete={toggleLeaving}
        >
          <Row
            custom={back}
            variants={rowVariants}
            initial='initial'
            animate='animate'
            exit='exit'
            transition={{
              type: 'tween',
              duration: 1,
            }}
            key={index}
          >
            {data?.results
              .slice(index * slideOffset, index * slideOffset + slideOffset)
              .map((movie, slideIndex) => {
                return (
                  <Box
                    key={movie.id}
                    bgpath={makeImagePath(
                      movie.backdrop_path ?? movie.poster_path,
                      'w500',
                    )}
                    variants={boxVariants}
                    whileHover='hover'
                    animate='init'
                  >
                    <IconWrap>
                      <Title>{movie.title}</Title>
                      {top ? (
                        <div>
                          <p>TOP</p>
                          <span>{index * slideOffset + slideIndex + 1}</span>
                        </div>
                      ) : null}
                    </IconWrap>
                    <Info variants={InfoVariants}>
                      <ButtonWrap>
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
                        </PlayButton>
                        <PlusButton>+</PlusButton>
                        <LikeButton>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='96px'
                            height='96px'
                            viewBox='0 0 96 96'
                          >
                            <title />
                            <path d='M78,24H71.8828C71.2559,12.82,67.2773,0,42,0a5.9966,5.9966,0,0,0-6,6c0,10.8809-.1128,20.3687-8.6917,30H6a5.9966,5.9966,0,0,0-6,6V90a5.9966,5.9966,0,0,0,6,6H78A18.02,18.02,0,0,0,96,78V42A18.02,18.02,0,0,0,78,24ZM12,48H24V84H12ZM84,78a6.0078,6.0078,0,0,1-6,6H36V44.4023c9.9258-10.8867,11.6426-21.9257,11.9355-32.121C60,13.5938,60,19.5117,60,30a5.9966,5.9966,0,0,0,6,6H78a6.0078,6.0078,0,0,1,6,6Z' />
                          </svg>
                        </LikeButton>
                      </ButtonWrap>
                      <VideoDataWrap>
                        <StarLating>{movie.vote_average * 10}% 일치</StarLating>
                        <Adult adult={movie.adult}>
                          {movie.adult ? '18' : '15'}
                        </Adult>
                        <ReleaseDate>{movie.release_date}</ReleaseDate>
                        <p>HD</p>
                      </VideoDataWrap>
                      {isLoading ? null : (
                        <GenresWrap>
                          {movie.genre_ids.map(id => {
                            const result = genres?.genres.find(
                              genre => genre.id === id,
                            );
                            return <span key={result?.id}>{result?.name}</span>;
                          })}
                        </GenresWrap>
                      )}
                    </Info>
                  </Box>
                );
              })}
          </Row>
        </AnimatePresence>
        <ArrowBtn
          style={{ left: 'auto', right: 0 }}
          onClick={() => incraseSlide(false)}
        >
          &gt;
        </ArrowBtn>
      </Cover>
    </Wrapper>
  );
}
export default Slider;
