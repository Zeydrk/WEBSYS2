import express from 'express';
import cors from 'cors';
import router from './routes/routes';

const app = express();
const PORT = process.env.PORT || 4200;

// Enable CORS for frontend connection
app.use(cors({
  origin: 'http://localhost:3000', // React default port
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (_, res) => {
  res.send('Intergalactic Species Trading System');
});

app.use('/api', router);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});