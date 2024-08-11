// src/AccordionItem.js
import React from 'react';
import { FiChevronDown, FiChevronRight } from 'react-icons/fi';

const AccordionItem = ({ faq, isActive, onToggle }) => {
  const { question, answer } = faq;

  return (
    <div className="border-b-2 border-[#8abded] py-1 sm:py-3">
      <div
        className="flex flex-row justify-between gap-x-4 cursor-pointer"
        onClick={onToggle}
      >
        <div className={`font-bold lg:text-xl md:text-base sm:text-sm text-${isActive ? '[#006D6C]' : '[#262626]'}`}>
          {question}
        </div>
        <div>
          {isActive ? <FiChevronDown className='h-4 w-4 sm:h-8 sm:w-8 md:h-10 md:w-10 lg:h-12 lg:w-12' /> : <FiChevronRight className='h-4 w-4 sm:h-8 sm:w-8 md:h-10 md:w-10 lg:h-12 lg:w-12' />}
        </div>
      </div>
      {isActive && (
        <div className="text-[#006D6C] pt-5 lg:text-xl md:text-base sm:text-sm">
          {answer}
        </div>
      )}
    </div>
  );
};

export default AccordionItem;
