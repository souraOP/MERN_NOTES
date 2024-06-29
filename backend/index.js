require("dotenv").config();
const config = require("./config.json");
const mongoose = require('mongoose');
const express = require('express');



//  creating the mongodb connection
mongoose.connect(config.connectionString);
mongoose.connection.on('connected', function(){
    console.log('Connected to the database');
});

const cors = require('cors');
const User = require('./models/user.model');
const Note = require('./models/note.model');

const app = express();
const jwt = require('jsonwebtoken');
const {authenticateToken} = require("./utilities");


app.use(express.json());

app.use(
    cors({
        origin: "*",
    })
);

app.get('/', function(req, res){
    res.json({data: "Soura"});
});

// Authorization API section Starts

// creating the account api
app.post('/create-account', async(req, res) => {
    const {fullName, email, password} = req.body;

    if(!fullName) {
        return res
            .status(400)
            .json({ error: true, message: "Full Name is required"});
    }

    if(!email) {
        return res.status(400).json({ error: true, message: "Email Address is required"});
    }

    if(!password) {
        return res
            .status(400)
            .json({error: true, message: "Password is required"});
    }

    // checking for existing user
    const isUser = await User.findOne({email: email});

    if(isUser){
        return res.json({
            error: true,
            message: "User already exists",
        });
    }

    const user = new User({
        fullName,
        email,
        password,
    });

    await user.save();

    // preparing the token
    const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "36000m",
    });

    return res.json({
        error: false,
        user,
        accessToken,
        message: "Account created successfully",
    });
});

// login api
app.post("/login", async(req, res) => {
    const {email, password} = req.body;

    if(!email) {
        return res.status(400).json({
            error: true,
            message: "Email Address is required"
        });
    }

    if(!password) {
        return res.status(400).json({
            error: true,
            message: "Password is required"
        });
    }

    const checkUserInfo = await User.findOne({email: email});
    
    if(!checkUserInfo) {
        return res.status(400).json({
            error: true,
            message: "UserID and password does not exists",
        });
    }

    if(checkUserInfo.email == email && checkUserInfo.password == password) {
        const user = {user: checkUserInfo};
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "36000m",
        });

        return res.json({
            error: false,
            accessToken,
            email,
            message: "Login successful",
        });
    } else {
        return res.status(400).json({
            error: true,
            message: "Invalid Credentials were entered",
        });
    }
});


// get the details of the user
app.get("/get-user", authenticateToken, async(req, res) => {
    const {user} = req.user;

    const isUser = await User.findOne({ _id: user._id });

    if(!isUser) {
        return res.sendStatus(401);
    }

    return res.json({
        user: {fullName: isUser.fullName, email: isUser.email, "id": isUser._id, createdOn: isUser.createdOn}, // fetching the required details from the user
        message: "User Details fetched successfully",
    });
});

// Authorization API section Ends


// Notes API section Starts

// adding the a note api
app.post("/add-note", authenticateToken, async(req, res) => {
    const {title, content, tags} = req.body;
    const { user } = req.user;
    if(!title) {
        return res.status(400).json({
            error: true,
            message: "Title is required",
        });
    }

    if(!content) {
        return res.status(400).json({
            error: true,
            message: "Content is required",
        });
    }

    try {
        const note = new Note({
            title,
            content,
            tags: tags || [],
            userId: user._id,
        });

        await note.save();

        return res.json({
            error: false,
            note,
            message: "Note added successfully",
        });
    }
    catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal Server Error",
        });
    }

});

// edit the note api
app.put("/edit-note/:noteId", authenticateToken, async(req, res) => {
    const noteId = req.params.noteId;
    const {title, content, tags, isPinned} = req.body;
    const {user} = req.user;

    if(!title && !content && !tags) {
        return res.status(400).json({
            error: true,
            message: "Atleast one field is required to update",
        });
    }

    try {
        const note = await Note.findOne({_id: noteId, userId: user._id});

        if(!note) {
            return res.status(400).json({
                error: true,
                message: "Note not found",
            });
        }

        if(title) {
            note.title = title;
        }
        if(content){
            note.content = content;
        }
        if(tags){
            note.tags = tags;
        }
        if(isPinned){
            note.isPinned = isPinned;
        }

        await note.save();
        return res.json({
            error: false,
            note,
            message: "Note updated successfully",
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal Server Error",
        });
    }
});

// get the notes api
app.get("/get-note/", authenticateToken, async(req, res) => {
    const {user} = req.user;

    try{
        const notes = await Note.find({userId: user._id}).sort({isPinned: -1}); // getting all the notes except the pinned ones
        return res.json({
            error: false,
            notes,
            message: "Notes fetched successfully",
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal Server Error",
        });
    }
});

// delete a note api
app.delete("/delete-note/:noteId", authenticateToken, async(req, res) => {
    const noteId = req.params.noteId;
    const {user} = req.user;    
    try {
        const note = await Note.findOne({_id: noteId, userId: user._id});

        if(!note){
            return res.status(400).json({
                error: true,
                message: "Note not found",
            });
        }
        await Note.deleteOne({
            _id: noteId,
            userId: user._id,
        });

        return res.json({
            error: false,
            message: "Successfully Deleted the Note",
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal Server Error",
        });
    }
});

// updating the isPinned boolean api
app.put("/update-pin/:noteId", authenticateToken, async(req, res) => {
    const noteId = req.params.noteId;
    const {isPinned} = req.body;
    const {user} = req.user;
    try {
        const note = await Note.findOne({_id: noteId, userId: user._id});
        if(!note) {
            return res.status(400).json({
                error: true,
                message: "Note not found",
            });
        }
        note.isPinned = isPinned;

        await note.save();
        return res.json({
            error: false,
            note,
            message: "Pinned successfully",
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal Server Error",
        });
    }
});

// Notes API section Ends

app.listen(8000, function(){
    console.log('Server running on port 8000');
});

module.exports = app;