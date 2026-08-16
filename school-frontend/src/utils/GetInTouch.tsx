import React from 'react';
import { MdMosque } from 'react-icons/md';
import Link from 'next/link';

const GetInTouch = () => {
    return (
        <section className='container lg:mt-20 mb-20 relative z-50'>
            <section className='bg-primary py-10 px-5 max-w-4xl mx-auto rounded-xl shadow-lg flex flex-col md:flex-row items-center justify-between gap-5'>
                <div className='flex items-center gap-5 text-white'>
                    <div className='bg-yellow-400 p-4 rounded-full shadow-lg'>
                        <MdMosque fill="#374868" size={28} />
                    </div>
                    <h2 className='text-lg md:text-2xl font-bold'>শয়তান যেন আপনার দ্বীন শিখার পথে বিলম্ব না করায়। আজই শুরু করুন!</h2>
                </div>
                <Link
                    href="https://docs.google.com/forms/d/e/1FAIpQLSd-SCNJ6ay9vvFIGfSPQizD5YKd0GJqZljXSDTKy9oLeBks5g/viewform"
                    target="_blank"
                    className='bg-white text-black px-5 py-3 rounded-lg font-semibold shadow-md hover:bg-gray-100 w-[268px] text-center'
                >
                    ভর্তি হোন
                </Link>
            </section>
        </section>
    );
};

export default GetInTouch;
