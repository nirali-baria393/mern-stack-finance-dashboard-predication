import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import { useGetKpisQuery } from "@/scenes/state/api";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { useMemo, useState } from "react";
import {
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import regression from 'regression'; 

const Predictions = () => {
  const { palette } = useTheme();
  const [isPredictions, setIsPredictions] = useState(false);
  const { data: kpiData } = useGetKpisQuery();

  const formattedData = useMemo(() => {
    if (!kpiData || !kpiData.length) return [];
    const monthData = kpiData[0].monthlyData;

    const formatted: Array<[number, number]> = monthData.map(
      ({ revenue }, i: number) => [i, parseFloat(revenue)]
    );

    const regressionLine = regression.linear(formatted);

    return monthData.map(({ month, revenue }, i: number) => ({
      name: month,
      "Actual Revenue": parseFloat(revenue), // Ensure revenue is a number
      "Regression Line": regressionLine.points[i][1],
      "Predicted Revenue": regressionLine.predict(i + 12)[1],
    }));
  }, [kpiData]);

  return (
    <DashboardBox width="100%" height="100%" p="2rem" overflow="hidden" bgcolor={palette.background.default}>
      <FlexBetween m="1.5rem 2.5rem" gap="1.5rem">
        <Box>
          <Typography variant="h3" gutterBottom>
            Revenue and Predictions
          </Typography>
          <Typography variant="h4" color={palette.grey[500]}>
            Charted revenue and predicted revenue based on a simple linear regression model
          </Typography>
        </Box>
        <Button
          onClick={() => setIsPredictions(!isPredictions)}
          sx={{
            color: palette.common.white,
            backgroundColor: palette.primary.main,
            "&:hover": {
              backgroundColor: palette.primary.dark,
            },
            boxShadow: "0.2rem 0.2rem 0.4rem rgba(0, 0, 0, 0.4)",
            borderRadius: "8px",
            padding: "0.75rem 1.5rem",
            textTransform: "uppercase",
            fontWeight: "bold",
          }}
        >
          {isPredictions ? "Hide Predictions" : "Show Predictions"}
        </Button>
      </FlexBetween>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={formattedData}
          margin={{ top: 20, right: 75, left: 20, bottom: 80 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={palette.grey[800]} />
          <XAxis dataKey="name" tickLine={false} style={{ fontSize: "12px" }}>
            <Label value="Month" offset={-10} position="insideBottom" />
          </XAxis>
          <YAxis
            domain={[12000, 26000]}
            axisLine={{ strokeWidth: "0" }}
            style={{ fontSize: "12px" }}
            tickFormatter={(v) => `$${v}`}
          >
            <Label value="Revenue in USD" angle={-90} offset={-10} position="insideLeft" />
          </YAxis>
          <Tooltip />
          <Legend verticalAlign="top" />
          <Line
            type="monotone"
            dataKey="Actual Revenue"
            stroke={palette.primary.main}
            strokeWidth={2}
            dot={{ strokeWidth: 4, stroke: palette.primary.main, fill: "white" }}
          />
          <Line
            type="monotone"
            dataKey="Regression Line"
            stroke="#8884d8"
            strokeWidth={2}
            dot={false}
          />
          {isPredictions && (
            <Line
              strokeDasharray="5 5"
              dataKey="Predicted Revenue"
              stroke={palette.secondary[500]}
              strokeWidth={2}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </DashboardBox>
  );
};

export default Predictions;