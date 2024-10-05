
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
import ourfaculty from '../../Images/ourfaculty.jpeg'
import logo from '../../Images/Computer Science NEW LOGO.png'


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
          <div className="main col-span-11 px-20 sm:px-2 ">
            
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
            <div className="aboutUs mt-5  overflow-hidden container mx-auto px-20 sm:px-2" data-aos='fade-up'>
            <h2 className='text-center sm:text-2xl mx-auto pb-4 relative text-[#910029] font-semibold text-7xl mb-5 after:absolute after:w-[20%] after:h-1 after:bg-[#910029] after:bottom-0 after:left-1/2 after:transform after:-translate-x-1/2 after:content-[""]'>
  About Us
</h2>

              
              <div className='flex justify-between mt-10 flex-wrap md:flex-col md:justify-center md:items-center '>
              <div className='w-[30%] md:w-full'data-aos='fade-right'>
                <img src={img2} alt='logo' className='rounded-md h-full'/>
              </div>
              <div className='bg-[#910029] w-[60%] md:w-full rounded-md' data-aos='fade-left'>
              
              <p className=' max-w-full p-5 leading-8 font-semibold text-white text-2xl  sm:text-sm sm:p-1'>Al-Ahram Canadian University <br/> is a private university in 6th of October City, Egypt. It was established by Al-Ahram Egyptian daily newspaper.<br></br> It includes a Faculty of Pharmacy, School of Business, Faculty of Computer and Information Technology,<br/> Faculty of Mass Communication, Faculty of Oral and Dental Medicine and Faculty of Engineering.</p>
              </div>
             
              </div>
            </div>
            <div className="ourfaculty " data-aos="fade-right">
              <h2 className='text-center sm:text-2xl mx-auto pb-4 relative text-[#910029] font-semibold text-7xl mb-5 after:absolute after:w-[20%] after:h-1 after:bg-[#910029] after:bottom-0 after:left-1/2 after:transform after:-translate-x-1/2 after:content-[""] mt-20'>OUR FUCALTY</h2>
              <div className='flex mt-10 px-20 sm:flex-col sm:px-2'>
              <div className='bg-[#910029] w-[30%] sm:w-full p-5'>
                <p className='text-5xl text-white'>Faculty Of Computer Science and Information Technology.</p>
                <img src={logo} alt='logo/img' className='w-20 mt-4'/>
              </div>
              <div>
                <img src={ourfaculty} alt='faculty/image'/>
              </div>
              </div>
            </div>
        </div>
            
           
          
       
        
        </>
    )
}
export default Home