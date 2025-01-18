import { useEffect, useRef } from 'react';
import CalHeatmap from 'cal-heatmap';
import 'cal-heatmap/cal-heatmap.css';

export default function History() {
  const calendarRef = useRef(null);
  const cal = useRef(null);

  useEffect(() => {
    const initCalendar = async () => {
      if (!cal.current) {
        const subjects = JSON.parse(localStorage.getItem('subjects') || '[]');
        const taskData = new Map();
        
        subjects.forEach(subject => {
          subject.tasks.forEach(task => {
            if (task.completed && task.completedAt) {
              const date = new Date(task.completedAt);
              const timestamp = date.setHours(0, 0, 0, 0) / 1000;
              taskData.set(timestamp, (taskData.get(timestamp) || 0) + 1);
            }
          });
        });

        const data = Array.from(taskData, ([timestamp, value]) => ({
          date: timestamp,
          value
        }));

        cal.current = new CalHeatmap();
        
        await cal.current.paint({
          itemSelector: calendarRef.current,
          range: 12,
          domain: {
            type: 'month',
            gutter: 10,
            label: { text: 'MMM', textAlign: 'start', position: 'top' }
          },
          subDomain: {
            type: 'day',
            width: 10,
            height: 10,
            radius: 2
          },
          data: {
            source: data,
            type: 'json',
            x: 'date',
            y: 'value'
          },
          scale: {
            color: {
              type: 'threshold',
              range: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
              domain: [0, 2, 5, 10]
            }
          },
          date: {
            start: new Date(new Date().getFullYear(), 0, 1),
            highlight: new Date()
          },
          theme: 'light',
          tooltip: {
            text: (date, value, dayjsDate) => 
              value ? `${value} tasks on ${dayjsDate.format('MMM D, YYYY')}` : 'No tasks'
          }
        });
      }
    };

    initCalendar().catch(console.error);

    return () => {
      if (cal.current) {
        cal.current.destroy();
        cal.current = null;
      }
    };
  }, []);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-neutral-800 mb-6">Task History</h1>
        <div className="space-y-6">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-neutral-700 mb-4">
              Task Completion Heatmap
            </h2>
            <div ref={calendarRef} className="cal-heatmap" />
          </div>
          
          <div className="flex items-center justify-center gap-2 text-sm text-neutral-600">
            <span>Less</span>
            <div className="flex gap-1">
              <div className="w-3 h-3 bg-[#ebedf0] border border-neutral-200"></div>
              <div className="w-3 h-3 bg-[#9be9a8]"></div>
              <div className="w-3 h-3 bg-[#40c463]"></div>
              <div className="w-3 h-3 bg-[#30a14e]"></div>
              <div className="w-3 h-3 bg-[#216e39]"></div>
            </div>
            <span>More</span>
          </div>
        </div>
      </div>
    </div>
  );
} 