import { EventListPage } from './eventPage';
// import { useState } from 'react';
import LargeWithLogoCentered from '../components/footer';
import Carousel from '../components/carousel';
// import Navbar from '../components/navbar';

export const Homepage = ({ searching }) => {
  // const [search, setSearch] = useState('');
  return (
    <>
      {/* <Navbar search={search} setSearch={setSearch} /> */}
      <Carousel />
      <EventListPage searching={searching} />
      <div>
        <LargeWithLogoCentered />
      </div>
    </>
  );
};
