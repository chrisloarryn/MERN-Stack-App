import React from 'react'

import './MainHeader.css'

interface IProps {
  children: any;
}

const MainHeader = (props: IProps)  => {
  return (<header className='main-header'>
           {props.children}
         </header>)
}

export default MainHeader
