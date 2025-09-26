import React from 'react';
import Link from 'next/link';

const SidebarMenu = () => {
  return (
    <div className="sidebar-menu">
      <h2 className="menu-title">Navigation</h2>
      <ul className="menu-list">
        <li>
          <Link href="/models">
            <a className="menu-item">Models</a>
          </Link>
        </li>
        <li>
          <Link href="/info">
            <a className="menu-item">Info</a>
          </Link>
        </li>
        <li>
          <Link href="/plants">
            <a className="menu-item">Plants</a>
          </Link>
        </li>
        <li>
          <Link href="/location">
            <a className="menu-item">Location</a>
          </Link>
        </li>
      </ul>
      <style jsx>{`
        .sidebar-menu {
          background-color: gold;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
        .menu-title {
          font-size: 1.5rem;
          margin-bottom: 10px;
        }
        .menu-list {
          list-style: none;
          padding: 0;
        }
        .menu-item {
          display: block;
          padding: 10px;
          color: black;
          text-decoration: none;
          transition: background-color 0.3s;
        }
        .menu-item:hover {
          background-color: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
};

export default SidebarMenu;