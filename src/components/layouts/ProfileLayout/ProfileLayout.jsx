import { Box, Container, Grid } from "@mui/material";
import { Outlet } from "react-router-dom";
import ProfileSidebar from "./ProfileSidebar";

const ProfileLayout = () => {
  return (
    <Container
      maxWidth={false}
      sx={{
        display: "flex",
        maxWidth: 1400,
        mt: 4,
        margin: "40px auto 24px",
        justifyContent: "center",
      }}
    >
      <Grid container spacing={3}>
        {/* SIDEBAR */}
        <Grid item xs={12} md={3}>
          <ProfileSidebar />
        </Grid>

        {/* CONTENT */}
        <Grid item xs={12} md={7}>
          <Box>
            <Outlet />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProfileLayout;
