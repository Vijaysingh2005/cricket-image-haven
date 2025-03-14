
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ImageCard from '@/components/ImageCard';
import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';
import { Search, Filter, ArrowUpDown, CheckCircle } from 'lucide-react';

// Sample images data
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
  },
  {
    id: 7,
    title: 'Trophy Ceremony',
    imageUrl: 'https://images.pexels.com/photos/4404931/pexels-photo-4404931.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    isPremium: true,
    price: 8.99,
  },
  {
    id: 8,
    title: 'Stadium Lights',
    imageUrl: 'https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    isPremium: true,
    price: 5.99,
  },
  {
    id: 9,
    title: 'Cricket Ball Close-up',
    imageUrl: 'https://images.pexels.com/photos/4498243/pexels-photo-4498243.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    isPremium: false,
    price: 0,
  },
];

// Categories
const categories = [
  "All Images",
  "Match Highlights",
  "Player Portraits",
  "Stadium Views",
  "Team Celebrations",
  "Vintage Classics",
];

const ExplorePage = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All Images");
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter states
  const [filters, setFilters] = useState({
    onlyFree: false,
    onlyPremium: false,
    priceRange: [0, 10],
  });

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setImages(sampleImages);
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchTerm);
    // In a real app, you would filter images based on the search term
  };

  // Handle filter change
  const handleFilterChange = (filterKey, value) => {
    setFilters({
      ...filters,
      [filterKey]: value,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header with search */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Explore Cricket Images</h1>
            
            <form onSubmit={handleSearch} className="flex items-center w-full md:w-auto">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search images..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full rounded-l-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-cricket-red"
                />
              </div>
              <button 
                type="submit"
                className="bg-cricket-red text-white px-4 py-2 rounded-r-xl hover:bg-cricket-red/90 transition-colors"
              >
                Search
              </button>
            </form>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors md:ml-2"
            >
              <Filter size={18} />
              Filters
            </button>
          </div>
          
          {/* Categories */}
          <div className="mt-6 flex overflow-x-auto pb-2 hide-scrollbar">
            <div className="flex space-x-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === category
                      ? 'bg-cricket-red text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          {/* Filters */}
          {showFilters && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-xl"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Price</p>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleFilterChange('onlyFree', !filters.onlyFree)}
                      className={`flex items-center px-3 py-1.5 rounded-lg text-sm ${
                        filters.onlyFree 
                          ? 'bg-cricket-red/10 text-cricket-red' 
                          : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {filters.onlyFree && <CheckCircle size={14} className="mr-1" />}
                      Free Only
                    </button>
                    <button
                      onClick={() => handleFilterChange('onlyPremium', !filters.onlyPremium)}
                      className={`flex items-center px-3 py-1.5 rounded-lg text-sm ${
                        filters.onlyPremium 
                          ? 'bg-cricket-yellow/20 text-cricket-yellow' 
                          : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {filters.onlyPremium && <CheckCircle size={14} className="mr-1" />}
                      Premium Only
                    </button>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Sort By</p>
                  <select 
                    className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600"
                  >
                    <option>Most Recent</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Popularity</option>
                  </select>
                </div>
                
                <div>
                  <p className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Resolution</p>
                  <select 
                    className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600"
                  >
                    <option>All Resolutions</option>
                    <option>HD (1080p)</option>
                    <option>4K</option>
                    <option>8K</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-4 flex justify-between">
                <button className="text-sm text-cricket-red">Reset Filters</button>
                <button className="bg-cricket-red text-white px-4 py-1.5 rounded-lg text-sm">Apply Filters</button>
              </div>
            </motion.div>
          )}
        </div>
      </header>
      
      {/* Images grid */}
      <main className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-gray-100 dark:bg-gray-800 rounded-2xl h-64 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600 dark:text-gray-400">
                Showing <span className="font-medium">{images.length}</span> images
              </p>
              <div className="flex items-center">
                <button className="flex items-center gap-1 text-sm text-gray-700 dark:text-gray-300">
                  <ArrowUpDown size={14} />
                  Sort
                </button>
              </div>
            </div>
            
            <motion.div 
              initial="hidden"
              animate="show"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {images.map((image) => (
                <motion.div
                  key={image.id}
                  variants={{
                    hidden: { y: 20, opacity: 0 },
                    show: { y: 0, opacity: 1 }
                  }}
                >
                  <ImageCard image={image} />
                </motion.div>
              ))}
            </motion.div>
            
            <div className="mt-12 flex justify-center">
              <button className="px-6 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                Load More
              </button>
            </div>
          </>
        )}
      </main>
      
      <Footer />
      <Navigation />
    </div>
  );
};

export default ExplorePage;
