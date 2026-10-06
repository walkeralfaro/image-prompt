import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { QuestionnairePage } from './pages/QuestionnairePage';
import { ResultPage } from './pages/ResultPage';
import { ReviewPage } from './pages/ReviewPage';

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout><HomePage /></Layout>} path="/" />
        <Route element={<Layout><QuestionnairePage /></Layout>} path="/cuestionario" />
        <Route element={<Layout><ReviewPage /></Layout>} path="/revision" />
        <Route element={<Layout><ResultPage /></Layout>} path="/resultado" />
        <Route element={<Navigate replace to="/" />} path="*" />
      </Routes>
    </BrowserRouter>
  );
}
