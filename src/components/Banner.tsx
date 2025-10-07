import Image from 'next/image';
import React from 'react';

const Banner = () => {
    return (
        <div className='relative'>
            <div className='relative w-full h-[400px]'>
            <Image src="/images/bgice.webp"     
            alt=""
            fill
            style={{ objectFit: "cover" }}
            priority />
            </div>
            <div className='absolute top-5 flex flex-col items-center justify-center'>
                <h4 className='text-4xl'>উড়াল দিন</h4>
                <div>
                    <div className='flex items-center'></div>
                    <div className='flex items-center'></div>
                    <div className='flex items-center'></div>
                </div>
            </div>
        </div>
    );
};

export default Banner;