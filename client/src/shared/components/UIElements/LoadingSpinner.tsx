import React from 'react'

import './LoadingSpinner.css'

interface IProps {
  asOverlay: any;
}

const LoadingSpinner = (props: IProps) => {
  return (
    <div className={`${props.asOverlay && 'loading-spinner__overlay'}`}>
      <div className='lds-dual-ring'></div>
    </div>
  )
}

export default LoadingSpinner
