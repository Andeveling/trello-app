import Add from "@mui/icons-material/Add"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import LogoutIcon from "@mui/icons-material/Logout"
import MenuIcon from "@mui/icons-material/Menu"
import ViewKanbanIcon from "@mui/icons-material/ViewKanban"
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import CssBaseline from "@mui/material/CssBaseline"
import Divider from "@mui/material/Divider"
import Drawer from "@mui/material/Drawer"
import IconButton from "@mui/material/IconButton"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import { styled, useTheme } from "@mui/material/styles"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import { useQuery } from "@tanstack/react-query"
import * as React from "react"
import { api } from "../api/api"
import CreateProjectModal from "../components/Board/CreateBoardButton"
import { AuthStatus, Board } from "../types"
import { Link, Navigate, Outlet } from "react-router-dom"
import { useAuthStore } from "../stores/auth.store"

const drawerWidth = 240

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean
}>(({ theme }) => ({
  height: "calc(100vh - 64px)", // Resta la altura del AppBar (64px)
  overflow: "auto", // Permite hacer scroll en caso de que haya mucho contenido
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  variants: [
    {
      props: ({ open }) => open,
      style: {
        transition: theme.transitions.create("margin", {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      },
    },
  ],
}))

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(["margin", "width"], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}))

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}))

export default function PersistentDrawerLeft() {
  const theme = useTheme()
  const [open, setOpen] = React.useState(false)
  const user = useAuthStore((state) => state.user)
  const authStatus = useAuthStore((state) => state.status)
  const logoutUser = useAuthStore((state) => state.logoutUser)

  if (authStatus === AuthStatus.unauthorized || !user) {
    return <Navigate to='/' />
  }

  const handleLogout = () => {
    logoutUser()
  }

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const query = useQuery({
    queryKey: ["boards"],
    queryFn: async () => {
      const response = await api.get(`/boards/user`)
      return response.data
    },
    initialData: [],
  })

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position='fixed' open={open} elevation={0}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            sx={[
              {
                mr: 2,
              },
              open && { display: "none" },
            ]}>
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' noWrap component='div'>
            Persistent drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant='persistent'
        anchor='left'
        open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Add />
              </ListItemIcon>
              <CreateProjectModal />
            </ListItemButton>
          </ListItem>
          <Divider />
          {query.data.map((board: Board) => (
            <ListItem disablePadding key={board.id}>
              <ListItemButton component={Link} to={`/dashboard/boards/${board.id}`}>
                <ListItemIcon>
                  <ViewKanbanIcon />
                </ListItemIcon>
                <ListItemText primary={board.name} />
              </ListItemButton>
            </ListItem>
          ))}
          <Divider />
        </List>
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary='Logout' />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Outlet />
      </Main>
    </Box>
  )
}
