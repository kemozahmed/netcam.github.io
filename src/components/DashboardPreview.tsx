import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useLanguage } from '@/contexts/LanguageContext';

const data = [
  { month: 'Jan', efficiency: 65, energy: 100 },
  { month: 'Feb', efficiency: 68, energy: 95 },
  { month: 'Mar', efficiency: 75, energy: 85 },
  { month: 'Apr', efficiency: 82, energy: 75 },
  { month: 'May', efficiency: 88, energy: 65 },
  { month: 'Jun', efficiency: 95, energy: 55 },
];

const DashboardPreview = () => {
  const { lang } = useLanguage();

  return (
    <div className="w-full h-[300px] bg-card border border-border rounded-xl p-4 md:p-6 shadow-lg relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -ml-16 -mb-16" />

      <div className="mb-6 relative z-10">
        <h3 className="text-lg font-display font-semibold text-foreground">
          {lang === 'ar' ? 'مؤشرات الأداء بعد الأتمتة' : 'Performance Metrics Post-Automation'}
        </h3>
        <p className="text-sm text-muted-foreground">
          {lang === 'ar' ? 'الكفاءة مقابل استهلاك الطاقة' : 'Efficiency vs Energy Consumption'}
        </p>
      </div>

      <div className="w-full h-[200px] relative z-10">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff1a" vertical={false} />
            <XAxis
              dataKey="month"
              stroke="#ffffff80"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#ffffff80"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0F172A',
                border: '1px solid #1e293b',
                borderRadius: '8px',
                color: '#f8fafc'
              }}
            />
            <Line
              type="monotone"
              dataKey="efficiency"
              name={lang === 'ar' ? 'الكفاءة' : 'Efficiency'}
              stroke="#F97316"
              strokeWidth={3}
              dot={{ fill: '#F97316', strokeWidth: 2 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="energy"
              name={lang === 'ar' ? 'استهلاك الطاقة' : 'Energy Usage'}
              stroke="#94a3b8"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardPreview;
