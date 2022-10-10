import Image from 'next/image';
import type { NextPage } from 'next';
import { Fragment } from 'react';
import PlayerList from '../components/PlayerList';
import AddNewPlayer from '../components/AddNewPlayer';

const Home: NextPage = () => {
  return (
    <Fragment>
      <header className='fixed z-50 w-full'>
        <div className='h-20 bg-gray-800 flex items-center justify-between p-8 '>
          <p className='text-2xl'>ASG TEAM BALANCER</p>
          <div className='h-16 w-16 relative bg-gray-300 rounded-lg'>
            <Image
              src='/icons/logo.png'
              alt='logo'
              layout='fill'
              objectFit='cover'
            />
          </div>
        </div>
      </header>
      <main className='bg-gray-600 py-24 relative h-fit min-h-full overflow-y-scroll'>
        <PlayerList />
      </main>
    </Fragment>
  );
};

export default Home;
