import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-black text-white ">
      <div className="mycontainer flex justify-between items-center px-4 py-5 h-12">
        <div className="logo font-bold text-white text-2xl">
          <span className="text-green-500">&lt;</span>
          <span>Password</span>
          <span className="text-green-500">Manager/&gt;</span>
        </div>
        <ul>
          {/* <li className='flex gap-4' >
            <a className='hover:font-bold' href="#">Home</a>
            <a className='hover:font-bold' href="#">About</a>
            <a className='hover:font-bold' href="#">Contact</a>
        </li> */}
        </ul>
        <button className="text-white bg-white my-5 rounded-md flex items-center gap-2 px-3 py-1 ring-white ring-1">
          <img className="w-6 h-6" src="github.png" alt="GitHub" />
          <span className="text-black font-bold">GitHub</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
