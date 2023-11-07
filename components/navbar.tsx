"use client";

import { Menu } from 'lucide-react';
import Link from  'next/link';
import { useState } from 'react';
import { ModeToggle } from './ui/mode-toggle';

const Navbar = () => {
    const [state, setState] = useState(false)

    const menus = [
        {title: 'Mindmap', path: '/mindmap'},
        {title: 'Leitner box', path: '/leitner-box'},
        {title: 'Daily question', path: '/daily-question'},
    ]

    return ( 
        <nav className=" border-b md:border-0">
            <div className='items-center px-4 max-w-screen-xl mx-auto md:flex md:px-8'>
               <div className='flex items-center justify-between py-3 md:py-5 md:block'>
                    <Link href="/">
                        <p>Logo</p>
                    </Link>
                    <div className="md:hidden">
                        <button className="text-gray-700 outline-none p-2 rounded-md focus:border-gray-400 focus:border"
                        onClick={() => setState(!state)}>
                        <Menu />
                    </button>
                    </div>
               </div> 
               <div className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${ state ? "block" : "hidden" }`}>
                    <ul className="justify-center items-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                        {menus.map((item, idx) => (
                        <li key={idx} className="text-gray-600 hover:text-indigo-600">
                            <Link href={item.path}>{item.title}</Link>
                        </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <ModeToggle />
                </div>
            </div>
        </nav>
     );
}
 
export default Navbar;