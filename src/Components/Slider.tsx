import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import styled from 'styled-components';
import { IGetMovies } from '../apis';
import { makeImagePath } from '../utils';

const Wrapper = styled.div`
  width: 100%;
  margin-top: -7%;
  position: relative;
  height: 200px;
  &:hover button {
    opacity: 1;
  }
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
const Box = styled(motion.div)<{ bgpath: string }>`
  height: 100%;
  background: url(${props => props.bgpath});
  background-size: cover;
  background-position: center center;
  transform-origin: center bottom;
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
  top: 0;
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
const Overlay = styled(motion.div)`
  width: 100%;
  background: ${props => props.theme.black.lighter};
  position: absolute;
  bottom: 0;
  left: 0;
  opacity: 0;
  padding: 8px 5px;
  h2 {
    font-size: 14px;
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
    y: -30,
    transition: {
      delay: 0.3,
      duration: 0.3,
      type: 'tween',
    },
  },
  init: {
    scale: 1,
    y: 0,
    transition: {
      duration: 0.3,
      type: 'tween',
    },
  },
};
const OverlayVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.3,
      duaration: 0.1,
      type: 'tween',
    },
  },
};

const slideOffset = 6;

interface IProps {
  data?: IGetMovies;
}

function Slider({ data }: IProps) {
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
                  <Overlay variants={OverlayVariants}>
                    <h2>{movie.title}</h2>
                    <h3>{index * slideOffset + 1 + slideIndex}</h3>
                  </Overlay>
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
    </Wrapper>
  );
}
export default Slider;