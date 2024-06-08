"use client"
import Image from 'next/image';

export default function AboutCard({ contact }) {
  const { name, photo } = contact;

  return (
    <section
      className="flex flex-col w-60 h-80 items-stretch rounded-lg
      justify-between shadow-xl mb-8"
    >
      <div
        className="flex flex-col rounded-t-lg"
      >
        <div className="flex w-full h-64 rounded-md">
          <Image
            className="object-cover rounded-t-md"
            width={ 240 }
            height={ 240}
            src={ photo }
            alt={ name }
          />
        </div>
      </div>
      <div
        className="text-center m-auto rounded-b-lg w-full border-black
        drop-shadow-xl"
      >
        <p
          className="font-bold"
        >
          { name }
        </p>
      </div>
    </section>
  );
}
