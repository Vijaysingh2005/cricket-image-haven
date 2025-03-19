import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ImageCard from './ImageCard';

// Updated cricket images featuring Indian cricketers in 4K quality
const sampleImages = [
  {
    id: 1,
    title: 'Virat Kohli Century Celebration',
    imageUrl: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=2067&auto=format&fit=crop',
    isPremium: true,
    price: 7.99,
  },
  {
    id: 2,
    title: 'Rohit Sharma Cover Drive',
    imageUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=2073&auto=format&fit=crop',
    isPremium: true,
    price: 6.99,
  },
  {
    id: 3,
    title: 'Jasprit Bumrah Bowling Action',
    imageUrl: 'https://images.unsplash.com/photo-1562077772-3bd8c3dfa4ac?q=80&w=1864&auto=format&fit=crop',
    isPremium: false,
    price: 0,
  },
  {
    id: 4,
    title: 'MS Dhoni Helicopter Shot',
    imageUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=1924&auto=format&fit=crop',
    isPremium: true,
    price: 8.99,
  },
  {
    id: 5,
    title: 'Indian Team Victory Celebration',
    imageUrl: 'https://images.unsplash.com/photo-1580397581145-cdb6a35b7d3f?q=80&w=2070&auto=format&fit=crop',
    isPremium: true,
    price: 9.99,
  },
  {
    id: 6,
    title: 'Ravindra Jadeja Fielding',
    imageUrl: 'https://images.unsplash.com/photo-1590156329625-4d017fa96bc6?q=80&w=1949&auto=format&fit=crop',
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
