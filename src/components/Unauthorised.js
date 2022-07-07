import { useNavigate } from "react-router-dom"
import not from '../assets/403s.svg'
import {Button} from "@mui/material"

const Unauthorized = () => {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    return (
        <section style={{backgroundColor: 'var(--admin-bg-color)', height: '100vh'}}>
         <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <h1>Unauthorized Access</h1>
<img src={not} alt="" style={{width: '280px', height: '400px'}}/>
            <br />
            <p>You do not have access to the requested page.</p>
          
                <Button  onClick={goBack}>Go Back</Button>
            </div>
        </section>
       
    )
}

export default Unauthorized