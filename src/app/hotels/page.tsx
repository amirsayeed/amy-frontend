import HotelForm from '@/components/search/hotels/HotelForm';
import React from 'react';

const page = () => {
    return (
    <main>
        <section className="relative isolate">
        <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/bg9.webp')" }}
        />
        <div className="absolute inset-0 -z-10 bg-black/30" />

        <div className="container mx-auto max-w-6xl px-4 py-6 md:py-10">
        <h1 className="text-center text-4xl md:text-5xl font-extrabold text-white drop-shadow">Hotels</h1>

        <div className="mx-auto mt-4 max-w-5xl rounded-[22px] bg-white/90 p-3 shadow-[0_10px_30px_rgba(0,0,0,0.15)] backdrop-blur ring-1 ring-black/5">
        <HotelForm/>
        </div>
        </div>
        </section>
    </main>
    );
};

export default page;