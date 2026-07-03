"use client";

import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import Image from "next/image";
import IconTop from "../../../public/assets/question.png";
import { useTranslation } from "react-i18next";
const {t} = useTranslation();

type FAQ = {
    id: number;
    question: string;
    answer: string | string[];
};

const faqs: FAQ[] = [
    {
        id: 1,
        question: t("questions.questions.q1.question"),
        answer: [
            t("questions.questions.q1.answer1"),
            t("questions.questions.q1.answer2"),
            t("questions.questions.q1.answer3"),
            t("questions.questions.q1.answer4"),
        ],
    },
    {
        id: 2,
        question: t("questions.questions.q2.question"),
        answer: t("questions.questions.q2.answer"),
    },
    {
        id: 3,
        question: t("questions.questions.q3.question"),
        answer: t("questions.questions.q3.answer"),
    },
    {
        id: 4,
        question: t("questions.questions.q4.question"),
        answer: t("questions.questions.q4.answer"),
    },
    {
        id: 5,
        question: t("questions.questions.q5.question"),
        answer: t("questions.questions.q5.answer"),
    },
];

const Question: React.FC = () => {
    const [openId, setOpenId] = useState<number | null>(null);

    const toggleFAQ = (id: number) => {
        setOpenId((prev) => (prev === id ? null : id));
    };

    return (
        <section className="w-full flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 bg-[#0f0f1a] text-white">
            {/* Header */}
            <div className="text-center max-w-5xl md:mt-20 mb-10">
                <div className="flex justify-center items-center gap-2 mb-4">
                    <Image
                        src={IconTop}
                        alt="Why Choose Us Icon"
                        width={30}
                        height={24}
                        className="object-contain"
                    />
                    <span className="uppercase tracking-wide text-md font-medium text-white">
                        {t("questions.badge")}
                    </span>
                </div>
                <h2 className="text-3xl font-bold mb-2">
                     {t("questions.title")}
                </h2>
                <p className="text-gray-400 md:px-42">
                     {t("questions.description")}
                </p>
            </div>

            <div className="w-full max-w-4xl bg-[#151728] rounded-xl shadow-lg md:p-4 p-1 sm:p-6">
                {faqs.map((faq, index) => (
                    <div key={faq.id}>
                        <div
                            className="rounded-lg transition-all duration-300"
                        >
                            <button
                                type="button"
                                onClick={() => toggleFAQ(faq.id)}
                                className="w-full flex items-center justify-between p-4 text-left focus:outline-none transition-colors duration-200"
                            >
                                <div className="flex items-center space-x-3">
                                    <span className="bg-[#1E2133] text-white text-sm font-bold px-3 py-2 rounded">
                                        {faq.id.toString().padStart(2, "0")}
                                    </span>
                                    <span className="font-medium md:text-lg text-xs">{faq.question}</span>
                                </div>
                                {openId === faq.id ? (
                                    <FaMinus className="md:w-4 md:h-4 h-3 w-3 text-[#fff] flex-shrink-0" />
                                ) : (
                                    <FaPlus className="md:w-4 md:h-4 h-3 w-3 text-[#fff] flex-shrink-0" />
                                )}
                            </button>

                            <div
                                className={`overflow-hidden transition-all duration-300 ${openId === faq.id
                                    ? "max-h-[500px] opacity-100 md:pb-4"
                                    : "max-h-0 opacity-0"
                                    }`}
                            >
                                <div className="px-6">
                                    {Array.isArray(faq.answer) ? (
                                        <ul className="list-decimal pl-5 space-y-3 text-gray-300 md:text-sm text-xs leading-relaxed">
                                            {faq.answer.map((line, idx) => (
                                                <li key={idx} className="pl-2">{line}</li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-gray-300 text-base leading-relaxed pl-3">
                                            {faq.answer}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {index !== faqs.length - 1 && (
                            <div className="h-[1px] w-full bg-gradient-to-r from-[] via-[#B3B6C7]/40 to-transparent my-4"></div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Question;
