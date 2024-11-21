import { create, type StateCreator } from "zustand"
import { devtools } from "zustand/middleware"
import { persist } from "zustand/middleware"
import { immer } from "zustand/middleware/immer"
import { Task, TaskStatus } from "../types"

interface TasksState {
  draggingTaskId?: Task["id"]
  tasks: Record<Task["id"], Task> 
  getTasksByStatusAndList: (status: TaskStatus, taskListId: number) => Task[] 
  addTask: (
    title: string,
    description: string,
    status: TaskStatus,
    taskListId: number,
    projectId: number,
    assignedToId?: number
  ) => void
  setDraggingTaskId: (taskId: Task["id"]) => void
  removeDraggingTaskId: () => void
  changeStatus: (taskId: Task["id"], status: TaskStatus) => void
  onTaskDrop: (status: TaskStatus) => void
}

const storeApi: StateCreator<TasksState, [["zustand/immer", never]]> = (set, get) => ({
  draggingTaskId: undefined,
  tasks: {},
  // Filtrar tareas por status y taskListId
  getTasksByStatusAndList: (status: TaskStatus, taskListId: number): Task[] => {
    const tasks = Object.values(get().tasks)
    return tasks.filter((task) => task.status === status && task.taskListId === taskListId)
  },
    addTask: (title, description, status, taskListId, projectId, assignedToId) => {
      const id = Math.max(...Object.keys(get().tasks).map((key) => parseInt(key))) + 1
    const newTask: Task = {
        id: id,
        title,
        description,
        status,
        taskListId,
        projectId,
        assignedToId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        comments: []
    }
    set((state) => {
      state.tasks[newTask.id] = newTask
    })
  },
  setDraggingTaskId: (taskId: Task["id"]) => {
    set({ draggingTaskId: taskId })
  },
  removeDraggingTaskId: () => {
    set({ draggingTaskId: undefined })
  },
  changeStatus: (taskId: Task["id"], status: TaskStatus) => {
    set((state) => {
      const task = state.tasks[taskId]
      if (task) {
        task.status = status
        task.updatedAt = new Date() // Actualizamos la fecha de modificación
      }
    })
  },
  onTaskDrop: (status: TaskStatus) => {
    const taskId = get().draggingTaskId
    if (!taskId) return
    get().changeStatus(taskId, status)
    get().removeDraggingTaskId()
  },
})

export const useTasksStore = create<TasksState>()(devtools(persist(immer(storeApi), { name: "tasks-store" })))
