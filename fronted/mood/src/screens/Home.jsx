import React from 'react'
import Navbar from '../componentss/Reuse/Navbar'
import Herobar from '../componentss/User_View/Herobar'
import GetIntouch from '../componentss/User_View/GetIntouch'
import Footer from '../componentss/Reuse/Footer'
import TrendingLibraries from '../componentss/home/TrendingLibraries'
import SuggestedLibraries from '../componentss/home/SuggestedLibraries'


function Home() {
  return (
<>
<div style={{display : "flex" , gap : "50px" , flexDirection : "column" , overflow : "hidden"}}>
<div>
<Navbar/>
<Herobar/>
</div>
<TrendingLibraries/>
<SuggestedLibraries/>
<GetIntouch/>
<Footer/>
</div>
</>
  )
}

export default Home