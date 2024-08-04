"use client"
import React, { useState } from "react";
import NextLink from 'next/link';
import {
  Button,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  Link,
  Box,
  Container,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "@/utils/axios/client";
import { useAuth } from "@/utils/contexts/AuthContext";
import { ErrorType } from "@/types/errors/common";

const Component = () => {
  const router = useRouter();
  const { isLoading, setIsLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<ErrorType>({});
  const handleLogin = async () => {
    setIsLoading(true);
    setErrors({});

    try {
      const response = await axios.post(`/user/login`, data);
      Cookies.set('token', response.data.token, { expires: 30 });
      router.push(`/user/top`);
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.status === 401) {
        alert('メールアドレスまたはパスワードが間違っています。');
      } else if (error.response && error.response.status === 422) { // バリデーションエラー
        setErrors(error.response.data.errors);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'grey.100',
      }}
    >
      <Container maxWidth="xs">
        <Box
          sx={{
            padding: "2rem",
            borderRadius: "0.5rem",
            backgroundColor: "white",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
          }}
        >
          <Typography variant="h4" component="h1" align="center" gutterBottom sx={{ color: "black" }}>
            ログイン
          </Typography>
          <TextField
            label="メールアドレス"
            variant="outlined"
            fullWidth
            margin="normal"
            value={data.email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData({ ...data, email: e.target.value })}
            error={!!errors.email}
            helperText={errors.email ? errors.email[0] : ""}
          />
          <TextField
            label="パスワード"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            fullWidth
            margin="normal"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            error={!!errors.password}
            helperText={errors.password ? errors.password[0] : ""}
            InputProps={{ // テキストフィールドの入力部分にカスタムコンテンツを追加
              endAdornment: ( //  テキストフィールドの末尾を装飾
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword((show) => !show)}
                    onMouseDown={(e) => e.preventDefault()} // マウスボタンを押したときにテキストフィールドのフォーカスが失われないようにする
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2, mb: 1 }}
            onClick={handleLogin}
            disabled={isLoading}
          >
            ログイン
          </Button>
          <Typography align="center" sx={{ color: "black", mt: 2 }}>
            新規登録は
            <NextLink href="/user/register" passHref>
              <Link>こちら</Link>
            </NextLink>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Component;
