import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Day {
  date: number;
  available: boolean;
  isCurrentMonth: boolean;
}

// This is a simplified calendar component for demonstration purposes
const AvailabilityCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  
  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };
  
  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };
  
  // Generate days for the current month view
  const generateDays = (): Day[] => {
    const days: Day[] = [];
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();
    
    // Add days from previous month
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        date: daysInPrevMonth - i,
        available: false,
        isCurrentMonth: false
      });
    }
    
    // Add days from current month
    for (let i = 1; i <= daysInMonth; i++) {
      // Just some mock availability logic
      const available = !(i % 4 === 0 || i % 7 === 0);
      
      days.push({
        date: i,
        available,
        isCurrentMonth: true
      });
    }
    
    // Add days from next month to fill the calendar
    const remainingDays = 42 - days.length; // 6 rows of 7 days
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: i,
        available: false,
        isCurrentMonth: false
      });
    }
    
    return days;
  };
  
  const days = generateDays();
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  
  return (
    <div className="calendar">
      <div className="flex items-center justify-between mb-4">
        <button 
          onClick={goToPreviousMonth}
          className="p-1 hover:bg-gray-200 rounded"
        >
          <ChevronLeft size={20} />
        </button>
        <h3 className="font-medium">{monthNames[currentMonth]} {currentYear}</h3>
        <button 
          onClick={goToNextMonth}
          className="p-1 hover:bg-gray-200 rounded"
        >
          <ChevronRight size={20} />
        </button>
      </div>
      
      <div className="grid grid-cols-7 gap-1 text-center mb-1">
        {dayNames.map(day => (
          <div key={day} className="text-xs font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => (
          <button
            key={index}
            disabled={!day.available}
            className={`
              aspect-square flex items-center justify-center text-sm rounded-full
              ${day.isCurrentMonth 
                ? day.available 
                  ? 'hover:bg-purple-100 text-gray-800' 
                  : 'bg-red-50 text-red-300 cursor-not-allowed'
                : 'text-gray-300 cursor-default'
              }
            `}
          >
            {day.date}
          </button>
        ))}
      </div>
      
      <div className="mt-4 flex items-center text-sm">
        <div className="flex items-center mr-4">
          <div className="w-3 h-3 bg-red-50 rounded-full mr-1"></div>
          <span className="text-gray-500">Unavailable</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-white border border-gray-300 rounded-full mr-1"></div>
          <span className="text-gray-500">Available</span>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityCalendar;