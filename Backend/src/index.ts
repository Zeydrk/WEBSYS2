import express from 'express';
import routes from './routes/routes'

const app = express();
const PORT = process.env.PORT || 4200;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (_, res) => {
  res.send('Intergalactic Species Trading System');
});

app.use('/api',  );

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
