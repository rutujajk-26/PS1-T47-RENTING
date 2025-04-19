import { useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize } from 'lucide-react';

interface ImageGalleryProps {
  images: string[];
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFullscreen, setShowFullscreen] = useState(false);
  
  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };
  
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };
  
  const selectThumbnail = (index: number) => {
    setCurrentIndex(index);
  };
  
  return (
    <div className="relative">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="relative aspect-w-16 aspect-h-9 h-[400px]">
          <img 
            src={images[currentIndex]} 
            alt={`Item image ${currentIndex + 1}`} 
            className="w-full h-full object-cover" 
          />
          
          <button 
            className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white bg-opacity-80 rounded-full shadow-sm hover:bg-opacity-100"
            onClick={goToPrevious}
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white bg-opacity-80 rounded-full shadow-sm hover:bg-opacity-100"
            onClick={goToNext}
          >
            <ChevronRight size={20} />
          </button>
          
          <button 
            className="absolute top-4 right-4 p-2 bg-white bg-opacity-80 rounded-full shadow-sm hover:bg-opacity-100"
            onClick={() => setShowFullscreen(true)}
          >
            <Maximize size={20} />
          </button>
        </div>
        
        <div className="flex p-2 overflow-x-auto">
          {images.map((image, index) => (
            <button 
              key={index}
              className={`flex-shrink-0 w-20 h-20 m-1 rounded overflow-hidden border-2 ${
                index === currentIndex ? 'border-purple-500' : 'border-transparent'
              }`}
              onClick={() => selectThumbnail(index)}
            >
              <img 
                src={image} 
                alt={`Thumbnail ${index + 1}`} 
                className="w-full h-full object-cover" 
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;