const mysql     = require("mysql");
const sqlConfig = require("../../settings.json").sqlConfig;
const app       = require("../app.js");

app.route("/api/comments/create")
    .get((req, res) => res.status(503).send({ status: "ERROR"}))
    .post((req, res) => {
        if (typeof req.body.articleId !== "string" || req.body.articleId === "") {
            res.status(503).send({ status: "ERROR", extra: "Vous devez renseigner un Id" });
            return;
        }
        if (typeof req.body.content !== "string" || req.body.content === "") {
            res.status(503).send({ status: "ERROR", extra: "Le contenu de commentaire est vide" });
            return;
        }
        if (typeof req.body.author !== "string" || req.body.author === "") {
            res.status(503).send({ status: "ERROR", extra: "L'auteur n'est pas renseigné" });
            return;
        }

        const sqlConnection = mysql.createConnection(sqlConfig);
        sqlConnection.query(
            "INSERT INTO node_comments(article_id, content, author) VALUES (?, ?, ?);",
            [ req.body.articleId, req.body.content, req.body.author ],
            (error, result) => {
                if (error) {
                    console.log(error);
                    res.status(503).send({ status: "ERROR" });
                } else {
                    console.log(result);
                    res.send({ status: "OK" });
                }
                sqlConnection.end();
            }
        );
    });
app.route("/api/comments/delete")
    .get((req, res) => res.status(503).send({ status: "ERROR"}))
    .post((req, res) => {
        if (typeof req.body.id !== "string" || req.body.id === "") {
            res.status(503).send({ status: "ERROR", extra: "vous devez renseigner l'id de commentaire"});
            return;
        }

        const sqlConnection = mysql.createConnection(sqlConfig);
        sqlConnection.query(
            "DELETE FROM node_comments WHERE id = ?;",
            [ req.body.id ],
            (error, result) => {
                if (error) {
                    console.log(error.code);
                    res.status(503).send({ status: "ERROR" });
                } else {
                    console.log(result);
                    if (result.affectedRows === 0) {
                        res.status(503).send({ status: "ERROR", extra: "le commentaire n'existe pas." });
                    } else {
                        res.send({ status: "OK" });
                    }
                }
                sqlConnection.end();
            }
        );
    });

app.get("/api/comments", (req, res) => {
    const sqlConnection = mysql.createConnection(sqlConfig);

    sqlConnection.query(
        "SELECT articles_id, content, node_users.firstname AS authorFirstname, node_users.lastname AS authorLastname, created_at"
        + "  FROM node_comments"
        + "  LEFT JOIN node_users"
        + "  ON node_comments.author = node_users.id"
        + "  WHERE articles_id = ?"
        + "  ORDER BY created_at DESC"
        + "  LIMIT 5;",
        [ req.query.articles_id ],
        (error, result) => {
            if (error) {
                console.log(error.code);
                res.status(503).send({ status: "ERROR" });
            } else {
                console.log(result);
                res.send({
                    status: "OK",
                    comments: result,
                });
            }
            sqlConnection.end();
        }
    );
});
