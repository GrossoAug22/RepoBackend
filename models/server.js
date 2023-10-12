const express = require("express");

const cors = require("cors");

const { DBconnection } = require("../database/config");


class Server {
    constructor() {
        this.app = express();

        this.port = process.env.PORT;

        this.authPath = "/api/auth";

        this.usuarioPath = "/api/usuarios";

        this.categoriasPath = "/api/categorias";

        this.ConectarBD();


        this.middleWares();

        this.routes();
    }



    async ConectarBD() {
        await DBconnection();

    }

    middleWares() {

        this.app.use(cors());

        this.app.use(express.json());

        this.app.use(express.static("public"));
    }


    routes() {
        //auth.js
        this.app.use(this.authPath, require("../routes/auth"));
        // usuario.js
        this.app.use(this.usuarioPath, require("../routes/usuarios"));

        this.app.use(this.categoriasPath, require("../routes/categorias"));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server On ${this.port} `);
        });
    }
};


module.exports = Server;
