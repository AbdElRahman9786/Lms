
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import 'swiper/css';
import img from '../../Images/wallpapersden.com_programming-coding-language_1920x1080.jpg'
import 'swiper/css/autoplay'
import Sidebar from './Rolesidebar';
import TemporaryDrawer from './Rolesidebar';

function Home(){
    
    
    const swiper = useSwiper();
    return(
        <>
        <div className="grid grid-cols-12 grid-rows-2  h-screen ">
          <div className="sidebar col-span-1 row-span-2 ">
            <TemporaryDrawer/>
          </div>
          <div className="main col-span-11 py-5 px-5">
            <h1 className="text-center font-bold">wlcome back </h1>
            <Swiper
      spaceBetween={50}
      slidesPerView={2}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide><img src={img} alt=''/></SwiperSlide>
      <SwiperSlide>Slide 2</SwiperSlide>
      <SwiperSlide>Slide 3</SwiperSlide>
      <SwiperSlide>Slide 4</SwiperSlide>
      
    </Swiper>
            </div>
        </div>
            
           
          
       
        
        </>
    )
}
export default Home