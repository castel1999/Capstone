import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const SideBar = () => {
  return (
    <div>
        <div></div>
        <div className='flex flex-col gap-5'>
            <NavLink to='profile'>Thông tin cá nhân</NavLink>
            <NavLink to='wallet'>Ví</NavLink>
            <NavLink to='upgrade'>Nâng cấp tài khoản</NavLink>
            <Link to='/login'>Đăng xuất</Link>
        </div>
    </div>
  )
}

export default SideBar