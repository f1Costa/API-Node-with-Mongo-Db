import express from "express";
import LivroController from "../controllers/livrosController.js";

const router = express.Router();

router
  .get("/livros", LivroController.listarLivros)
    //obs: as rotas devem estar listadas da mais específica para a menos específica, se não, pode dar erro.
  //a rota abaixo /busca é bem específica, por isso ela fica acima da /livros/:id
  .get("/livros/:editora", LivroController.listarLivroPorEditora)
  .get("/livros/:id", LivroController.listarLivroPorid)
  .post("/livros", LivroController.cadastrarLivro)
  .put("/livros/:id", LivroController.atualizarLivro)
  .delete("/livros/:id", LivroController.excluirLivro);

    export default router;