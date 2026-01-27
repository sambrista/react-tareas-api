import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import AppLayout from './layout/AppLayout'
import TasksPage from './pages/TasksPage'
import ProfilePage from './pages/ProfilePage'
import AboutPage from './pages/AboutPage'
import TaskDetailPage from './pages/TaskDetailPage'
import LoginPage from './pages/LoginPage'
import ProtectedRoute from './routing/ProtectedRoute'

function App() {

  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Navigate to="/tasks" replace />} />
        <Route path="/tasks" element={<ProtectedRoute><TasksPage /></ProtectedRoute>} />
        <Route path="/tasks/:id" element={<ProtectedRoute><TaskDetailPage /></ProtectedRoute>} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<p className='card'>La página indicada no existe</p>} />
      </Route>
    </Routes>
  )
}

export default App
