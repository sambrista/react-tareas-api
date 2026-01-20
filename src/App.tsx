import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import AppLayout from './layout/AppLayout'
import TasksPage from './pages/TasksPage'
import AboutPage from './pages/AboutPage'
import ProfilePage from './pages/ProfilePage'

function App() {

  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Navigate to="/tasks" replace />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
    </Routes>
  )
}

export default App
