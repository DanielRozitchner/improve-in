import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import AuthGuard from './components/features/auth/AuthGuard';
import Layout from './components/layout/Layout';
import BandDetailPage from './pages/BandDetailPage';
import BandsPage from './pages/BandsPage';
import LoginPage from './pages/LoginPage';
import { RootState } from './store/store';

const App = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return (
    <Routes>
      <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/bands" />} />
      <Route
        path="/bands"
        element={
          <AuthGuard>
            <Layout>
              <BandsPage />
            </Layout>
          </AuthGuard>
        }
      />

      <Route
        path="/bands/:id"
        element={
          <AuthGuard>
            <Layout>
              <BandDetailPage />
            </Layout>
          </AuthGuard>
        }
      />
      <Route path="/" element={<Navigate to="/bands" />} />
    </Routes>
  );
};

export default App;
