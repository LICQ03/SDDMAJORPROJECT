import db from "../database.js";


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
export const sendClassData = async (req, res) => {
    async function getUserId (username) {
        var finalId;
        await new Promise(function(resolve, reject) {
            db.query(
                "SELECT userId, username FROM userslogintable WHERE username = ?", [username], (error, rows, fields) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(rows[0]["userId"]);
                        finalId = rows[0]["userId"];
                    }
                });
        });
        return finalId;
    }

    try {
        const {username} = req.body;
        console.log(username);
        var userIdReceiver = '';
        const userId = await(getUserId(username).then(function(rows) {
            userIdReceiver = rows;
        }));
        db.query(
            "SELECT c.classId, c.teacherId FROM classtable AS c, userslogintable WHERE c.teacherId = ?",
            [userIdReceiver],
            function (error, results, fields) {
                try {
                    console.log(userIdReceiver);

                    res.json(results);
                    //console.log(results);
                } catch (err) {
                    res.send("<h1>Error</h1>");
                }

            });
    } catch (err) {
        res.send("<h1>Error</h1>");
    };

}


