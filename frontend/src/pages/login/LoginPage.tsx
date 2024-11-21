import React from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { TextField, Button, Box, Typography, Alert } from "@mui/material"
import { useAuth } from "../../auth"
import { useRouter } from "@tanstack/react-router"
import { Route } from "../../routes/login"
import { sleep } from "../../utils/utils"

const fallback = "/dashboard" as const
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
})

// Tipos de los datos del formulario
type LoginFormValues = z.infer<typeof loginSchema>

export default function LoginPage() {
  const { login } = useAuth()
  const router = useRouter()
  const search = Route.useSearch()
  const [error, setError] = React.useState<string | null>(null)
  const [isSubmittingForm, setIsSubmittingForm] = React.useState(false)

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
    if (isSubmittingForm) return // Prevent multiple submits

    setIsSubmittingForm(true) // Set submitting state

    try {
      await login(data.email, data.password)
      await sleep(1)

      await router.navigate({ to: search.redirect ?? fallback })
      console.log("Login exitoso!")
    } catch (err) {
      setError("Usuario o contraseña incorrectos")
    } finally {
      setIsSubmittingForm(false) // Reset submitting state
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
          disabled={isSubmitting || isSubmittingForm} // Prevent multiple submissions
          sx={{ marginTop: 2 }}>
          {isSubmitting || isSubmittingForm ? "Iniciando sesión..." : "Iniciar sesión"}
        </Button>
      </Box>
    </Box>
  )
}
