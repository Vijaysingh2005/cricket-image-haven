
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ImageCard from './ImageCard';

// Sample cricket images
const sampleImages = [
  {
    id: 1,
    title: 'Final Match Celebration',
    imageUrl: 'https://images.pexels.com/photos/3628912/pexels-photo-3628912.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    isPremium: true,
    price: 5.99,
  },
  {
    id: 2,
    title: 'Perfect Batting Stance',
    imageUrl: 'https://images.pexels.com/photos/3659610/pexels-photo-3659610.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    isPremium: true,
    price: 4.99,
  },
  {
    id: 3,
    title: 'Stadium Aerial View',
    imageUrl: 'https://images.pexels.com/photos/2570139/pexels-photo-2570139.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    isPremium: false,
    price: 0,
  },
  {
    id: 4,
    title: 'Player Close-up',
    imageUrl: 'https://images.pexels.com/photos/2385477/pexels-photo-2385477.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    isPremium: true,
    price: 6.99,
  },
  {
    id: 5,
    title: 'Team Huddle',
    imageUrl: 'https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    isPremium: true,
    price: 7.99,
  },
  {
    id: 6,
    title: 'Critical Moment',
    imageUrl: 'https://images.pexels.com/photos/3621102/pexels-photo-3621102.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    isPremium: false,
    price: 0,
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { 
    y: 0, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 50
    }
  }
};

const FeaturedImages = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setImages(sampleImages);
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Featured Images
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Explore our collection of high-resolution cricket images from memorable matches and iconic players
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div 
                key={i} 
                className="bg-gray-100 dark:bg-gray-800 rounded-2xl h-80 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {images.map((image) => (
              <motion.div key={image.id} variants={item}>
                <ImageCard image={image} />
              </motion.div>
            ))}
          </motion.div>
        )}
        
        <div className="mt-16 text-center">
          <a 
            href="/explore" 
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-cricket-red hover:bg-cricket-red/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cricket-red transition-colors"
          >
            View All Images
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedImages;
