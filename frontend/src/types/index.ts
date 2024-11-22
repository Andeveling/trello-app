// types.ts

export type Profile = {
  id: number
  bio?: string | null
  userId: number
  user: User
}
export enum AuthStatus {
  pending = "pending",
  authorized = "authorized",
  unauthorized = "unauthorized",
}
export type User = {
  id: number
  email: string
  password: string
  name?: string | null
  profile?: Profile | null
  boards: BoardMember[]
  ownedBoards: Board[]
  tasks: Task[]
  comments: Comment[]
}

export type Board = {
  id: number
  name: string
  description?: string | null
  ownerId: number
  owner: User
  columns: Column[]
  members: BoardMember[]
  createdAt: Date
  updatedAt: Date
}

export type BoardMember = {
  id: number
  boardId: number
  board: Board
  userId: number
  user: User
  role: BoardRole
}

export type Column = {
  id: number
  name: string
  position: number
  boardId: number
  board: Board
  tasks: Task[]
  status: TaskStatus
}

export type Task = {
  id: number
  title: string
  description?: string | null
  position: number
  createdAt: Date
  updatedAt: Date
  columnId: number
  column: Column
  assignedToId?: number | null
  assignedTo?: User | null
  comments: Comment[]
}

export type Comment = {
  id: number
  content: string
  createdAt: Date
  userId: number
  user: User
  taskId: number
  task: Task
}

export enum TaskStatus {
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
}

export enum BoardRole {
  OWNER = "OWNER",
  MEMBER = "MEMBER",
}
