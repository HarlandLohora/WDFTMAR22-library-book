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

//Formulario para actualizar datos libro
//El parametro viene en la url
//El body no viene en la url


//Mostrar un formulario pre rellenado con la informacion existente
// req.params | req.body | req.query
router.get("/books/:param1/edit", (req, res) => {
    console.log(req.params.param1)
    //Se destructura el param1
    const { param1 } = req.params
    //Consultas al modelo regresan Promise
    Book.findById(param1)
        .then(libro => {
            console.log(libro)
            res.render("books/books-edit", { book: libro })
        })
        .catch(err => console.log(err))
})

//Actualizar el libro con los nuevos datos

router.post("/books/:param1/edit", (req, res) => {

    // console.log(req.params.param1)
    // console.log(req.body)
    const { param1 } = req.params
    Book.findByIdAndUpdate(param1, req.body, { new: true })
        .then(libroActualizado => {
            console.log("Libro Actualizado", libroActualizado)
            res.redirect(`/books/${param1}`)
            // res.send(libroActualizado)
        })
        .catch(console.log)
})


//EXTRA -  Tambien podemos buscar por title
router.get("/books/:title/byTitle", (req, res) => {
    const { title } = req.params
    Book.find({ title })
        .then(libro => {
            console.log(libro)
            res.render("books/books-edit", { book: libro[0] })
        })
        .catch(err => console.log(err))
})


//Endpoint | Recurso | URL 
//Eliminar un libro por ID
//NOTA MENTAL -> METODOS HTTP GENERALES VS POST  
router.post("/books/:params1/delete", (req, res, next) => {
    const { params1 } = req.params;
    Book.findByIdAndDelete(params1)
        .then(() => {
            console.log("Libro eliminado ")
            res.redirect("/books")
        })
        .catch(console.log)

})

module.exports = router