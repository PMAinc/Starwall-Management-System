import React from 'react';
import ReactCalendar from 'react-calendar';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import 'react-calendar/dist/Calendar.css';
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
  const [value, setValue] = React.useState(new Date());
  
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
  
  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view !== 'month') return null;
    
    const dateStr = format(date, 'yyyy-MM-dd');
    const dayEvents = eventsByDate[dateStr] || [];
    
    if (dayEvents.length === 0) return null;
    
    return (
      <div className="text-xs mt-1">
        {dayEvents.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {dayEvents.slice(0, 2).map((event) => (
              <div 
                key={event.id}
                className={clsx(
                  "h-1.5 w-1.5 rounded-full", 
                  event.type === 'production' && "bg-blue-500",
                  event.type === 'installation' && "bg-green-500",
                  event.type === 'meeting' && "bg-purple-500"
                )}
              />
            ))}
            {dayEvents.length > 2 && (
              <div className="text-[10px] text-gray-500">+{dayEvents.length - 2}</div>
            )}
          </div>
        )}
      </div>
    );
  };

  const eventsForSelectedDate = React.useMemo(() => {
    const dateStr = format(value, 'yyyy-MM-dd');
    return eventsByDate[dateStr] || [];
  }, [eventsByDate, value]);

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h2 className="text-lg font-semibold mb-4">Planning de production</h2>
      <div className="calendar-container">
        <style jsx>{`
          :global(.react-calendar) {
            width: 100%;
            border: none;
            font-family: inherit;
          }
          :global(.react-calendar__tile--active) {
            background: #3b82f6;
            color: white;
          }
          :global(.react-calendar__tile--active:enabled:hover) {
            background: #2563eb;
          }
          :global(.react-calendar__tile--now) {
            background: #dbeafe;
          }
          :global(.react-calendar__tile) {
            padding: 8px;
          }
        `}</style>
        <ReactCalendar
          onChange={setValue}
          value={value}
          locale={fr}
          tileContent={tileContent}
        />
      </div>
      
      {eventsForSelectedDate.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-medium mb-2">
            Événements du {format(value, 'dd MMMM yyyy', { locale: fr })}
          </h3>
          <ul className="space-y-2">
            {eventsForSelectedDate.map((event) => (
              <li key={event.id} className="text-sm flex items-center">
                <span 
                  className={clsx(
                    "w-2 h-2 rounded-full mr-2", 
                    event.type === 'production' && "bg-blue-500",
                    event.type === 'installation' && "bg-green-500",
                    event.type === 'meeting' && "bg-purple-500"
                  )}
                />
                {event.title}
              </li>
            ))}
          </ul>
        </div>
      )}
      
      <div className="mt-4 flex gap-4 text-xs">
        <div className="flex items-center">
          <div className="w-2 h-2 rounded-full bg-blue-500 mr-1"></div>
          <span>Production</span>
        </div>
        <div className="flex items-center">
          <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
          <span>Installation</span>
        </div>
        <div className="flex items-center">
          <div className="w-2 h-2 rounded-full bg-purple-500 mr-1"></div>
          <span>Réunion</span>
        </div>
      </div>
    </div>
  );
};

export default Calendar;