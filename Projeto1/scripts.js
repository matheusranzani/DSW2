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
      button.disabled = false;
    }, 1000);
  } catch (error) {
    console.error('Erro ao buscar os dados da API:', error);
    button.disabled = false;
  }
};
