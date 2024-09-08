
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import 'swiper/css';
import img from '../../Images/wallpapersden.com_programming-coding-language_1920x1080.jpg'
import 'swiper/css/autoplay'

function Home(){
    
    
    const swiper = useSwiper();
    return(
        <>
        
            
           
          
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
   
        
        </>
    )
}
export default Home