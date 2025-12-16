
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';

import { ControlPanel } from './pages/ControlPanel';
import { ScenarioDetective } from './pages/ScenarioDetective';
import { ScenarioFactory } from './pages/ScenarioFactory';
import { ScenarioParadox } from './pages/ScenarioParadox';
import { ScenarioCoding } from './pages/ScenarioCoding';

// Placeholder components for routes we haven't built yet
const ScenarioPlaceholder = ({ name }: { name: string }) => (
  <div className="text-center py-20">
    <h2 className="text-3xl font-bold text-gray-300 mb-4">Próximamente</h2>
    <p className="text-xl text-gray-500">El escenario "{name}" está en construcción.</p>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<ControlPanel />} />
          <Route path="scenarios">
            <Route index element={<Navigate to="/" replace />} />
            <Route path="detective" element={<ScenarioDetective />} />
            <Route path="factory" element={<ScenarioFactory />} />
            <Route path="paradox" element={<ScenarioParadox />} />
            <Route path="coding" element={<ScenarioCoding />} />
            <Route path="kingdom" element={<ScenarioPlaceholder name="El Reino Incompleto" />} />
          </Route>
          <Route path="progress" element={<ScenarioPlaceholder name="Tu Progreso" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
