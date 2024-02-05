import { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const LoadingScreen = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 9999;
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Loader = styled.div`
  border: 6px solid #D9D9D9;
  border-top: 6px solid #000;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${spin} 2s linear infinite;
  margin: auto;
`;

const useCalendar = () => {
  const [calendarData, setCalendarData] = useState([]);
  const [loading, setLoading] = useState(true);
  const totalDays = 29;

  const formattedDay = (day) => {
    return day < 10 ? `0${day}` : day.toString();
  };

  useEffect(() => {
    const createCalendar = () => {
      setTimeout(() => {
        const tempCalendarData = [];

        localStorage.setItem('2024-02-05', 'https://cdn2.thecatapi.com/images/9f8.jpg');
        localStorage.setItem('2024-02-07', 'https://cdn2.thecatapi.com/images/MTU2NjE0Nw.gif');
        localStorage.setItem('2024-02-10', 'https://cdn2.thecatapi.com/images/8on.jpg');

        try {
          for (let day = 1; day <= totalDays; day++) {
            const formattedDate = `2024-02-${formattedDay(day)}`;
            const imageUrl = localStorage.getItem(formattedDate);

            const dayData = {
              formattedDay: formattedDay(day),
              imageUrl,
            };

            tempCalendarData.push(dayData);
          }
        } catch (error) {
          console.error('Erro ao buscar os dados do localStorage:', error);
        }

        setCalendarData(tempCalendarData);
        setLoading(false);
      }, 1500);
    };

    createCalendar();
  }, []);

  return { calendarData, loading, LoadingScreen, Loader };
};

export default useCalendar;
