import { useRouter } from "next/router";
import { FC, FormEvent, useState } from "react";
import { Button, Card, TextField, Typography } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import InputAdornment from "@mui/material/InputAdornment";

const Login: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    // const data = await res.json();
    if (res.status !== 200) return alert("Wrong credentials");
    const token = await res.text();
    localStorage.setItem("device-list-token", token);
    router.push("/");
  };
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "#24292f",
      }}
    >
      <Card sx={{ p: 3, width: "600px" }}>
        <form onSubmit={handleSubmit}>
          <Typography variant="h4" sx={{ textAlign: "center" }}>
            Login
          </Typography>
          <TextField
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
            required
          />
          <TextField
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" size="large">
            Login
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Login;
