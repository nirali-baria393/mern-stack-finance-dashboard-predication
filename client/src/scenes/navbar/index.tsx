import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, useTheme } from '@mui/material';
import FlexBetween from '@/components/FlexBetween';
import StackedBarChartIcon from '@mui/icons-material/StackedBarChart';
const Navbar = () => {
  const theme = useTheme();
  const { palette } = theme;
  const [selected, setSelected] = useState("dashboard");

  return (
    <FlexBetween mb="0.25rem" p="0.5rem 0rem" color={palette.grey[100]}>
      {/* LEFT SIDE */}
      <FlexBetween gap="0.75rem">
        <StackedBarChartIcon sx={{ fontSize: "28px" }} />
        <Typography variant="h4" fontSize="16px">FinanceFlow</Typography>
      </FlexBetween>
      {/* RIGHT SIDE */}
      <FlexBetween gap="2rem">
        <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
          <Link
            to="/"
            onClick={() => setSelected("dashboard")}
            style={{
              color: selected === "dashboard" ? "inherit" : palette.grey[200],
              textDecoration: "inherit"
            }}
          >
            Dashboard
          </Link>
        </Box>
        <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
          <Link
            to="/predications"
            onClick={() => setSelected("predications")}
            style={{
              color: selected === "predications" ? "inherit" : palette.grey[200],
              textDecoration: "inherit"
            }}
          >
            Predications
          </Link>
        </Box>
        <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
          <Link
            to="/login"
            onClick={() => setSelected("login")}
            style={{
              color: selected === "login" ? palette.primary[100] : palette.grey[200],
              textDecoration: "none"
            }}
          >
            Login
          </Link>
        </Box>
        <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
          <Link
            to="/signup"
            onClick={() => setSelected("signup")}
            style={{
              color: selected === "signup" ? palette.primary[100] : palette.grey[200],
              textDecoration: "none"
            }}
          >
          Signup
          </Link>
        </Box>
      </FlexBetween>
    </FlexBetween>
  );
};

export default Navbar;
