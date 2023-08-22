const axios = require('axios');
const express = require('express');
const app = express();
const port = 3000; 

app.use(express.json());

async function fetchAndSortNumbers(url) {
    try {
        const response = await axios.get(url);
        const data = response.data;

        if (!data.numbers || !Array.isArray(data.numbers)) {
            throw new Error('Invalid response format');
        }

        const numbers = data.numbers;
        const sortedNumbers = numbers.sort((a, b) => a - b);
        return sortedNumbers;
    } catch (error) {
        throw error;
    }
}

app.get('/api/numbers', async (req, res) => {
    try {
        const { url } = req.query;

        if (!url) {
            return res.status(400).json({ error: 'URL parameter is required' });
        }

        const sortedNumbers = await fetchAndSortNumbers(url);
        const numbers = sortedNumbers;
        res.json({numbers});
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
});

app.listen(port, () => {
    console.log(`API server is running on port ${port}`);
});
