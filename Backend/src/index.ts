import express from 'express';
import cors from 'cors';
import router from './routes/routes';

const app = express();
const PORT = process.env.PORT || 4200;
// change cors credebility with this variable
const HOST = process.env.HOST;
// Enable CORS for frontend connection
app.use(cors({
  origin: HOST, // React default port
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

export default app;