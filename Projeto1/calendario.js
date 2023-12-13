const calendarElement = document.querySelector('.calendar');
const totalDays = 31;

const formattedDay = (day) => {
  return day < 10 ? `0${day}` : day.toString();
};

async function preencherCalendario() {
  try {
    for (let day = 1; day <= totalDays; day++) {
      const response = await axios.get('https://api.thecatapi.com/v1/images/search');
      const imageUrl = response.data[0].url;

      const container = document.createElement('div');
      container.classList.add('calendar-item');

      const img = document.createElement('img');
      img.src = imageUrl;
      // img.alt = `Gato do dia ${day}`;
      img.classList.add('cat-image');

      const dayNumber = document.createElement('div');
      dayNumber.classList.add('day-number');
      dayNumber.textContent = formattedDay(day);

      container.appendChild(img);
      container.appendChild(dayNumber);
      calendarElement.appendChild(container);
    }
  } catch (error) {
    console.error('Erro ao buscar os dados da API:', error);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const loadingScreen = document.querySelector('.loading-screen');
  const calendar = document.querySelector('.calendar');

  setTimeout(() => {
    loadingScreen.style.display = 'none';
    calendar.style.display = 'grid';
  }, 9000);

  preencherCalendario();
});
