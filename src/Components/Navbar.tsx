'use client';

import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="flex justify-between p-4 bg-gray-800 text-white">
      <div className="flex space-x-4">
        <Link href="/" passHref>
          <span className="text-white no-underline mr-4">Home</span>
        </Link>
        <Link href="/userform" passHref>
          <span className="text-white no-underline mr-4">User Form</span>
        </Link>
        <Link href="/userlist" passHref>
          <span className="text-white no-underline">User List</span>
        </Link>
        <Link href="/modifyuser" passHref>
          <span className="text-white no-underline">Mod User</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
