import { zodResolver } from "@hookform/resolvers/zod"
import { Alert, Box, Button, TextField, Typography } from "@mui/material"
import React from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { z } from "zod"
import { useAuthStore } from "../../stores/auth.store"

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
})

type LoginFormValues = z.infer<typeof loginSchema>

export default function LoginPage() {
  const [error, setError] = React.useState<string | null>(null)
  const login = useAuthStore((state) => state.loginUser)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "alice@prisma.io",
      password: "password",
    },
  })

  const onSubmit = async (data: LoginFormValues) => {
    setError(null)
    if (isSubmitting) return

    try {
      await login(data.email, data.password)
      navigate("/dashboard")
    } catch (err) {
      setError("Usuario o contraseña incorrectos")
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
        padding: 2,
      }}>
      <Box
        component='form'
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          width: "100%",
          maxWidth: 400,
          backgroundColor: "white",
          padding: 3,
          borderRadius: 2,
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}>
        <Typography variant='h4' component='h1' gutterBottom align='center'>
          Login
        </Typography>

        {error && (
          <Alert severity='error' sx={{ marginBottom: 2 }}>
            {error}
          </Alert>
        )}

        <TextField
          label='Email'
          variant='outlined'
          type='email'
          fullWidth
          margin='normal'
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <TextField
          label='Contraseña'
          type='password'
          variant='outlined'
          fullWidth
          margin='normal'
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
        />

        <Button
          type='submit'
          variant='contained'
          color='primary'
          fullWidth
          disabled={isSubmitting}
          sx={{ marginTop: 2 }}>
          {isSubmitting ? "Iniciando sesión..." : "Iniciar sesión"}
        </Button>
      </Box>
    </Box>
  )
}
