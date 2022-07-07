import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import not from '../assets/404s.svg'

function NotFound() {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <section style={{backgroundColor: 'var(--admin-bg-color)', height: '100vh'}}>
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
       <h1>Page not found.</h1>
<img src={not} alt="" style={{width: '280px', height: '400px'}}/>
       <br />
       <p>Page doesn't exist.</p>
     
           <Button  onClick={goBack}>Go Back</Button>
       </div>
   </section>
  )
}

export default NotFound;