function checkTodaysCat() {
  const button = document.querySelector('.get-cat-image');
  const imageText = document.querySelector('.image-text');

  const today = new Date();
  const formattedDate = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;

  const todaysCat = localStorage.getItem(formattedDate);

  if (todaysCat) {
    button.disabled = true;
    imageText.classList.add('image-text-cat-created');
    imageText.classList.remove('image-text');
    imageText.innerHTML = 'O seu gato do dia de hoje já foi gerado!' + '<br>' + 'Você pode ver todos os seus gatos gerados na página de ';

    const linkElement = document.createElement('a');
    linkElement.href = 'perfil.html';
    linkElement.innerText = 'Perfil';

    imageText.appendChild(linkElement);
    imageText.innerHTML += '.';
  }
}

document.querySelector('.get-cat-image').onclick = async () => {
  const button = document.querySelector('.get-cat-image');
  button.disabled = true;

  const catContainer = document.querySelector('.cat-container');
  catContainer.innerHTML = '<div class="loader"></div>';

  try {
    const { data } = await axios.get('https://api.thecatapi.com/v1/images/search');
    const imageUrl = data[0].url;

    const catImage = document.createElement('img');
    catImage.src = imageUrl;
    catImage.classList.add('cat-image');

    const today = new Date();
    const formattedDate = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;

    localStorage.setItem(formattedDate, imageUrl);

    setTimeout(() => {
      catContainer.innerHTML = '';
      catContainer.appendChild(catImage);
      checkTodaysCat();
    }, 1000);
  } catch (error) {
    console.error('Erro ao buscar os dados da API:', error);
    button.disabled = false;
  }
};

checkTodaysCat();
