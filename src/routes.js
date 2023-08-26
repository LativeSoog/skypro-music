import { Route, Routes } from 'react-router-dom'
import { LoginPage } from './pages/Login/LoginPage.jsx'
import { MainPage } from './pages/Main/MainPage.jsx'
import { NotFoundPage } from './pages/NotFound/NotFoundPage.jsx'
import { RegistrationPage } from './pages/Registration/RegistrationPage.jsx'
import { FavoritesPage } from './pages/Favorites/FavoritesPage.jsx'
import { CategoryPage } from './pages/Category/CategoryPage.jsx'
import { ProtectedRoute } from './protectedRoute.js'
import { useUserContext } from './contexts/userContext.jsx'

export const AppRoutes = ({
  setUser,
  currentSong,
  setCurrentSong,
  trackListAll,
  isErrorApp,
}) => {
  const user = useUserContext()
  return (
    <Routes>
      <Route path="*" element={<NotFoundPage />} />

      <Route element={<ProtectedRoute isAllowed={Boolean({ user })} />}>
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route
          path="/"
          element={
            <MainPage
              currentSong={currentSong}
              setCurrentSong={setCurrentSong}
              trackListAll={trackListAll}
              isErrorApp={isErrorApp}
            />
          }
        />
        <Route path="/category/:id" element={<CategoryPage />} />
      </Route>

      <Route path="/login" element={<LoginPage setUser={setUser} />} />
      <Route path="/registration" element={<RegistrationPage />} />
    </Routes>
  )
}
