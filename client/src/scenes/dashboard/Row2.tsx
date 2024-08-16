import DashboardBox from '@/components/DashboardBox';
import { useGetKpisQuery, useGetProductsQuery } from '../state/api'; // Added useGetKpisQuery import
import { ResponsiveContainer, LineChart, XAxis, YAxis, Tooltip, CartesianGrid, Line, PieChart, Pie, Cell, ScatterChart, Scatter, ZAxis } from 'recharts';
import BoxHeader from '@/components/BoxHeader';
import { Typography, useTheme } from '@mui/material';
import { useMemo } from 'react';
import FlexBetween from '@/components/FlexBetween';
import { Box } from '@mui/system';


const pieData = [
  { name: "Group A", value: 600 },
  { name: "Group B", value: 400 },
]

const Row2 = () => {
  const theme = useTheme();
  const pieColor = [theme.palette.primary[800], theme.palette.primary[300]];
  const { data: operationalData } = useGetKpisQuery();
  const { data: productData } = useGetProductsQuery();
  console.log("operationalData", operationalData);
  console.log("productData", productData);

  const operationalExpenses = useMemo(() => {
    return (
      operationalData &&
      operationalData[0].monthlyData.map(({ month, operationalExpenses, nonOperationalExpenses }) => {
        return {
          name: month.substring(0, 3),
          "Operational Expenses": operationalExpenses,
          "Non Operational Expenses": nonOperationalExpenses,
        };
      })
    );
  }, [operationalData]);


  const productExpenseData = useMemo(() => {
    return (
      productData &&
      productData.map(({ _id,price,expense }) => {
        return {
          _id:_id,
          price:price,
          expense:expense
        };
      })
    );
  }, [productData]);



  return (
    <>
      <DashboardBox sx={{ gridArea: "d" }}>
        <BoxHeader
          title='Operational vs Non-Operational Expenses'
          sideText='+4%'
        />
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={operationalExpenses}
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
              orientation='left'
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
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="Non Operational Expenses"
              stroke={theme.palette.success.main}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="Operational Expenses"
              stroke={theme.palette.primary.main}
            />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>

      <DashboardBox sx={{ gridArea: "e" }} >
        <BoxHeader
        title='Campaigns and Targets'
        sideText='+4%' />
        <FlexBetween mt='0.25rem' gap='1.5rem' pr='1rem' >
        <PieChart 
          width={110} 
          height={100}
          margin={{
            top: 0,
            right: -10,
            left: 10,
            bottom: 0,
          }}>
          <Pie
            stroke='none'
            data={pieData}
            innerRadius={18}
            outerRadius={38}
            paddingAngle={2}
            dataKey="value"
          >
            {pieData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={pieColor[index % pieColor.length]} />
            ))}
          </Pie>
        </PieChart>
        <Box ml='-0.7rem' flexBasis='40%' textAlign='center'>
          <Typography variant='h4'color={theme.palette.grey[400]}>Target Sales</Typography>
          <Typography m="0.3rem 0"variant='h3'color={theme.palette.primary[300]}>83</Typography>
          <Typography variant='h5'color={theme.palette.grey[400]}>Finance goals of the campaign that is desired</Typography>

        </Box>
        <Box  flexBasis='40%' textAlign='center'>
          <Typography variant='h4'color={theme.palette.grey[400]}>Losses in Revenue</Typography>
          <Typography variant='h6' color={theme.palette.grey[400]} m="0.3rem">Losses are down 25%</Typography>
          <Typography ml='0.4rem' variant='h4'color={theme.palette.grey[400]}>Profit Margins</Typography>
          <Typography  variant='h6'color={theme.palette.grey[400]}>Margins are up by 30% from last month.</Typography>

        </Box>
        </FlexBetween>
      </DashboardBox>
      <DashboardBox sx={{ gridArea: "f" }} >
      <BoxHeader
        title='Product Prices vs Expenses' sideText='+4%'/>
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart
          margin={{
            top: 20,
            right: 25,
            bottom: 40,
            left: 0,
          }}
        >
          <CartesianGrid stroke={theme.palette.grey[800]} />
          <XAxis 
           type="number"
           dataKey="price" 
           name="price" 
           axisLine={false}
           tickLine={false}
           style={{fontSize:"10px"}}
           tickFormatter={(v)=>`$${v}`} />

          <YAxis 
           type="number"
           dataKey="expense" 
           name="expense" 
           axisLine={false}
           tickLine={false}
           style={{fontSize:"10px"}}
           tickFormatter={(v)=>`$${v}`} />

          <ZAxis type='number' range={[20]} />
          <Tooltip formatter={(v)=>`$${v}`}  />
          <Scatter name="Product Expenses Ratio" data={productExpenseData} fill={theme.palette.tertiary[500]} />
        </ScatterChart>
      </ResponsiveContainer>
      </DashboardBox>
    </>
  )
}

export default Row2;
