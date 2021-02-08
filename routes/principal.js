const { Router } = require('express');
const router = Router();

const quotes = [{
        quote: "Well, there's this passage I've got memorized that sort of fits this occasion. Ezekiel 25:17. The path of the righteous man is beset on all sides by the iniquities of the selfish and the tyranny of the evil men. Blessed is he who, in the name of charity and goodwill, shepherds the weak through the valley of darkness, for he is truly his brother's keeper, and the finder of lost children. And I will strike down upon thee with great vengeance and furious anger those who attempt to poison and destroy my brothers. And you will know my name is the Lord when I lay my vengeance upon thee!",
        author: "Jules Winnfield - Samuel L. Jackson",
        created_at: "March 1 1994"
    },

    {
        quote: "Uncomfortable silences. Why do we feel it's necessary to yak about bulls**t in order to be comfortable?",
        author: "Mia Wallace",
        created_at: "March 1 1994"
    }
]


//ejemplo de inicio del sistema. imprime una variable de sesion en la vista.
router.get("/", (req, res) => {
    res.render("form");
});

router.get("/quotes", function(req, res) {

    res.render("quotes", { quotes: quotes });
    //como se llama la variable : valor que va a tener
});



router.post("/quotes", function(req, res) {
    const newquote = req.body;
    //console.log(newquote);
    quotes.push(newquote);
    res.render("quotes", { quotes: quotes });
});




module.exports = router;