import DashboardBox from '@/components/DashboardBox';
import { ResponsiveContainer, AreaChart, XAxis, YAxis, Tooltip, Area, Line, CartesianGrid, Legend, LineChart, BarChart, Bar } from 'recharts';
import { useGetKpisQuery } from '../state/api';
import { useMemo } from 'react';
import { useTheme } from '@mui/material';
import BoxHeader from '@/components/BoxHeader';

const Row1 = () => {
  const theme = useTheme();
  const { data } = useGetKpisQuery();
  console.log("data:", data);

  const revenue = useMemo(() => {
    return (
      data &&
      data[0].monthlyData.map(({ month, revenue }) => {
        return {
          name: month.substring(0, 3),
          revenue: Number(revenue),
        };
      })
    );
  }, [data]);

  const revenueExpenses = useMemo(() => {
    return (
      data &&
      data[0].monthlyData.map(({ month, revenue, expenses }) => {
        return {
          name: month.substring(0, 3),
          revenue: Number(revenue), 
          expenses: Number(expenses), 
        };
      })
    );
  }, [data]);

  const revenueProfit = useMemo(() => {
    return (
      data &&
      data[0].monthlyData.map(({ month, revenue, expenses }) => {
        return {
          name: month.substring(0, 3),
          revenue: Number(revenue), 
          profit: Number(revenue) - Number(expenses), 
        };
      })
    );
  }, [data]);

  return (
    <>
      <DashboardBox sx={{ gridArea: 'a' }}>
        <BoxHeader
          title='Revenue and Expenses'
          subtitle='Top line represents revenue, bottom line represents expenses'
          sideText='+4%'
        />
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={revenueExpenses}
            margin={{
              top: 20,
              right: 25,
              left: -10,
              bottom: 60,
            }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={theme.palette.primary.main} stopOpacity={0.8} />
                <stop offset="95%" stopColor={theme.palette.secondary.main} stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={theme.palette.primary.main} stopOpacity={0.8} />
                <stop offset="95%" stopColor={theme.palette.error.main} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" tickLine={false} style={{ fontSize: "10px" }} />
            <YAxis 
              tickLine={false} 
              axisLine={false} 
              style={{ fontSize: "10px" }}
              domain={[8000, 23000]} 
            />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke={theme.palette.secondary.main}
              fillOpacity={0.8}
              fill="url(#colorRevenue)"
            />
            <Area
              type="monotone"
              dataKey="expenses"
              stroke={theme.palette.error.main}
              fillOpacity={0.8}
              fill="url(#colorExpenses)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </DashboardBox>
      <DashboardBox sx={{ gridArea: 'b' }}>
        <BoxHeader
          title='Profit and Revenue'
          subtitle='Comparison between profit and revenue'
          sideText='+4%'
        />
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={revenueProfit} 
            margin={{
              top: 20,
              right: 0,
              left: -10,
              bottom: 60,
            }}
          >
            <CartesianGrid vertical={false} stroke={theme.palette.grey[800]} />
            <XAxis dataKey="name" tickLine={false} style={{ fontSize: "10px" }} />
            <YAxis
              yAxisId="left"
              tickLine={false} 
              axisLine={false} 
              style={{ fontSize: "10px" }}
            />
            <YAxis
              yAxisId="right"
              orientation='right'
              tickLine={false} 
              axisLine={false}
              style={{ fontSize: "10px" }}
            />
            <Tooltip />
            <Legend height={20} wrapperStyle={{
              margin:"0 0 10px 0"
            }}/>
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="profit"
              stroke={theme.palette.success.main} 
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="revenue"
              stroke={theme.palette.primary.main}
            />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>
      <DashboardBox sx={{ gridArea: 'c' }}>
        <BoxHeader
          title='Revenue Month by Month'
          subtitle='Graph representing the revenue month by month'
          sideText='+4%'
        />
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={revenue} 
            margin={{
              top: 17,
              right: 15,
              left: -5,
              bottom: 58,
            }}
          >
            <defs>
              <linearGradient id="colorRevenueBlue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={theme.palette.primary.main} stopOpacity={0.8} />
                <stop offset="95%" stopColor={theme.palette.primary.light} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke={theme.palette.grey[800]}/>
            <XAxis dataKey="name"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }} />
            <YAxis 
              tickLine={false} 
              axisLine={false} 
              style={{ fontSize: "10px" }}
            />
            <Tooltip />
            <Bar dataKey="revenue" fill="url(#colorRevenueBlue)" />
          </BarChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  );
};

export default Row1;
