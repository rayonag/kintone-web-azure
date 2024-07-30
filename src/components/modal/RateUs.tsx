import { ApplicationSteps, handleCheckListClick } from '@/pages/apply';
import { color } from 'framer-motion';
import React, { useState, ChangeEvent, FC, ReactElement, useEffect } from 'react';
import Modal from 'react-modal';
import Link from 'next/link';
import { useDashboardUser } from '@/common/context/dashboardUser';
import GreenCheckMark from '../icons/GreenCheckMark';

const RateUs = () => {
    const dashboardUser = useDashboardUser();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [isComplete, setIsComplete] = useState(false);

    const modalStyle = {
        content: {
            top: '50%',
            right: 'auto',
            bottom: 'auto',
            left: '50%',
            transform: 'translate(-50%,-50%)',
            maxWidth: '30rem',
            width: '80%',
            color: 'black'
        }
    };

    useEffect(() => {
        if (isComplete) {
            setTimeout(() => {
                setIsComplete(false);
                setIsModalOpen(false);
            }, 3000);
        }
    }, [isComplete]);

    const handleSubmit = () => {
        const name = dashboardUser.name;
        fetch('/api/sendgrid/rateUs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, rating, comment })
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setIsComplete(true);
            });
    };

    return (
        <>
            <button className="btn" onClick={() => setIsModalOpen(true)}>
                Give Us Your Feedback
            </button>
            <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} style={modalStyle} ariaHideApp={false}>
                <div className="p-4">
                    {isComplete ? (
                        <>
                            <div className="flex justify-center">
                                <GreenCheckMark />
                            </div>
                            <h2 className="text-3xl font-medium mb-4 text-center">Thank you for your feedback!</h2>{' '}
                        </>
                    ) : (
                        <>
                            <h2 className="text-3xl font-bold mb-4">We want to hear from you!</h2>
                            <h2 className="text-xl font-bold text-gray-400 text-center">Rate Us</h2>
                            <div className="flex justify-center mb-4">
                                {[...Array(5)].map((_, index) => (
                                    <span
                                        key={index}
                                        className={`text-3xl cursor-pointer ${index < rating ? 'text-yellow-500' : 'text-gray-300'}`}
                                        onClick={() => setRating(index + 1)}
                                    >
                                        ★
                                    </span>
                                ))}
                            </div>
                            <textarea
                                placeholder="Your feedback helps us improve our service and system"
                                className="w-full p-2 mb-4 border border-gray-300 rounded"
                                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setComment(e.target.value)}
                                rows={3}
                            />
                            <div className="flex justify-between">
                                <button
                                    className="px-4 py-2 bg-gray-500 text-white rounded-full hover:bg-gray-600"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
                                    onClick={() => {
                                        handleSubmit();
                                        setIsModalOpen(false);
                                    }}
                                >
                                    Submit
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </Modal>
        </>
    );
};

export default RateUs;
