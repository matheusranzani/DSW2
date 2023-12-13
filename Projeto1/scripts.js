document.querySelector('.get-cat-image').onclick = async () => {
  try {
    const { data } = await axios.get('https://api.thecatapi.com/v1/images/search');
    const imageUrl = data[0].url;

    const imagem = document.querySelector('.cat-image');
    imagem.src = imageUrl;
  } catch (error) {
    console.error('Erro ao buscar os dados da API:', error);
  }
};
