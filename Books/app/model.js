var mongoose = require('mongoose');

var dbHost = 'mongodb://localhost:27017/Books';
mongoose.connect(dbHost, { useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
    console.log('Conectado a MongoDB');
});
mongoose.connection.on('error', (err) => {
    console.error('Error en MongoDB:', err);
});

mongoose.set('debug', true);

var bookSchema = new mongoose.Schema({
    name: String,
    isbn: { type: String, index: true },
    author: String,
    pages: Number
});

var Book = mongoose.model('Book', bookSchema);

module.exports = Book;
