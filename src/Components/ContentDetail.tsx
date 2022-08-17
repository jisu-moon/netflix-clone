import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 99;
`;
const Detail = styled(motion.div)`
  position: absolute;
  width: 50vw;
  height: 70vh;
  top: 25%;
  left: 0;
  right: 0;
  background: #fff;
  margin: 0 auto;
  z-index: 2;
`;
const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
`;

interface IProp {
  id: string | undefined;
}

function ContentDetail({ id }: IProp) {
  const navigate = useNavigate();
  const overlayClicked = () => {
    navigate(-1);
  };
  return (
    <Wrapper>
      <AnimatePresence>
        <>
          <Detail layoutId={id}></Detail>
          <Overlay onClick={overlayClicked} />
        </>
      </AnimatePresence>
    </Wrapper>
  );
}

export default ContentDetail;
