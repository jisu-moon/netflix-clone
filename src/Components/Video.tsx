import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player/lazy';
import styled from 'styled-components';
import { getVideo, IVideo } from '../apis';
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

function VideoWrap({ id }: any) {
  const [show, setShow] = useState(false);
  const { data, isLoading } = useQuery<IVideo>(['movies', 'teaser'], () =>
    getVideo(id),
  );
  useEffect(() => setShow(true), [isLoading]);
  return show ? (
    <Wrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
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
