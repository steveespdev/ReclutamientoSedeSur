const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const bycript = require("bcrypt");
const saltRounds = 10;

const jwt = require('jsonwebtoken');

const app = express();

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true
}));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    key: "userId",
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60 * 60 * 24,
    }
}))

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "adminroot",
    database: "loginsystem"
});

app.post('/register', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    bycript.hash(password, saltRounds, (err, hash) => {

        if (err) {
            console.log(err);
        }

        db.query("INSERT INTO users (email, password, name, role) VALUES (?,?,?,?)",
            [email, hash, name, "professor"],
            (err, result) => {
                console.log(err);
            }
        );
    })

});

const verifyJWT = (req, res, next) => {
    const token = req.headers["x-access-token"]

    if (!token) {
        res.send("No token is provided!");
    } else {
        jwt.verify(token, "jwtSecret", (err, decoded) => {
            if (err) {
                res.json({ auth: false, message: "Authentication failed!" });
            } else {
                req.userId = decoded.id;
                next();
            }
        })
    }
}

app.get('/userAuth', verifyJWT, (req, res) => {
    // message: "Authentication is complete!",
    res.send({ auth: true, user: req.session.user[0].role });
})

app.get('/login', (req, res) => {

    if (req.session.user) {
        res.send({ loggedIn: true, user: req.session.user });
    } else {
        res.send({ loggedIn: false, user: req.session.user });
    }
});

app.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    db.query("SELECT * FROM users WHERE email = ?",
        email,
        (err, result) => {
            if (err) {
                res.send({ err: err });
            }

            if (result.length > 0) {
                bycript.compare(password, result[0].password, (error, response) => {
                    if (response) {
                        // console.log(req.session.user);
                        const id = result[0].id;
                        const token = jwt.sign({ id }, "jwtSecret", {
                            expiresIn: 300,
                        })
                        req.session.user = result;

                        res.json({ auth: true, token: token, role: result[0].role });
                    } else {
                        res.json({ auth: false, message: "Wrong username/pass combination" });
                    }
                });
            } else {
                res.json({ auth: false, message: "no user exists" });
            }
        }
    );

})

app.listen(3001, () => {
    console.log("runnig server!");
});

