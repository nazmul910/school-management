import React from 'react';
import { LuGraduationCap } from 'react-icons/lu';
import Link from 'next/link';

const GetInTouch = () => {
    return (
        <section className='max-w-[1400px] mx-auto px-4 md:px-6 my-16 relative z-10'>
            <div className='bg-gradient-to-r from-[#78A4CB] to-[#1e3a5f] p-8 md:p-10 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6'>
                <div className='flex items-center gap-5 text-white'>
                    <div className='bg-[#F9E8A2] p-4 rounded-2xl shadow-md shrink-0 text-[#5c4300] text-3xl'>
                        <LuGraduationCap />
                    </div>
                    <div>
                        <h2 className='text-xl md:text-2xl font-bold'>Build a Bright & Successful Future for Your Child Today</h2>
                        <p className='text-sm text-[#F9E8A2] mt-1'>Guaranteed experienced faculty, modern curriculum, and a disciplined environment.</p>
                    </div>
                </div>
                <Link
                    href="/contact"
                    className='bg-[#F9E8A2] text-[#5c4300] px-8 py-3.5 rounded-xl font-bold text-base shadow-md hover:bg-[#fae488] transition-all whitespace-nowrap'
                >
                    Contact & Admission
                </Link>
            </div>
        </section>
    );
};

export default GetInTouch;
