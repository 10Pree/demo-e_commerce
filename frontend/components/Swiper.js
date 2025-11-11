"use client"
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css';

export default function SwiperContainer() {
    return (
        <div className='px-2 md:px-0'>
            <Swiper
                className="w-full h-[350px]"
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
                <SwiperSlide className='!w-full !h-full md:!w-[820px]'>
                    <div className='h-full bg-[#1E3A8A] flex items-center justify-center rounded-[8px]'>
                        slide 1
                    </div>
                </SwiperSlide>
                <SwiperSlide className='!w-full !h-full md:!w-[820px]'>
                    <div className='h-full bg-[#1E3A8A] flex items-center justify-center rounded-[8px]'>
                        slide 2
                    </div>
                </SwiperSlide>
                <SwiperSlide className='!w-full !h-full md:!w-[820px]'>
                    <div className='h-full bg-[#1E3A8A] flex items-center justify-center rounded-[8px]'>
                        slide 3
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    )
}