import React from 'react'
import Navbar from '../componentss/Navbar'
import Herobar from '../componentss/Herobar'
import DesktopCard from '../componentss/DesktopCard'
import GetIntouch from '../componentss/GetIntouch'
import Footer from '../componentss/Footer'


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