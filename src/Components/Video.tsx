import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import ReactPlayer from 'react-player/lazy';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { getVideo, IVideo } from '../apis';
import { homeVideoState } from '../atoms';
import { makeVideoPath } from '../utils';

const Wrapper = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  & > div {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(rgba(0, 0, 0, 0), 80%, rgba(20, 20, 20, 1));
  }
`;

const videoVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

function VideoWrap({ id }: any) {
  const [show, setShow] = useRecoilState(homeVideoState);
  const { data, isLoading } = useQuery<IVideo>(['movies', 'teaser'], () =>
    getVideo(id),
  );
  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 5000);
  }, [isLoading]);
  return show ? (
    <Wrapper
      variants={videoVariants}
      initial='initial'
      animate='animate'
      exit='exit'
      transition={{ duration: 1 }}
    >
      <ReactPlayer
        url={makeVideoPath(data?.results[data?.results.length - 1].key || '')}
        width='100%'
        height='100%'
        playing={true}
        muted={true}
        controls={false}
        onEnded={() => setShow(false)}
      ></ReactPlayer>
      <div></div>
    </Wrapper>
  ) : null;
}

export default VideoWrap;
