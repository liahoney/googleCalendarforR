
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Calendar from './pages/Calendar';
import { Day } from 'react-day-picker';
import MonthCalendar from './pages/MonthCalendar';
import { useState } from 'react';



function App() {
  const [IsOpen, setIsOpen] = useState<boolean>(false)
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Calendar />} />
        <Route path="/month" element={<MonthCalendar setIsOpen={setIsOpen} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
