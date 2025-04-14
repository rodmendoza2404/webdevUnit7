import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import DetailView from './components/DetailView';
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/detail/:id" element={<DetailView />} />
    </Routes>
  );
}

export default App;
