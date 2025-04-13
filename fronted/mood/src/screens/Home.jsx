import React from 'react'
import Navbar from '../componentss/Reuse/Navbar'
import Herobar from '../componentss/User_View/Herobar'
import DesktopCard from '../componentss/User_View/DesktopCard'
import GetIntouch from '../componentss/User_View/GetIntouch'
import Footer from '../componentss/Reuse/Footer'


function Home() {
  return (
<>
<div style={{display : "flex" , gap : "50px" , flexDirection : "column" , overflow : "hidden"}}>
<div>
<Navbar/>
<Herobar/>
</div>
<DesktopCard/>
<GetIntouch/>
<Footer/>
</div>
</>
  )
}

export default Home