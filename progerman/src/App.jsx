import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import CustomCursor from './components/CustomCursor'
import ParticleBackground from './components/ParticleBackground'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Levels from './pages/Levels'
import LessonList from './pages/LessonList'
import LessonView from './pages/LessonView'
import Vocabulary from './pages/Vocabulary'
import Grammar from './pages/Grammar'
import Profile from './pages/Profile'

export default function App() {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-bg-primary relative">
      <CustomCursor />
      <ParticleBackground />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/levels" element={<Levels />} />
          <Route path="/levels/:levelId/lessons" element={<LessonList />} />
          <Route path="/lesson/:lessonId" element={<LessonView />} />
          <Route path="/vocabulary" element={<Vocabulary />} />
          <Route path="/grammar" element={<Grammar />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </AnimatePresence>
    </div>
  )
}
