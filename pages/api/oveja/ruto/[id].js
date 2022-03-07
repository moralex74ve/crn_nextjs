import conectarDB from "../../../../lib/dbConnect";
import Oveja from "../../../../models/Oveja";

export default async function handler(req, res) {
  await conectarDB();

  // GET    api/movie/:id (obtener un id y listarlo)
  // DELETE api/movie/:id (elimina un doc con id)
  // PUT    api/movie/:id (modificar un doc con id)

  const {
    method,
    query: { id },
  } = req;
    
  switch (method) {
    
    case "GET":
      try {
      //  Aqui buscamos segun criterios
        const texto=id;
        const movie = await Oveja.find(
      { $or: [ 
          {nombre: { $regex: `${texto}`, $options: 'i'}}, 
          {apellido: { $regex: `${texto}`, $options: 'i'}},
          {cedula: { $regex: `${texto}`, $options: 'i'}} 
            ] }).lean().sort({nombre: 1, apellido: 1});;


        if (!movie) {
          return res.status(404).json({ success: false });
        }

        return res.json({ success: true, data: movie });
      } catch (error) {
        return res.status(404).json({ success: false });
      }
    default:
      return res
        .status(500)
        .json({ success: false, error: "Falla de servidor" });
  }
}
