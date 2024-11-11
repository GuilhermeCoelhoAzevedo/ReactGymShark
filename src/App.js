import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ExercisesPage from './pages/ExercisesPage';
import TemplatesPage from './pages/TemplatesPage';
import NotFoundPage from './pages/NotFoundPage';
import ExerciseDetailsPage from './pages/ExerciseDetailsPage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div id="page-body">
          <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/about" element={<AboutPage/>} />
            <Route path="/templates" element={<TemplatesPage/>} />
            <Route path="/exercises" element={<ExercisesPage/>} />
            <Route path="/exercise" element={<ExerciseDetailsPage/>} />
            <Route path="*" element={<NotFoundPage/>} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
