
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Lock, EyeOff, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import ImageViewer from './ImageViewer';

interface ImageCardProps {
  image: {
    id: number;
    title: string;
    imageUrl: string;
    isPremium: boolean;
    price: number;
  };
}

const ImageCard = ({ image }: ImageCardProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [viewerOpen, setViewerOpen] = useState(false);

  const handleImageClick = () => {
    if (!image.isPremium) {
      setViewerOpen(true);
    }
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!image.isPremium) {
      // Create a temporary anchor element to download the image
      const link = document.createElement('a');
      link.href = image.imageUrl;
      link.download = `${image.title.replace(/\s+/g, '-').toLowerCase()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      console.log(`Downloading: ${image.title}`);
    }
  };

  const handlePreview = (e: React.MouseEvent) => {
    e.stopPropagation();
    setViewerOpen(true);
  };

  return (
    <>
      <motion.div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all bg-white dark:bg-gray-800 cursor-pointer"
        onClick={handleImageClick}
      >
        <div 
          className={cn(
            "relative w-full aspect-[4/3] overflow-hidden",
            isLoading ? "bg-gray-200 dark:bg-gray-700 animate-pulse" : ""
          )}
        >
          {/* Blur overlay for premium images */}
          {image.isPremium && (
            <div className={cn(
              "absolute inset-0 backdrop-blur-sm bg-black/30 z-10 flex flex-col items-center justify-center p-4 text-white transition-opacity",
              isHovered ? "opacity-100" : "opacity-0"
            )}>
              <Lock className="w-12 h-12 mb-2" />
              <p className="text-center font-semibold">Premium Content</p>
              <p className="text-sm opacity-80 mb-4">Purchase to unlock this image</p>
              <button 
                className="mt-2 px-4 py-2 rounded-full bg-cricket-red text-white text-sm font-medium hover:bg-cricket-red/90 transition-colors"
              >
                ${image.price.toFixed(2)} - Unlock
              </button>
            </div>
          )}

          <img
            src={image.imageUrl}
            alt={image.title}
            className={cn(
              "w-full h-full object-cover transition-transform duration-500 ease-out",
              isHovered && !image.isPremium ? "scale-110" : "",
              image.isPremium ? "blur-sm" : ""
            )}
            onLoad={() => setIsLoading(false)}
          />

          {/* Premium badge */}
          {image.isPremium && (
            <div className="absolute top-2 right-2 bg-cricket-yellow text-gray-900 text-xs font-bold px-2 py-1 rounded-full z-20 flex items-center">
              <Lock className="w-3 h-3 mr-1" />
              PREMIUM
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="font-medium text-lg text-gray-900 dark:text-white">{image.title}</h3>
          
          <div className="mt-2 flex justify-between items-center">
            {image.isPremium ? (
              <span className="text-cricket-red font-semibold">${image.price.toFixed(2)}</span>
            ) : (
              <span className="text-green-600 dark:text-green-400 font-semibold">Free</span>
            )}
            
            <button 
              className={cn(
                "px-3 py-1 rounded-full text-sm font-medium transition-colors flex items-center gap-1",
                image.isPremium 
                  ? "bg-cricket-red/10 text-cricket-red hover:bg-cricket-red/20" 
                  : "bg-green-50 text-green-600 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50"
              )}
              onClick={image.isPremium ? handlePreview : handleDownload}
            >
              {image.isPremium ? (
                <>Preview</>
              ) : (
                <>Download <Download size={14} /></>
              )}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Image Viewer Modal */}
      <ImageViewer 
        imageUrl={image.imageUrl} 
        title={image.title} 
        isOpen={viewerOpen} 
        onClose={() => setViewerOpen(false)} 
      />
    </>
  );
};

export default ImageCard;
