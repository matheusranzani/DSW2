document.querySelector('.get-cat-image').onclick = async () => {
  try {
    const { data } = await axios.get('https://api.thecatapi.com/v1/images/search');
    const imageUrl = data[0].url;

    const imagem = document.querySelector('.cat-image');
    imagem.src = imageUrl;

    const today = new Date(); // Obtém a data atual
    const formattedDate = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;

    localStorage.setItem(formattedDate, imageUrl);
  } catch (error) {
    console.error('Erro ao buscar os dados da API:', error);
  }
};
