var path = require('path');
var Book = require('./model');

var routes = function(app) {
    // Obtener todos los libros
    app.get('/book', async (req, res) => {
        try {
            const result = await Book.find({});
            res.json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    // Agregar un nuevo libro
    app.post('/book', async (req, res) => {
        try {
            const book = new Book(req.body);
            const savedBook = await book.save();
            res.json({
                message: "Successfully added book",
                book: savedBook
            });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    // Eliminar un libro por ISBN
    app.delete("/book/:isbn", async (req, res) => {
        try {
            const deletedBook = await Book.findOneAndDelete({ isbn: req.params.isbn });
            if (!deletedBook) {
                return res.status(404).json({ message: "Book not found" });
            }
            res.json({
                message: "Successfully deleted the book",
                book: deletedBook
            });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    // Servir `index.html`
    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, '../public', 'index.html'));
    });
};

module.exports = routes;
