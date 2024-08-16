//import React from 'react';
import { Box, useMediaQuery } from '@mui/material';
//import DashboardBox from '@/components/DashboardBox';
import Row1 from './Row1';
import Row2 from './Row2';
import Row3 from './Row3';

const gridTemplateLargeScreen = `
  "a b c"
  "a b c"
  "a b c"
  "a b f"
  "d e f"
  "d e f"
  "d h i"
  "g h i"
  "g h j"
  "g h j"
`;

const gridTemplateSmallScreen = `
  "a"
  "a"
  "a"
  "a"
  "b"
  "b"
  "b"
  "b"
  "c"
  "c"
  "c"
  "d"
  "d"
  "d"
  "e"
  "e"
  "f"
  "f"
  "f"
  "g"
  "g"
  "g"
  "h"
  "h"
  "h"
  "h"
  "i"
  "i"
  "j"
  "j"
`;

const Dashboard = () => {
  const isAboveMediumScreen = useMediaQuery("(min-width:1200px)");

  return (
    <Box
      width="100%"
      height="100%"
      display="grid"
      gap="1.5rem"
      sx={{
        gridTemplateColumns: isAboveMediumScreen ? "repeat(3, minmax(370px, 1fr))" : "1fr",
        gridTemplateRows: isAboveMediumScreen ? "repeat(10, minmax(60px, 1fr))" : "repeat(30, minmax(60px, 1fr))",
        gridTemplateAreas: isAboveMediumScreen ? gridTemplateLargeScreen : gridTemplateSmallScreen,
      }}
    >
      <Row1 />
      <Row2 />
      <Row3 />
    </Box>
  );
};

export default Dashboard;
