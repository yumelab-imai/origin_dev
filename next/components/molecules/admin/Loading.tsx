"use client";
import React from "react";
import { Backdrop, Typography, Box, keyframes } from "@mui/material";
import { useAuth } from "@/utils/contexts/AuthContext";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const Loading = () => {
  const { isLoading } = useAuth();

  return (
    <Backdrop
      sx={{
        color: '#fff',
        zIndex: (theme) => theme.zIndex.drawer + 1, // zIndexをテーマのdrawerのzIndexより1高く設定
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'rgba(0, 0, 0, 0.8)',
      }}
      open={isLoading}
    >
      <Box display="flex" flexDirection="column" alignItems="center">
        <Box
          sx={{
            width: 64,
            height: 64,
            border: '8px solid #3f51b5',
            borderRadius: '50%',
            borderTop: '8px solid transparent',
            animation: `${spin} 2s linear infinite`
          }}
        />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading...
        </Typography>
      </Box>
    </Backdrop>
  );
};
