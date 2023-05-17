
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Calendar from './pages/Calendar';
import MonthCalendar from './pages/MonthCalendar';
import { Day } from 'react-day-picker';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Calendar />} />
        <Route path="/month" element={<MonthCalendar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
