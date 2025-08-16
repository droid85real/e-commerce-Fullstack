import React from 'react'
import { LuSearch } from "react-icons/lu";
import Button from '@mui/material/Button';


const Search = () => {
    return (
        <>
            <div className=" flex w-[350px] h-[45px] bg-slate-300 absolute bottom-0 left-[200px] rounded-xl  border-2 border-gray-400">
                <input type="text" name="" id="" placeholder='enter the text here...' className='w-[300px] p-2 focus:outline-none bg-inherit h-[40px] ms-3' />
                <Button><LuSearch size={30} /></Button>
                
                </div>
        </>
    )
}

export default Search
