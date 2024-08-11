import React from 'react';
import Tk from '../../../src/utils/images/Tk.jpg';
import sujal from '../../../src/utils/images/sujal.png';
import anupam from '../../../src/utils/images/anupam.jpg';
import apoorv from '../../../src/utils/images/apoorv.jpg'

export default function About() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">About Us</h1>
      <div className="text-center text-xl mb-8">
        <h2 className="text-2xl font-bold mb-4">Meet the Team</h2>
        <p>
          This application is created by Anupam Mittal, Sujal Singh, Tushar Khandelwal, and Apoorv Yash.
          We are currently in our 3rd year of pursuing a B.Tech degree in Information Technology at NIT Jalandhar.
        </p>
      </div>

      <div className=" mt-6 flex flex-wrap justify-center gap-16">
        <TeamMember name="Anupam Mittal" imgSrc={anupam} />
        <TeamMember name="Sujal Singh" imgSrc={sujal} />
        <TeamMember name="Tushar Khandelwal" imgSrc={Tk} />
        <TeamMember name="Apoorv Yash" imgSrc={apoorv} />
      </div>

      
    </div>
  );
}

function TeamMember({ name, imgSrc }) {
  return (
    <div className="text-center">
      <img
        src={imgSrc}
        alt={name}
        className="rounded-full h-40 w-40 object-cover mx-auto mb-2"
      />
      <div className="text-lg font-bold">{name}</div>
    </div>
  );
}
