import db from "../database.js";
import express from "express";
import cookieParser from "cookie-parser";


export const loginCheck = async (req, res) => {
    try {
        const {username, password} = req.body;
        db.query(
            "SELECT * FROM userslogintable WHERE username = ? AND password = ?", [username, password],
            function (error, results, fields) {
                try {
                    if (results[0].username === username && results[0].password === password) {
                        console.log("logged in");
                        results[0]["value"] = "true";
                        res.json(results);
                        console.log(results);

                    }
                } catch (err) {
                    res.send("<h1>Incorrect username or password</h1>");
                }

            });
    } catch (err) {
        res.send("<h1>Error</h1>");
    };

}