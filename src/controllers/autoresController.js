import autores from "../models/autor.js";

class AutorController {

    static listarAutores = async(req, res) => {
    //app.get('/autores', async (req, res) => {
        try {
            const AutoresResultado = await autores.find();
            res.status(200).json(AutoresResultado)
        } catch (err) {
            res.status(500).json(err);
        }
    }


    static cadastrarAutor = async (req, res) => {
        try {
          const autor = new autores(req.body);
          await autor.save();
          res.status(201).send(autor.toJSON());
        } catch (err) {
          console.error(err);
          res.status(500).json({ message: `Erro ao cadastrar Autor - ${err}` });
        }
      };




    static atualizarAutor = async (req, res) => {
        try {
            const autor = await autores.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            });
            if (!autor) {
            return res.status(404).json({ message: "autor não encontrado." });
             }
            res.status(200).send(autor.toJSON());
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: `Erro ao editar autor - ${err}` });
    }
  };

    static excluirAutor = async (req, res) => {
    try {
      const autor = await autores.findByIdAndDelete(req.params.id);
      if (!autor) {
        return res.status(404).json({ message: "autor não encontrado." });
      }
      res.status(200).json({ message: "autor excluído com sucesso." });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: `Erro ao excluir autor - ${err}` });
    }
  };

    static listarAutorPorEditora = async (req, res) => {
    const editora = req.params.editora;
    autores
      .find({ autor: autor })
      .then((autoresEncontrados) => {
        if (autoresEncontrados.length === 0) {
          return res
            .status(404)
            .json({
              message: `Nenhum autor encontrado para a editora ${editora}.`,
            });
        }
        res.status(200).send(autoresEncontrados);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ message: "Erro ao buscar autores." });
      });
  };



  static listarAutorPorid = async (req, res) => {
  let id = req.params.id;
  autores
    .find({ id: id })
    .then((autoresEncontrados) => {
     if (autoresEncontrados.length === 0) {
       return res
          .status(404)
         .json({
            message: `Nenhum autor encontrado para o id ${id}.`,
          });
      }
      res.status(200).send(autoresEncontrados);
    })
    .catch((err) => {
     console.error(err);
      res.status(500).json({ message: "Erro ao buscar autores." });
    });
  };

}

export default AutorController