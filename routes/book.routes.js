const router = require("express").Router();
const Book = require("../models/Book.model");


//Lista completa de libros
router.get("/books", (peticion, res, next) => {
    // console.log(peticion)
    Book.find()
        .then(librosRegistrados => {
            res.render("books/books-list", { data: librosRegistrados })
        })
        .catch(error => console.log("Error:", error))
})

//Mostrar formulario de registro
router.get("/books/create", (req, res, next) => {
    res.render("books/book-create")
})

//Guardar datos del libro

router.post("/books/create", (req, res, next) => {
    console.log(req.body)
    // console.log(Number(req.body.rating))
    // console.log(+req.body.rating)
    Book.create(req.body)
        .then(nuevoLibro => {
            console.log(nuevoLibro)
            res.redirect("/books")
        })
        .catch(err => console.log(err))
})

//Lista a detalle de cada libro
router.get("/books/:identificador", (req, res, next) => {
    // Antigua manera
    // const identificador = req.params.identificador
    // const otracosa = req.params.otracosa
    // Destructuracion 
    const { identificador } = req.params;

    //Book.find({ _id: identificador }) regresa un Arreglo
    //Book.findById(identificador) regresa un objeto
    Book.findById(identificador)
        .then(resultadoLibro => {
            // resultadoLibro es el libro que se tiene en DB
            // console.log("obj", resultadoLibro)
            //Debemos esperar que se cumpla la promesa para mostar datos
            res.render("books/book-details", { book: resultadoLibro })
        })
        .catch(err => console.log(err))
})

module.exports = router