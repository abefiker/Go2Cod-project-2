const express = require('express');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config();
const connectDB = require('./config/db');
connectDB();
const port = process.env.PORT || 4040;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const productRoutes = require('./routes/productRoutes');
const { notfound, errorHandler } = require('./middleware/errorHandler');
app.use('/api/products', productRoutes);
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('api is running');
  });
}
app.use(notfound);
app.use(errorHandler);
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
