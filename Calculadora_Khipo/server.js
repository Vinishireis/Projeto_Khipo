const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(cors());

// Substitua com sua chave de API fornecida pela ExchangeRate-API
const EXCHANGE_RATE_API_KEY = '238325331d7d5b87ac5dbbd8';
const EXCHANGE_RATE_API_URL = `https://v6.exchangerate-api.com/v6/${EXCHANGE_RATE_API_KEY}/latest/USD`;


// Cálculo Nacional
app.post('/NationalCalculator', (req, res) => {
    const { valorMensal, quantidadeHoras, valorHora } = req.body;

    if (!valorMensal || !quantidadeHoras || !valorHora) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    const faturacaoMensal = quantidadeHoras * valorHora;
    const margemLucro = faturacaoMensal - valorMensal;

    res.json({
        valorLiquido: faturacaoMensal,
        comissao: 0,  // Ajuste conforme necessário
        mop: valorMensal,
        mlk: margemLucro
    });
});

// Cálculo Internacional
app.post('/InternationalCalculator', async (req, res) => {
    const { valorMensal, quantidadeHoras, valorHora, moedaDestino } = req.body;

    if (!valorMensal || !quantidadeHoras || !valorHora || !moedaDestino) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    try {
        // Obtém a taxa de câmbio para a moeda de destino
        const response = await axios.get(EXCHANGE_RATE_API_URL);
        const taxaCambio = response.data.rates[moedaDestino];

        if (!taxaCambio) {
            return res.status(400).json({ error: 'Moeda não suportada.' });
        }

        const faturacaoMensal = quantidadeHoras * valorHora;
        const faturacaoMensalEmMoedaDestino = faturacaoMensal * taxaCambio;
        const margemLucro = faturacaoMensalEmMoedaDestino - (valorMensal * taxaCambio);

        res.json({
            valorLiquido: faturacaoMensalEmMoedaDestino,
            comissao: 0,  // Ajuste conforme necessário
            mop: valorMensal * taxaCambio,
            mlk: margemLucro
        });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao obter taxa de câmbio.' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
