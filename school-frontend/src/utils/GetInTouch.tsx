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
                        <h2 className='text-xl md:text-2xl font-bold'>আপনার সন্তানের সুন্দর ও সমৃদ্ধ ভবিষ্যৎ গড়তে আজই যোগাযোগ করুন</h2>
                        <p className='text-sm text-[#F9E8A2] mt-1'>অভিজ্ঞ শিক্ষক, উন্নত পাঠ্যক্রম এবং সুশৃঙ্খল পরিবেশের নিশ্চয়তা।</p>
                    </div>
                </div>
                <Link
                    href="/contact"
                    className='bg-[#F9E8A2] text-[#5c4300] px-8 py-3.5 rounded-xl font-bold text-base shadow-md hover:bg-[#fae488] transition-all whitespace-nowrap'
                >
                    যোগাযোগ ও ভর্তি
                </Link>
            </div>
        </section>
    );
};

export default GetInTouch;
