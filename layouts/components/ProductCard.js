"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '../../sanity.js';

const ProductCard = ({ product }) => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 m-4">
      {/* here the image shows using the old  */
      }
      <Image
        src={urlFor(product.images[0]).url()}
        alt={product.title}
        width={100}
        height={50}
        className="w-full h-48 object-cover rounded-t-lg" />
      <h2 className="text-xl font-semibold mt-4">{product.title}</h2>
      <button
        onClick={togglePopup}
        className="mt-4 bg-lime-700 text-white py-2 px-4 rounded-full hover:bg-lime-800"
      >
        Voir en detail
      </button>

      {showPopup && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 w-full">
          <div className="bg-white rounded-lg p-8 container">
            <button
              onClick={togglePopup}
              className="absolute top-3 right-3 bg-slate-500 text-white py-1 px-2 rounded-full hover:bg-slate-900"
            >
              X
            </button>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              
              {product.images.map((image) => (

                <Image
                  key={image._key}
                  src={urlFor(image.asset).url()}
                  alt={product.title}
                  width={100}
                  height={50}
                  className='w-full h-48 object-cover rounded-t-lg'
                />

              ))}

            </div>


            <h2 className="text-xl font-semibold mt-4">{product.title}</h2>
            <p className="mt-4">{product.description}</p>
            <p className="mt-4 text-lg font-semibold">Pour plus d'informations</p><br></br>

            <Link className="btn btn-primary z-0 py-[14px]" href="/contact" rel="">
              Contactez-nous
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
