require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

app.get('/journals', async (req, res) => {
    const journals = await prisma.journal.findMany({
        orderBy: { createdAt: 'desc' }
    });
    res.json(journals);
});

app.post('/journals', async (req, res) => {
    const { title, content } = req.body;
    const journal = await prisma.journal.create({
        data: { title, content }
    });
    res.json(journal);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`✅ Backend running at http://localhost:${PORT}`);
});