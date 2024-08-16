import DashboardBox from '@/components/DashboardBox';
import { useGetProductsQuery, useGetTransactionsQuery, useGetKpisQuery } from '../state/api';
import { DataGrid, GridCellParams } from '@mui/x-data-grid';
import BoxHeader from '@/components/BoxHeader';
import { Typography, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import FlexBetween from '@/components/FlexBetween';
import { Cell, Pie, PieChart } from 'recharts';
import { useMemo } from 'react';

const Row3 = () => {
  const theme = useTheme();

  const pieColor = [theme.palette.primary[800], theme.palette.primary[500]];

  const { data: kpiData } = useGetKpisQuery();
  const { data: productData } = useGetProductsQuery();
  const { data: transactionData } = useGetTransactionsQuery();

  const PieChartData = useMemo(() => {
    if (kpiData && kpiData[0] && kpiData[0].totalExpenses != null && kpiData[0].expensesByCategory) {
      const totalExpenses = kpiData[0].totalExpenses;
      const expensesByCategory = kpiData[0].expensesByCategory;

      if (typeof expensesByCategory !== 'object' || expensesByCategory === null) {
        console.warn('Expenses by category is invalid');
        return [];
      }

      return Object.entries(expensesByCategory).map(([key, value]) => [
        {
          name: key,
          value: value,
        },
        {
          name: `${key} of Total`,
          value: totalExpenses - value,
        },
      ]);
    }
    console.warn('No valid KPI data found');
    return [];
  }, [kpiData]);

  const productColumns = useMemo(() => [
    {
      field: '_id',
      headerName: 'ID',
      flex: 1,
    },
    {
      field: 'expense',
      headerName: 'Expense',
      flex: 0.5,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
    {
      field: 'price',
      headerName: 'Price',
      flex: 0.5,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
  ], []);

  const transactionColumns = useMemo(() => [
    {
      field: '_id',
      headerName: 'ID',
      flex: 1,
    },
    {
      field: 'buyer',
      headerName: 'Buyer',
      flex: 0.67,
    },
    {
      field: 'amount',
      headerName: 'Amount',
      flex: 0.35,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
    {
      field: 'productIds',
      headerName: 'Count',
      flex: 0.1,
      renderCell: (params: GridCellParams) => (params.value as Array<string>).length,
    },
  ], []);

  return (
    <>
      <DashboardBox sx={{ gridArea: 'g' }}>
        <BoxHeader
          title="List of Products"
          sideText={`${productData?.length || 0} products`}
        />
        <Box
          mt="0.6rem"
          p="0 0.5rem"
          height="75%"
          sx={{
            '& .MuiDataGrid-root': {
              color: theme.palette.grey[300],
              border: 'none',
            },
            '& .MuiDataGrid-cell': {
              borderBottom: `1px solid ${theme.palette.grey[800]} !important`,
            },
            '& .MuiDataGrid-columnHeaders': {
              borderBottom: `1px solid ${theme.palette.grey[800]} !important`,
            },
            '& .MuiDataGrid-columnSeparator': {
              visibility: 'hidden',
            },
          }}
        >
          <DataGrid
            columnHeaderHeight={25}
            rowHeight={35}
            hideFooter
            rows={productData || []}
            columns={productColumns}
          />
        </Box>
      </DashboardBox>

      <DashboardBox sx={{ gridArea: 'h' }}>
        <BoxHeader
          title="Recent Orders"
          sideText={`${transactionData?.length || 0} latest transactions`}
        />
        <Box
          mt="0.8rem"
          p="0 0.5rem"
          height="80%"
          sx={{
            '& .MuiDataGrid-root': {
              color: theme.palette.grey[300],
              border: 'none',
            },
            '& .MuiDataGrid-cell': {
              borderBottom: `1px solid ${theme.palette.grey[800]} !important`,
            },
            '& .MuiDataGrid-columnHeaders': {
              borderBottom: `1px solid ${theme.palette.grey[800]} !important`,
            },
            '& .MuiDataGrid-columnSeparator': {
              visibility: 'hidden',
            },
          }}
        >
          <DataGrid
            columnHeaderHeight={25}
            rowHeight={35}
            hideFooter
            rows={transactionData || []}
            columns={transactionColumns}
          />
        </Box>
      </DashboardBox>

      <DashboardBox sx={{ gridArea: 'i' }}>
        <BoxHeader title="Expenses Breakdown By Category" sideText="+4%" />
        <FlexBetween mt="0.5rem" gap="0.5rem" p="0 1rem" textAlign="center">
          {PieChartData.length > 0 ? (
            PieChartData.map((data, i) => (
              <Box key={`pie-chart-${i}`}>
                <PieChart width={110} height={100}>
                  <Pie
                    stroke="none"
                    data={data}
                    innerRadius={18}
                    outerRadius={35}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {data.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={pieColor[index % pieColor.length]} />
                    ))}
                  </Pie>
                </PieChart>
                <Typography variant="h5">{data[0].name}</Typography>
              </Box>
            ))
          ) : (
            <Typography variant="h6">No data available</Typography>
          )}
        </FlexBetween>
      </DashboardBox>

      <DashboardBox sx={{ gridArea: 'j' }} >
  <BoxHeader title="Overall Summary and Explanation Data" sideText="+15%" />
  <Box
    height="15px"
    margin="1.25rem 1rem 0.4rem 1rem"
    bgcolor={theme.palette.primary[800]}
    borderRadius="1rem"
  >
    <Box
      height="15px"
      bgcolor={theme.palette.primary[300]}
      borderRadius="1rem"
      width="40%"
    />
  </Box>
  <Typography 
    margin="0 1rem" 
    variant='h6'
    sx={{ 
      color: theme.palette.grey[400],
      fontSize: "13px"
    }}
  >
    This section provides a condensed overview of the key findings from the data analysis. It presents the most important results in a clear and concise manner.
  </Typography>
</DashboardBox>
    </>
  );
};

export default Row3;