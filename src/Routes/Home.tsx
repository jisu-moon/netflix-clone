import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { getMovies, IGetMovies } from '../apis';
import { makeImagePath } from '../utils';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

const Wrapper = styled.div`
  width: 100vw;
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
  width: 30%;
  line-height: 1.3;
  padding-left: 2px;
  word-break: keep-all;
  color: #fff;
`;
const Slider = styled.div`
  width: 100%;
  margin-top: -7%;
  position: relative;
  height: 200px;
  overflow: hidden;
`;
const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  margin-bottom: 10px;
  width: calc(100% - 70px);
  position: absolute;
  top: 0;
  left: 35px;
  height: 100%;
`;
const Box = styled.div<{ bgPath: string }>`
  height: 100%;
  background: url(${props => props.bgPath});
  background-size: cover;
  background-position: center center;
`;
const ArrowBtn = styled.button`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;
  height: 100%;
  font-size: 24px;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  width: 25px;
  border: 0;
  cursor: pointer;
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
const randomRank = Math.floor(Math.random() * 5);
const slideOffset = 6;

function Home() {
  const { data, isLoading } = useQuery<IGetMovies>(
    ['movies', 'nowPlaying'],
    getMovies,
  );
  const [index, setIndex] = useState(0);
  const [back, setBack] = useState(false);
  const [leaving, setLeaving] = useState(false);
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
  const toggleLeaving = () => setLeaving(prev => !prev);
  return (
    <Wrapper>
      {isLoading ? (
        <Loading>Loading...</Loading>
      ) : (
        <>
          <Banner
            bgPath={makeImagePath(
              data?.results[randomRank].backdrop_path || '',
            )}
          >
            <BannerTitle>{data?.results[randomRank].title}</BannerTitle>
            <BannerOverview>
              {data?.results[randomRank].overview}
            </BannerOverview>
          </Banner>
          <Slider>
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
                  .map(movie => {
                    return (
                      <Box
                        key={movie.id}
                        bgPath={makeImagePath(
                          movie.backdrop_path ?? movie.poster_path,
                          'w500',
                        )}
                      ></Box>
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
          </Slider>
        </>
      )}
    </Wrapper>
  );
}

export default Home;
