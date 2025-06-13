import React from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday, isSameMonth, addMonths, subMonths } from 'date-fns';
import { fr } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import clsx from 'clsx';

interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  type: 'production' | 'installation' | 'meeting';
}

interface ProductionCalendarProps {
  events: CalendarEvent[];
}

const Calendar: React.FC<ProductionCalendarProps> = ({ events }) => {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  
  // Group events by date
  const eventsByDate = React.useMemo(() => {
    const grouped: Record<string, CalendarEvent[]> = {};
    
    events.forEach(event => {
      const dateStr = format(new Date(event.date), 'yyyy-MM-dd');
      if (!grouped[dateStr]) {
        grouped[dateStr] = [];
      }
      grouped[dateStr].push(event);
    });
    
    return grouped;
  }, [events]);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const eventsForSelectedDate = React.useMemo(() => {
    const dateStr = format(selectedDate, 'yyyy-MM-dd');
    return eventsByDate[dateStr] || [];
  }, [eventsByDate, selectedDate]);

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => direction === 'prev' ? subMonths(prev, 1) : addMonths(prev, 1));
  };

  const getDayEvents = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return eventsByDate[dateStr] || [];
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'production':
        return 'bg-blue-500';
      case 'installation':
        return 'bg-green-500';
      case 'meeting':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <CalendarIcon size={24} className="text-white" />
            <h2 className="text-xl font-semibold text-white">Planning de production</h2>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => navigateMonth('prev')}
              className="p-2 rounded-lg bg-blue-500 hover:bg-blue-400 text-white transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="px-4 py-2 bg-blue-500 rounded-lg text-white font-medium min-w-[140px] text-center">
              {format(currentDate, 'MMMM yyyy', { locale: fr })}
            </div>
            <button
              onClick={() => navigateMonth('next')}
              className="p-2 rounded-lg bg-blue-500 hover:bg-blue-400 text-white transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Calendar Grid */}
        <div className="mb-6">
          {/* Day headers */}
          <div className="grid grid-cols-7 gap-2 mb-4">
            {['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'].map((day) => (
              <div key={day} className="calendar-day-header">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar days */}
          <div className="grid grid-cols-7 gap-2">
            {calendarDays.map((date) => {
              const dayEvents = getDayEvents(date);
              const isSelected = isSameDay(date, selectedDate);
              const isTodayDate = isToday(date);
              const isCurrentMonth = isSameMonth(date, currentDate);

              return (
                <button
                  key={date.toISOString()}
                  onClick={() => setSelectedDate(date)}
                  className={clsx(
                    'calendar-day h-16 relative',
                    isSelected && 'calendar-day-current',
                    isTodayDate && !isSelected && 'calendar-day-today',
                    !isCurrentMonth && 'calendar-day-other-month',
                    isCurrentMonth && !isSelected && !isTodayDate && 'calendar-day-default'
                  )}
                >
                  <span className="text-sm font-medium">
                    {format(date, 'd')}
                  </span>
                  
                  {/* Event indicators */}
                  {dayEvents.length > 0 && (
                    <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex gap-1">
                      {dayEvents.slice(0, 3).map((event, index) => (
                        <div
                          key={`${event.id}-${index}`}
                          className={clsx(
                            'w-1.5 h-1.5 rounded-full',
                            getEventTypeColor(event.type)
                          )}
                        />
                      ))}
                      {dayEvents.length > 3 && (
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected date events */}
        {eventsForSelectedDate.length > 0 && (
          <div className="border-t border-gray-700 pt-6">
            <h3 className="text-lg font-medium text-gray-200 mb-4 flex items-center">
              <CalendarIcon size={18} className="mr-2" />
              Événements du {format(selectedDate, 'dd MMMM yyyy', { locale: fr })}
            </h3>
            <div className="space-y-3">
              {eventsForSelectedDate.map((event) => (
                <div key={event.id} className="event-item">
                  <div className={clsx('event-type-dot', `event-${event.type}`)} />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-200">{event.title}</div>
                    <div className="text-xs text-gray-400 capitalize">{event.type}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Legend */}
        <div className="border-t border-gray-700 pt-6 mt-6">
          <div className="flex flex-wrap gap-6 text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
              <span className="text-gray-300">Production</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <span className="text-gray-300">Installation</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
              <span className="text-gray-300">Réunion</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;