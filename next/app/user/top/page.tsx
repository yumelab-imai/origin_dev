import {
  Typography,
  Box,
  Container,
} from "@mui/material";
import axios from "@/utils/axios/server";
import Header from "@/components/organisms/Header";

type InitialAPIType = {
  message: string;
};

const Component = async () => {
  const data: { data: InitialAPIType } = await axios.get("/user/top");
  const message: string = data.data.message;
  console.log("message", message); // docker のコンテナlogで確認可能

  return (
    <>
      <Header />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'grey.200',
          padding: '2rem',
        }}
      >
        <Container maxWidth="md">
          <Box
            sx={{
              padding: '2rem',
              borderRadius: '0.5rem',
              backgroundColor: 'white',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              textAlign: 'center',
            }}
          >
            <Typography
              variant="h5"
              component="h2"
              gutterBottom
              sx={{ color: 'text.secondary' }}
            >
              ユーザートップ
            </Typography>
            <Typography
              variant="h5"
              component="h2"
              gutterBottom
              sx={{ color: 'text.secondary' }}
            >
              {message}
            </Typography>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Component;
