const { Router } = require('express');
const { Quote } = require('../db')
const router = Router();

/*const quotes = [{
        quote: "Well, there's this passage I've got memorized that sort of fits this occasion. Ezekiel 25:17. The path of the righteous man is beset on all sides by the iniquities of the selfish and the tyranny of the evil men. Blessed is he who, in the name of charity and goodwill, shepherds the weak through the valley of darkness, for he is truly his brother's keeper, and the finder of lost children. And I will strike down upon thee with great vengeance and furious anger those who attempt to poison and destroy my brothers. And you will know my name is the Lord when I lay my vengeance upon thee!",
        author: "Jules Winnfield - Samuel L. Jackson",
        created_at: "March 1 1994"
    },

    {
        quote: "Uncomfortable silences. Why do we feel it's necessary to yak about bulls**t in order to be comfortable?",
        author: "Mia Wallace",
        created_at: "March 1 1994"
    }
]*/


//ejemplo de inicio del sistema. imprime una variable de sesion en la vista.
router.get("/", (req, res) => {
    let existeError = false;
    let error = req.flash("error");
    if (req.body.quote == "") {
        req.flash("error", "el campo author es obligatorio");
        existeError = true;
    };
    res.render("form", { error });
});

//mostrar citas
router.get("/quotes", async(req, res) => {
    let mensaje = req.flash("mensaje");
    let error = req.flash("error");
    //primero encontramos todas las citas
    const quotes = await Quote.findAll();
    res.render("quotes", { quotes, mensaje, error });
    //como se llama la variable : valor que va a tener
});


//crear nuevas citas
router.post("/quotes", async(req, res) => {



    // usamos modelos para agregar nuevas citas
    const new_quote = await Quote.create({
        author: req.body.author,
        quote: req.body.quote
    });
    //const newquote = req.body;
    //console.log(newquote);
    //quotes.push(newquote);
    res.redirect("/quotes");
});

//eliminar citas
router.get('/quotes/delete/:id', async(req, res) => {
    //encontramos la cita a eliminar mediante su id
    const quote = await Quote.findByPk(req.params.id);
    //una vez encontrada la eliminamos
    await quote.destroy();
    //mensaje de eliminado
    req.flash('mensaje', 'quote deleted');
    //redirigimos hacia la lista de citas
    res.redirect("/quotes", );
});

//editar citas
router.get('/quotes/edit/:id', async(req, res) => {
    //encontramos la cita a eliminar mediante su id
    const quote = await Quote.findByPk(req.params.id);
    let mensaje = req.flash("mensaje");
    let error = req.flash("error");
    //primero encontramos todas las citas
    const quotes = await Quote.findAll();
    res.render("edit", { quote, mensaje, error });
    //como se llama la variable : valor que va a tener
});

router.post('/quote/edit/:id', async(req, res) => {
    let mensaje = req.flash("mensaje");
    //encontramos la cita a editar mediante su id
    const quote = await Quote.findByPk(req.params.id);
    quote.author = req.body.author;
    quote.quote = req.body.quote;

    await quote.save();

    res.redirect("/quotes");
    //como se llama la variable : valor que va a tener
});




module.exports = router;