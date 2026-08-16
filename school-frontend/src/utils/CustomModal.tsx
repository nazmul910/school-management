'use client';
import { useEffect } from 'react';
import { IoCloseSharp } from 'react-icons/io5';

interface CustomModalProps {
    isModalOpen: boolean;
    larger?: boolean;
    setIsModalOpen: (isOpen: boolean) => void;
    children: React.ReactNode;
}


const CustomModal = ({ isModalOpen, larger, setIsModalOpen, children }: CustomModalProps) => {

    useEffect(() => {
        if (typeof window !== "undefined") {
            const handleOutsideClick = (event: MouseEvent) => {
                const target = event.target as HTMLElement;
                if (target.id === 'modal-overlay') {
                    setIsModalOpen(false);
                }
            };

            window.addEventListener('click', handleOutsideClick);
            return () => {
                window.removeEventListener('click', handleOutsideClick);
            };
        }
    }, [setIsModalOpen]);


    return (
        <div
            id="modal-overlay"
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 transition-opacity duration-300 ${isModalOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        >
            <div className={`relative bg-white ${larger ? `w-[750px]` : "w-[340px] md:w-[450px]"} rounded-lg`}>
                <button
                    className="absolute top-2 right-2 w-6 md:w-9 h-6 md:h-9 flex items-center justify-center bg-dark/20 text-purple text-xl hover:bg-red-400/20 hover:text-red-500 shadow-lg hover:shadow-red-400/20 rounded-full duration-300 z-30 group"
                    onClick={() => setIsModalOpen(false)}
                >
                    <IoCloseSharp size='24' className='group-hover:rotate-180 duration-300' />
                </button>
                <div className='p-5'>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default CustomModal;