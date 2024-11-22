import { ViewKanban } from "@mui/icons-material"
import { Box, Button, Typography } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"

export default function HomePage() {
  const navigate = useNavigate() // Para manejar la navegación

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f0f4f8",
        padding: 4,
      }}>
      <ViewKanban sx={{ fontSize: "10rem", color: "primary.main" }} />
      <Box
        sx={{
          textAlign: "center",
          marginBottom: 4,
        }}>
        <Typography variant='h2' component='h1' gutterBottom>
          Trello Clone
        </Typography>
        <Typography variant='h6' color='textSecondary' gutterBottom>
          Organiza tus proyectos y tareas en tableros visuales.
        </Typography>
        <Typography variant='body1' color='textSecondary'>
          ¡Colabora, organiza y prioriza como un profesional!
        </Typography>
      </Box>
      <Link to='/auth/login'>
        <Button
          variant='contained'
          color='primary'
          size='large'
          sx={{
            paddingX: 4,
            paddingY: 1.5,
            fontSize: "1rem",
            textTransform: "none",
            borderRadius: "8px",
          }}>
          Get Started
        </Button>
      </Link>
    </Box>
  )
}
