const calendarElement = document.querySelector('.calendar');
const totalDays = 31;

const formattedDay = (day) => {
  return day < 10 ? `0${day}` : day.toString();
};

function showCatImage(imageUrl, day) {
  const modal = document.createElement('div');
  modal.classList.add('modal');

  const modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');

  const img = document.createElement('img');
  img.src = imageUrl;
  img.classList.add('cat-image-modal');

  const text = document.createElement('div');
  text.classList.add('modal-text');
  text.textContent = `Gato do dia ${day} de dezembro de 2023`;

  modalContent.appendChild(img);
  modalContent.appendChild(text);
  modal.appendChild(modalContent);

  document.body.appendChild(modal);

  modal.onclick = () => {
    modal.remove();
  };

  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      modal.remove();
    }
  });
}

function createCalendar() {
  localStorage.setItem('2023-12-05', 'https://cdn2.thecatapi.com/images/9f8.jpg');
  localStorage.setItem('2023-12-07', 'https://cdn2.thecatapi.com/images/MTU2NjE0Nw.gif');
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

      container.appendChild(dayNumber);

      if (imageUrl) {
        const img = document.createElement('img');
        img.src = imageUrl;
        img.classList.add('cat-image');

        img.onclick = () => {
          showCatImage(imageUrl, day);
        };

        container.appendChild(img);
      } else {
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

  createCalendar();
});
