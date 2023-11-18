document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('.gera-gato').onclick = async () => {
    try {
      const { data } = await axios.get('https://api.thecatapi.com/v1/images/search');
      console.log(data[0]);

      const imagem = document.querySelector('.imagem-gato');
      imagem.src = data[0].url;
    } catch (error) {
      console.error('Erro ao buscar os dados da API:', error);
    }
  }
});
