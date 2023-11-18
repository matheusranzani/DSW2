const express = require('express');
const axios = require('axios');

const app = express();

app.use(express.static('public'));

app.get('/gerar-gato', async (req, res) => {
  try {
    const resposta = await axios.get('https://api.thecatapi.com/v1/images/search');
    const { data } = resposta;

    res.status(200);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar os dados da API' });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Escutando a porta ${port}`);
});
