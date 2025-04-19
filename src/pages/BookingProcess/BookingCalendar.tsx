import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface BookingCalendarProps {
  onSelectDates: (startDate: Date | null, endDate: Date | null) => void;
}

const BookingCalendar = ({ onSelectDates }: BookingCalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  
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
  
  // Check if a date is in the past
  const isPastDate = (date: Date): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };
  
  // Check if a date is unavailable (mock implementation)
  const isUnavailableDate = (date: Date): boolean => {
    // Just a simple example - in a real app, this would check against actual unavailable dates
    return date.getDate() % 5 === 0;
  };
  
  // Handler for date click
  const handleDateClick = (date: Date) => {
    if (isPastDate(date) || isUnavailableDate(date)) return;
    
    if (!startDate || (startDate && endDate)) {
      // If no start date is selected or both dates are selected, set as new start date
      setStartDate(date);
      setEndDate(null);
      onSelectDates(date, null);
    } else {
      // If start date is earlier than the clicked date
      if (date > startDate) {
        setEndDate(date);
        onSelectDates(startDate, date);
      } else {
        // If clicked date is earlier, make it the start date
        setEndDate(startDate);
        setStartDate(date);
        onSelectDates(date, startDate);
      }
    }
  };
  
  // Handler for mouse enter on a date
  const handleDateHover = (date: Date) => {
    if (startDate && !endDate) {
      setHoverDate(date);
    }
  };
  
  // Check if a date is in the selected range
  const isInSelectedRange = (date: Date): boolean => {
    if (!startDate) return false;
    
    if (endDate) {
      return date >= startDate && date <= endDate;
    }
    
    if (hoverDate) {
      return (hoverDate > startDate && date >= startDate && date <= hoverDate) || 
             (hoverDate < startDate && date <= startDate && date >= hoverDate);
    }
    
    return date.getTime() === startDate.getTime();
  };
  
  // Generate days for the current month view
  const generateDays = () => {
    const days = [];
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();
    
    // Add days from previous month
    for (let i = firstDay - 1; i >= 0; i--) {
      const date = new Date(currentYear, currentMonth - 1, daysInPrevMonth - i);
      days.push({ date, isCurrentMonth: false });
    }
    
    // Add days from current month
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(currentYear, currentMonth, i);
      days.push({ date, isCurrentMonth: true });
    }
    
    // Add days from next month to fill the calendar
    const remainingDays = 42 - days.length; // 6 rows of 7 days
    for (let i = 1; i <= remainingDays; i++) {
      const date = new Date(currentYear, currentMonth + 1, i);
      days.push({ date, isCurrentMonth: false });
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
    <div className="calendar bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <button 
          onClick={goToPreviousMonth}
          className="p-1 hover:bg-gray-100 rounded"
        >
          <ChevronLeft size={20} />
        </button>
        <h3 className="font-medium">{monthNames[currentMonth]} {currentYear}</h3>
        <button 
          onClick={goToNextMonth}
          className="p-1 hover:bg-gray-100 rounded"
        >
          <ChevronRight size={20} />
        </button>
      </div>
      
      <div className="p-4">
        <div className="grid grid-cols-7 gap-1 text-center mb-2">
          {dayNames.map(day => (
            <div key={day} className="text-xs font-medium text-gray-500">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-1">
          {days.map(({ date, isCurrentMonth }, index) => {
            const isStart = startDate && date.getTime() === startDate.getTime();
            const isEnd = endDate && date.getTime() === endDate.getTime();
            const isSelected = isInSelectedRange(date);
            const isPast = isPastDate(date);
            const isUnavailable = isUnavailableDate(date);
            
            return (
              <button
                key={index}
                disabled={isPast || isUnavailable || !isCurrentMonth}
                onClick={() => handleDateClick(date)}
                onMouseEnter={() => handleDateHover(date)}
                className={`
                  relative h-10 flex items-center justify-center font-medium text-sm rounded
                  ${!isCurrentMonth ? 'text-gray-300' : isPast || isUnavailable ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-purple-50 cursor-pointer'}
                  ${isSelected && isCurrentMonth ? 'bg-purple-50' : ''}
                  ${(isStart || isEnd) && isCurrentMonth ? 'bg-purple-600 text-white hover:bg-purple-700' : ''}
                `}
              >
                {date.getDate()}
              </button>
            );
          })}
        </div>
        
        <div className="mt-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-purple-600 rounded-full mr-2"></div>
              <span>Selected</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-100 rounded-full mr-2"></div>
              <span>Unavailable</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 p-4 border-t border-gray-200">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Start Date:</span>
            <span className="font-medium">
              {startDate ? startDate.toLocaleDateString() : 'Not selected'}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">End Date:</span>
            <span className="font-medium">
              {endDate ? endDate.toLocaleDateString() : 'Not selected'}
            </span>
          </div>
          {startDate && endDate && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Duration:</span>
              <span className="font-medium">
                {Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))} days
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingCalendar;