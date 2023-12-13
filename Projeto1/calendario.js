const calendarElement = document.querySelector('.calendar');
const totalDays = 31;

const formattedDay = (day) => {
  return day < 10 ? `0${day}` : day.toString();
};

function preencherCalendario() {
  localStorage.setItem('2023-12-05', 'https://cdn2.thecatapi.com/images/d62.jpg');
  localStorage.setItem('2023-12-07', 'https://cdn2.thecatapi.com/images/dkl.jpg');
  localStorage.setItem('2023-12-10', 'https://cdn2.thecatapi.com/images/8on.jpg');

  try {
    for (let day = 1; day <= totalDays; day++) {
      const formattedDate = `2023-12-${formattedDay(day)}`;
      const imageUrl = localStorage.getItem(formattedDate);

      const container = document.createElement('div');
      container.classList.add('calendar-item');

      const dayNumber = document.createElement('div');
      dayNumber.classList.add('day-number');
      dayNumber.textContent = formattedDay(day);

      if (imageUrl) {
        const img = document.createElement('img');
        img.src = imageUrl;
        img.classList.add('cat-image');

        const link = document.createElement('a');
        link.href = imageUrl;
        link.target = '_blank';
        link.appendChild(img);

        container.appendChild(link);
        container.appendChild(dayNumber);
      } else {
        container.appendChild(dayNumber);
        dayNumber.style.pointerEvents = 'none';
      }

      calendarElement.appendChild(container);
    }
  } catch (error) {
    console.error('Erro ao buscar os dados do localStorage:', error);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const loadingScreen = document.querySelector('.loading-screen');
  const calendar = document.querySelector('.calendar');
  calendar.style.display = 'none';

  setTimeout(() => {
    loadingScreen.style.display = 'none';
    calendar.style.display = 'grid';
  }, 1500);

  preencherCalendario();
});
