"use client"
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css';

export default function SwiperContainer() {
    return (
        <>
            <Swiper
                className="w-full h-[397px]"
                modules={[Autoplay]}
                loop={true}
                autoplay={{
                    delay: 3500,                 // หน่วงเวลาก่อนเลื่อน (มิลลิวินาที)
                    disableOnInteraction: false, // ผู้ใช้ลากแล้ว ยังให้เล่นต่อเอง
                    pauseOnMouseEnter: true,     // เอาเมาส์วางทับแล้วหยุดชั่วคราว
                }}
                spaceBetween={16}
                slidesPerView='auto'
                centeredSlides={false}

            >
                <SwiperSlide className='!w-[820px] !h-full'>
                    <div className='h-full bg-pink-300 flex items-center justify-center'>
                        slide 1
                    </div>
                </SwiperSlide>
                <SwiperSlide className='!w-[820px] !h-full'>
                    <div className='h-full bg-pink-300 flex items-center justify-center'>
                        slide 2
                    </div>
                </SwiperSlide>
                <SwiperSlide className='!w-[820px] !h-full '>
                    <div className='h-full bg-pink-300 flex items-center justify-center'>
                        slide 3
                    </div>
                </SwiperSlide>
            </Swiper>
        </>
    )
}