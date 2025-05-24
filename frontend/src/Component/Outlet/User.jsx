import React from 'react'
import Navbar from '../User/Navbar'
import Slider from '../User/Slider'
import Introduction from '../User/Introduction'
import Gallery from '../User/Gallery'
import Footer from '../User/Footer'



const User = () => {
    return (
        <> 

            <Navbar/>

         

            <div class="main-wrapper ">
            
                <Slider/>

              
                <Introduction/>


                

           
             

                
                <Gallery/>

                <Footer/>
   
            </div>
        </>
    )
}

export default User
