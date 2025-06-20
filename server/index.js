require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3001;
const adminRoutes = require('./routes/admin');

app.use('/admin', adminRoutes);

// Middleware
app.use(cors());
app.use(express.json());

// Настройка multer для загрузки файлов
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    },
});

const upload = multer({ storage });

// Статика для доступа к загруженным файлам
app.use('/uploads', express.static(uploadDir));

// Роут для создания статьи с файлом
app.post('/articles', upload.single('file'), async (req, res) => {
    try {
        const { title, author, pages, journalId, userId } = req.body;
        const file = req.file;

        if (!file) {
            return res.status(400).json({ error: 'Файл не загружен' });
        }

        const article = await prisma.article.create({
            data: {
                title,
                author,
                pages,
                fileUrl: `/uploads/${file.filename}`,
                journalId: parseInt(journalId),
                userId: parseInt(userId),
                status: 'pending', // по умолчанию
            },
        });

        res.json(article);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ошибка при создании статьи' });
    }
});

// Пример: получить все статьи (можно с фильтром по статусу)
app.get('/articles', async (req, res) => {
    const { status } = req.query; // например ?status=approved

    try {
        const where = status ? { status } : {};
        const articles = await prisma.article.findMany({
            where,
            include: { journal: true, user: true },
        });
        res.json(articles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ошибка при получении статей' });
    }
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
