import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import AppLayout from './layout/AppLayout'
import TasksPage from './pages/TasksPage'
import ProfilePage from './pages/ProfilePage'
import AboutPage from './pages/AboutPage'
import TaskDetailPage from './pages/TaskDetailPage'

function App() {

  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Navigate to="/tasks" replace />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/tasks/:id" element={<TaskDetailPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
    </Routes>
  )
}

export default App
