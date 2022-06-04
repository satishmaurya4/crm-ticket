import React from 'react'
import pageNotfound from '../assets/404s.svg'

const NotFound = () => {
  return (
      <div className='container d-flex justify-content-center align-items-center' style={{height: '100vh'}}>
          <img src={pageNotfound} alt="page not found" style={{width: '400px'}}/>
    </div>
  )
}

export default NotFound