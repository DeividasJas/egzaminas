import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import LoginUser from '../pages/login';
export default function Layout() {
  return (
    <>
      <div className='flex flex-col min-h-[100dvh] max-w-[1100px] mx-auto'>
        <Header />
        <Outlet />
        <Footer />
      </div>
    </>
  );
}
