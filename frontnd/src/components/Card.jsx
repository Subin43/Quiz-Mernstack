import React from 'react'

export default function Card({title,image,description,onClick}) {

  return (
    <div className='max-w-sm rounded overflow-hidden shadow-lg p-4 m-16 bg-gray-200'>
      <div className='px-6 py-4 hover:bg-gray-300 transition duration-300 ease-in-out'>
        <img className="w-full" src={image} alt={title} />
        <h2 className='bold text-3xl mb-2'>{title}</h2>
        <p className='text-gray-700 text-base'>{description}</p>
      </div>
      {/* Center align the button */}
      <div className="flex justify-center">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={onClick}>
          Play now
        </button>
      </div>
    </div>
  )
}
