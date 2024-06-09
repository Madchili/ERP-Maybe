'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';

const ConditionalNavbar = () => {
  const pathname = usePathname();

  const noNavbarPaths = ['/login', '', '/'];

  const shouldShowNavbar = !noNavbarPaths.includes(pathname);

  return shouldShowNavbar ? <Navbar /> : null;
};

export default ConditionalNavbar;
