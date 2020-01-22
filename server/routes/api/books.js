const express = require("express");
const router = express.Router();

const Book = require("../../models/Book.js");

//add a book
router.post('/', (req, res, next)=>{

    //check if user data is valid? tho i can make sure on front end that they provide title, author etc before they submit

    //idk if i should have this but these are like optional so idk what happens if i dont provide some values for them (should check w postman)
    var collaborators = req.body.collaborators == null ? [] : req.body.collaborators;
    var summary = req.body.collaborators == null ? 'No summary' : req.body.summary;
    var language = req.body.collaborators == null ? 'No language specified' : req.body.language;
    
    const newBook = new Book({
        title: req.body.title,
        authors: req.body.authors,
        collaborators: collaborators,
        summary: summary,
        language: language
    });

    newBook.save((err, book)=>{
        if(err){
            return res.status(400).json(err);
        }
        return res.status(201).json(book);
    });

    

});

//get all books (that belong to one user id, but then i think we can get that ID in the req, idk if thats RESTful tho or if i need to have it in the endpoint)
router.get("/user/:userId", (req, res, next)=>{ //idk if this is the way to do it
    //find all books that have an author of userid, and all books that have a collaborator of userid
    Book.find({$or:[{creator: req.params.userId },{collaborators: req.params.userId}]}, (err, data)=>{ //find where the user is the author but also all books where they r a collaborator?? then we need some kinda or 
        if(err){
            return res.status(400).json("Error in request");
        }
        return res.status(200).json(data);
    });
});

//get one book by its id (mongodbid i guess)
router.get("/:id", (req, res, next)=>{
    
    const bookId = req.params.id;

    console.log(req.params.id);
    
    Book.findById(bookId, (err, data)=>{
        if(err){
            console.log(err);
            return res.status(400).json("Error in request");
            
        }
        console.log("successful get req");
        console.log(data);
        return res.status(200).json(data);

    })
});

//update the book if any fields have changed, on only the changed fields
router.patch("/:id", (req, res, next)=>{

    const bookId = req.params.id;
    const bookParamsToUpdate = req.body;

    Book.findByIdAndUpdate( {_id: bookId} , bookParamsToUpdate, (err, data)=>{
        if(err){
            console.log(err);
            return res.status(400).json("Error in request");
        }

        return res.status(204).json(data);
    });

});


module.exports = router;
