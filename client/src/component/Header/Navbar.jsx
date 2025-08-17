import React from 'react'
import { useNavigate } from 'react-router-dom'
import Search from './Search'
import { BsCart3 } from "react-icons/bs";
import { TbLogin } from "react-icons/tb";
import Header from './Index';

const Navbar = () => {
    const navigate = useNavigate()
    return (
        <div>
            <Header />
            <div className="flex w-full  p-2 bg-slate-800 text-[white] font-[verdana]">
                <div class="w-[50%] flex items-center relative">
                    <p>logo</p>
                    <Search />
                </div>
                <div className="flex p-2 w-[45%] justify-between cursor-pointer">
                    <div onClick={() => navigate('/about')}>Category</div>
                    <div onClick={() => navigate('/contact')}>Trending</div>
                    <div onClick={() => navigate('/collection')} className='flex'>Your Cart <BsCart3 className='ms-2 items-center' size={20} /></div>
                    <div onClick={() => navigate('/login')} className='flex'>Login <TbLogin className='ms-2 items-center ' size={20} /></div>
                </div>
            </div>

        </div>
    )
}

export default Navbar
