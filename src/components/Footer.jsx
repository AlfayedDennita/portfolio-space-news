import React from 'react';

export default function Footer() {
  return (
    <footer className="border-slate-700 mt-16 border-t-2">
      <div className="sm:flex-row sm:text-left text-slate-300 flex flex-col justify-between max-w-screen-lg gap-2 p-6 mx-auto text-center">
        <p>Copyright &copy; {new Date().getFullYear()}</p>
        <p>Created by <a className="text-primary hover:underline hover:decoration-secondary hover:decoration-2 hover:underline-offset-3 font-bold" href="https://alfayeddennita.github.io/" target="_blank" rel="noreferrer" title="Alfayed Dennita">Alfayed Dennita</a></p>
      </div>
    </footer>
  );
}
