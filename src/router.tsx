import { AnimatePresence } from 'framer-motion';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Home from './Routes/Home';
import Search from './Routes/Search';
import Tv from './Routes/Tv';

function Router() {
  return (
    <BrowserRouter>
      <Header />
      <AnimatePresence>
        <Routes>
          <Route path='/' element={<Home />}>
            <Route path='detail/:id' element={<Home />} />
          </Route>
          <Route path='/tv' element={<Tv />} />
          <Route path='/search' element={<Search />} />
        </Routes>
      </AnimatePresence>
    </BrowserRouter>
  );
}

export default Router;
