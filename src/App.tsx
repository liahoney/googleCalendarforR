
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CalendarWeek from './pages/CalendarWeek';
import CalendarMonth from './pages/CalendarMonth';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CalendarWeek />} />
        <Route path="/month" element={<CalendarMonth />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
