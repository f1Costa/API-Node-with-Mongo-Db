import livros from "../models/Livro.js";

class LivroController {

    static listarLivros = async(req, res) => {
    //app.get('/livros', async (req, res) => {
        try {
            const livrosResultado = await livros.find();
            res.status(200).json(livrosResultado)
        } catch (err) {
            res.status(500).json(err);
        }
    }


    static cadastrarLivro = async (req, res) => {
        try {
          const livro = new livros(req.body);
          await livro.save();
          res.status(201).send(livro.toJSON());
        } catch (err) {
          console.error(err);
          res.status(500).json({ message: `Erro ao cadastrar livro - ${err}` });
        }
      };




    static atualizarLivro = async (req, res) => {
        try {
            const livro = await livros.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            });
            if (!livro) {
            return res.status(404).json({ message: "Livro não encontrado." });
             }
            res.status(200).send(livro.toJSON());
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: `Erro ao editar livro - ${err}` });
    }
  };

    static excluirLivro = async (req, res) => {
    try {
      const livro = await livros.findByIdAndDelete(req.params.id);
      if (!livro) {
        return res.status(404).json({ message: "Livro não encontrado." });
      }
      res.status(200).json({ message: "Livro excluído com sucesso." });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: `Erro ao excluir livro - ${err}` });
    }
  };

    static listarLivroPorEditora = async (req, res) => {
    const editora = req.params.editora;
    livros
      .find({ editora: editora })
      .then((livrosEncontrados) => {
        if (livrosEncontrados.length === 0) {
          return res
            .status(404)
            .json({
              message: `Nenhum livro encontrado para a editora ${editora}.`,
            });
        }
        res.status(200).send(livrosEncontrados);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ message: "Erro ao buscar livros." });
      });
  };



  static listarLivroPorid = async (req, res) => {
  let id = req.params.id;
  livros
    .find({ id: id })
    .then((livrosEncontradosId) => {
     if (livrosEncontradosId.length === 0) {
       return res
          .status(404)
         .json({
            message: `Nenhum livro encontrado para o id ${id}.`,
          });
      }
      res.status(200).send(livrosEncontradosId);
    })
    .catch((err) => {
     console.error(err);
      res.status(500).json({ message: "Erro ao buscar livros." });
    });
  };

}
export default LivroController