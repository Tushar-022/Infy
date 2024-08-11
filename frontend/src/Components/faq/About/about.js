// src/About/about.js
import React, { useState } from 'react';
import AccordionItem from '../AccordionItem'; // Corrected path to AccordionItem
import data from '../data/db.json'; // Corrected path to db.json

export default function About() {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="grid grid-cols-5 bg-white">
      {/* Left side */}
      <div className="p-8 col-span-1">
        <div className="capitalize font-bold  text-xs lg:text-3xl md:text-2xl sm:text-xl text-black ">
          Frequently asked questions
        </div>
      </div>

      {/* Right side */}
      <div className=" text-xs p-8 col-span-4 lg-text-sm md-text-base">
        <div className="grid grid-cols-1 gap-4 text-black">
          {data.faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              faq={faq}
              isActive={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
