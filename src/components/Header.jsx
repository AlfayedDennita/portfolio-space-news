import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header>
      <div className="sm:py-16 max-w-screen-lg px-6 py-12 mx-auto text-center">
        <h1 className="font-merriweather sm:text-6xl text-5xl italic font-black">
          <Link to="/" title="Space News">
            <span className="text-primary">Space</span>
            <span className="text-secondary">News</span>
          </Link>
        </h1>
      </div>
    </header>
  );
}
