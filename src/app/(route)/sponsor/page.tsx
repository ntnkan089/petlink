import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import a00 from '@/app/(route)/assets/toy_a.bmp';
import a01 from '@/app/(route)/assets/bed_z.bmp';
import a03 from '@/app/(route)/assets/foo.bmp';

const sponsors = [
  {
    id: 1,
    imageUrl: a03,
    productUrl: 'https://www.amazon.com/Hills-Science-Diet-Chicken-Barley/dp/B07L5FF4W3',
    altText: 'Pet Food',
    productName: 'Premium Dog Food 15lb',
  },
  {
    id: 8,
    imageUrl: a01,
    productUrl: 'https://www.amazon.com/MidWest-Homes-Pets-Cinnamon-40218-CN/dp/B000TZ73EW',
    altText: 'Pet Bed',
    productName: 'Easy Maintenance Pet Bed',
  },
  {
    id: 3,
    imageUrl: a00,
    productUrl: 'https://www.amazon.com/Best-Pet-Supplies-Stuffing-Squeaker/dp/B09BBM5CX8',
    altText: 'Pet Toy',
    productName: 'Interactive pet Toy',
  },
];

const SponsorPage = () => {
  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-8">Become Our Sponsor</h1>
      <p className="text-center mb-6 text-lg">
        Partner with us by sponsoring your products. Check out some of our featured products below!
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sponsors.map((sponsor) => (
          <div key={sponsor.id} className="bg-white p-4 shadow-md rounded-lg hover:shadow-lg flex flex-col items-center">
            <Link href={sponsor.productUrl} target="_blank" rel="noopener noreferrer">
              <Image
                src={sponsor.imageUrl}
                alt={sponsor.altText}
                width={300}
                height={200}
                className="w-72 h-48 object-cover rounded-lg mb-4"
              />
            </Link>
            <p className="mt-2 text-center font-semibold text-gray-700 truncate w-full">
              {sponsor.productName}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SponsorPage;
