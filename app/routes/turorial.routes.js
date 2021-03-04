module.exports = app => {
    const blogs = require("../controllers/blog.controller");

    var router = require("express").Router();

    // Créer un nouveau blog
    router.post("/", blogs.create);

    // Retrouver tous les blogs
    router.get("/", blogs.findAll);

    // Retrouver tous les blos publier
    router.get("/published", blogs.findAllPublished);

    // Retrouver un blog avec id
    router.get("/:id", blogs.findOne);

    // Update un blog avec id
    router.put("/:id", blogs.update);

    // Supprimer un blog avec id
    router.delete("/:id", blogs.delete);

    // Supprimer tous les blog
    router.delete("/", blogs.deleteAll);

    app.use("/api/blogs", router);
};