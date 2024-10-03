
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import img1 from '../../Images/main.jpeg'
import img2 from '../../Images/main2.jpeg'
import img3 from '../../Images/main3.jpeg'
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'swiper/css/autoplay'
import TemporaryDrawer from './Rolesidebar';
import { useEffect } from 'react';


function Home(){
    
    
    useEffect(()=>{
      AOS.init();
    },[])
    return(
        <>

        <div>
          
          <div className="sidebar">
            <TemporaryDrawer/>
          </div>
          <div className="main col-span-11">
            
          <Swiper
  spaceBetween={30}
  slidesPerView={1}
        centeredSlides={true}
  autoplay={{
    delay: 3000,  // Set delay to 3000ms (3 seconds)
    disableOnInteraction: false,
  }}
  loop={true}
  modules={[Autoplay, Pagination, Navigation]}
>
  <SwiperSlide>
    <img src={img1} alt="opening-image" className="w-full" />
  </SwiperSlide>
  <SwiperSlide>
    <img src={img2} alt="opening-image" className="w-full" />
  </SwiperSlide>
  <SwiperSlide>
    <img src={img3} alt="opening-image" className="w-full" />
  </SwiperSlide>
</Swiper>

            </div>
            <div className="aboutUs mt-5 p-5 overflow-hidden " data-aos='fade-up'>
            <h2 className='text-center w-[400px] sm:w-[150px] sm:text-2xl mx-auto pb-4 text-[#910029] font-semibold text-7xl mb-5 border-b-2 border-[#910029] '>About Us</h2>
              
              <div className='grid grid-cols-12 sm:grid-cols-2 sm:grid-rows-2 md:grid-cols-4 gap-5 mt-10 mx-auto '>
              <div className='col-span-4 sm:col-span-3 md:col-span-2 md:row-span-1 'data-aos='fade-right'>
                <img src={img2} alt='logo'/>
              </div>
              <div className='bg-[#910029] col-span-8 sm:col-span-3 md:col-span-2' data-aos='fade-left'>
              
              <p className='sm:truncate  max-w-full p-5 leading-8 font-semibold text-white text-2xl'>Al-Ahram Canadian University <br/> is a private university in 6th of October City, Egypt. It was established by Al-Ahram Egyptian daily newspaper.<br></br> It includes a Faculty of Pharmacy, School of Business, Faculty of Computer and Information Technology,<br/> Faculty of Mass Communication, Faculty of Oral and Dental Medicine and Faculty of Engineering.</p>
              </div>
             
              </div>
            </div>
        </div>
            
           
          
       
        
        </>
    )
}
export default Home