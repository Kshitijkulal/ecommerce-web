import React from 'react'
import { RiAlignCenter } from 'react-icons/ri'
import { Link } from 'react-router-dom'
const footer = () => {
  return (
    <div className='footer bg-dark text-light p-3'><h4 className='text-center'>All Rights Reserved &copy; SewChic</h4>
    <p className='text-center m-3'>
    <Link to = "/about">About</Link>
    <Link to = "/contact">Contact</Link>
    <Link to = "/policy">policy</Link>
    </p>
    </div>
    )
}

export default footer