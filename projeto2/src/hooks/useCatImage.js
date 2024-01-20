import { useState } from 'react';
import axios from 'axios';

const useCatImage = () => {
  const [catImage, setCatImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const getTodaysFormattedDate = () => {
    const today = new Date();
    return `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
  };

  const generateCat = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('https://api.thecatapi.com/v1/images/search');
      const imageUrl = data[0].url;

      setCatImage(imageUrl);

      localStorage.setItem(getTodaysFormattedDate(), imageUrl);
    } catch (error) {
      console.error('Erro ao buscar os dados da API:', error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  const checkTodaysCat = ()  => {
    const formattedDate = getTodaysFormattedDate();
    const todaysCat = localStorage.getItem(formattedDate);

    if (todaysCat) {
      return true;
    }
  }

  return [catImage, generateCat, loading, checkTodaysCat];
};

export default useCatImage;
