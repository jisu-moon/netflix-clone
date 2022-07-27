import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  padding: 0 60px;
  background: #000;
  color: #fff;
  font-size: 14px;
  width: 100%;
  position: fixed;
  top: 0;
  overflow: hidden;
`;
const Col = styled.div`
  display: flex;
  align-items: center;
`;
const Logo = styled.svg`
  width: 92.5px;
  margin-right: 25px;
  fill: ${props => props.theme.red};
  transform: translateY(1.8px);
  path {
    stroke: ${props => props.theme.red};
    box-sizing: border-box;
  }
`;
const Items = styled.ul`
  display: flex;
  align-items: center;
`;
const Item = styled.li<{ active: boolean }>`
  margin-left: 20px;
  font-weight: 400;
  color: ${props =>
    props.active ? props.theme.white.lighter : props.theme.white.darker};
  transition: 0.3s ease-in-out;
  font-weight: ${props => (props.active ? 700 : 400)};
  &:hover {
    color: ${props => props.theme.white.veryDark};
  }
  position: relative;
`;
const Search = styled.span`
  color: #fff;
  svg {
    height: 20px;
    fill: ${props => props.theme.white.darker};
  }
`;
const Circle = styled(motion.div)`
  width: 5px;
  height: 5px;
  border-radius: 2.5px;
  background: ${props => props.theme.red};
  position: absolute;
  bottom: -10px;
  left: 0;
  right: 0;
  margin: 0 auto;
`;

const logoAni = {
  start: {
    pathLength: 0,
    fillOpacity: 0,
    strokeWidth: 8,
  },
  end: {
    pathLength: 1,
    fillOpacity: 1,
    strokeWidth: 0,
  },
};

const menuData = [
  {
    name: '홈',
    path: '/',
  },
  {
    name: 'TV',
    path: '/tv',
  },
];

function Header() {
  const nowPath = useLocation().pathname;
  return (
    <Nav>
      <Col>
        <Link to='/'>
          <Logo viewBox='0 -187 512 512'>
            <motion.path
              variants={logoAni}
              initial='start'
              animate='end'
              transition={{
                default: { duration: 3 },
                fill: { duration: 2, delay: 1.5 },
              }}
              d='M340.657183,0 L340.657183,100.203061 C353.016406,100.778079 365.344207,101.473198 377.637095,102.293306 L377.637095,123.537553 C358.204486,122.242243 338.690182,121.253471 319.094879,120.57923 L319.094879,0 L340.657183,0 Z M512,0.0118710746 L483.922918,65.1060972 L511.993017,137.54371 L511.961595,137.557485 C503.784957,136.3909 495.597845,135.289637 487.386294,134.233936 L471.623048,93.5776798 L455.709676,130.459835 C448.168455,129.627123 440.61676,128.839275 433.047609,128.100899 L460.419447,64.6708546 L435.351871,0.0118710746 L458.677285,0.0118710746 L472.712335,36.1957639 L488.318473,0.0118710746 L512,0.0118710746 Z M245.093161,119.526252 L245.092462,0.0114869428 L305.282574,0.0114869428 L305.282574,21.4467074 L266.654767,21.4467074 L266.654767,49.2277266 L295.881884,49.2277266 L295.881884,70.4719734 L266.654767,70.4719734 L266.654767,119.521329 L245.093161,119.526252 Z M164.580156,21.448488 L164.579458,0.0103695593 L231.270382,0.0103695593 L231.270382,21.4469875 L208.705375,21.4469875 L208.705375,120.107799 C201.508397,120.296154 194.3191,120.519389 187.144466,120.790104 L187.144466,21.448488 L164.580156,21.448488 Z M90.8682168,126.966224 L90.8682168,0.0139657936 L150.758077,0.0139657936 L150.758077,21.4491862 L112.42703,21.4491862 L112.42703,50.4849807 C121.233151,50.3722116 133.754021,50.2444297 141.543822,50.2632828 L141.543822,71.5092753 C131.792954,71.388127 120.786264,71.6429923 112.42703,71.7264345 L112.42703,103.88974 C125.166805,102.887736 137.944984,102.011069 150.758077,101.270912 L150.758077,122.517253 C130.704017,123.672422 110.740031,125.160591 90.8682168,126.966224 Z M48.5710466,77.8540254 L48.5696502,0.0104745953 L70.1319549,0.0104745953 L70.1319549,128.968837 C62.2496338,129.779728 54.3823252,130.642465 46.5286328,131.553346 L21.5609083,59.8244682 L21.5609083,134.625696 C14.3597408,135.563565 7.17323695,136.54141 0,137.562338 L0,0.0118710746 L20.4911722,0.0118710746 L48.5710466,77.8540254 Z M395.425298,124.819071 L395.425298,124.819211 L395.425298,0.0120101224 L416.987603,0.0120101224 L416.987603,126.599777 C409.809478,125.960833 402.624371,125.369895 395.425298,124.819071 Z'
            />
          </Logo>
        </Link>
        <Items>
          {menuData.map(menu => {
            const { name, path } = menu;
            return (
              <Item key={name} active={nowPath === path}>
                <Link to={path}>{name}</Link>
                {nowPath === path && <Circle layoutId='circle' />}
              </Item>
            );
          })}
        </Items>
      </Col>
      <Col>
        <Search>
          <svg viewBox='0 0 487.95 487.95'>
            <g>
              <path d='M481.8,453l-140-140.1c27.6-33.1,44.2-75.4,44.2-121.6C386,85.9,299.5,0.2,193.1,0.2S0,86,0,191.4s86.5,191.1,192.9,191.1    c45.2,0,86.8-15.5,119.8-41.4l140.5,140.5c8.2,8.2,20.4,8.2,28.6,0C490,473.4,490,461.2,481.8,453z M41,191.4    c0-82.8,68.2-150.1,151.9-150.1s151.9,67.3,151.9,150.1s-68.2,150.1-151.9,150.1S41,274.1,41,191.4z' />
            </g>
          </svg>
        </Search>
      </Col>
    </Nav>
  );
}

export default Header;

<svg></svg>;
