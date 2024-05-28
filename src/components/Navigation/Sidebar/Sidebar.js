import React, { useEffect, useState } from 'react'
import * as BiIcons from "react-icons/bi";
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import "./Sidebar.css";
import mainLogo from'./logo.png';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom'

const Logo = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 10px;
  cursor: pointer;
  margin-left: -10px;
`

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  // const [isActive, setIsActive] = useState(0);
  const [change, setChange] = useState(true)
  const [pathname, setPathname] = useState('')
  const changePath = () => {
    setChange(!change)
  }
  const showSidebar = () => setIsExpanded(!isExpanded);

  const history = useHistory()
  useEffect(() => {
    return history.listen((location) => { 
      console.log(`You changed the page to: ${location.pathname}`)
      setPathname(location.pathname)
    })
  }, [history])
  
  return (
    <>
      <div className={isExpanded ? 'Sidebar' : 'Sidebar collapsed'}>
        <div className='sidebar-header d-flex align-items-center'>
          <Logo src={mainLogo} alt='logo' onClick={showSidebar} />
          {/* <FaIcons.FaBars className="sidebar-icon" onClick={showSidebar} /> */}
          <span className="sidebar-logo">EventApp</span>
        </div>
        <div className="sidebar-items">
          {SidebarData.map((item, index) => {
            return (
              <Link
                className="sidebar-item"
                to={item.path}
                key={index}
                style={pathname === item.path ? {
                  backgroundColor: "white",
                } : {}}
                onClick = {changePath}
              >
                <span className="sidebar-icon" style={pathname === item.path ? {
                  color: 'black',
                } : {}}>
                  {item.icon}
                </span>
                <span className="sidebar-text" style={pathname === item.path ? {
                  color: 'black',
                } : {}}>
                  {item.title}
                </span>
              </Link>
            )
          })}
          <Link
            className="sidebar-logout"
            to="/"
          >
            <span className="sidebar-icon">
              <BiIcons.BiLogOut />
            </span>
            <span className="sidebar-text">
              Log out
            </span>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Sidebar