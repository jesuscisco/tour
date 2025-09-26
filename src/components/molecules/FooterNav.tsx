import React from 'react';
import Link from 'next/link';

const FooterNav = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-gold p-4 flex justify-around md:hidden">
      <Link href="/models">
        <a className="text-white">Modelos</a>
      </Link>
      <Link href="/info">
        <a className="text-white">Info</a>
      </Link>
      <Link href="/plants">
        <a className="text-white">Plantas</a>
      </Link>
      <Link href="/location">
        <a className="text-white">Ubicación</a>
      </Link>
    </footer>
  );
};

export default FooterNav;