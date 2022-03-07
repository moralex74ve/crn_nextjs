import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import Head from "next/head";
import conectarDB from "../../../lib/dbConnect";
//import Movie from "../../models/Movie";
import Oveja from "../../../models/Oveja";


const MoviePage = ({ success, error, movie }) => {
  const router = useRouter();
  
  if (!success) {
    return (
      <div className="container text-center my-5">
        <h1>{error} 🤦‍♂️</h1>

        <Link href="/">
          <a className="btn btn-success">Volver...</a>
        </Link>
      </div>
    );
  }

  const deleteData = async (id) => {
    try {
      await fetch(`/api/oveja/${id}`, {
        method: "DELETE",
      });
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
      <div>
      <Head>
        <title>Create Next App</title>
        <meta name="viewport" content="width=device-width, initial-scale=.5" />
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container" >
      <div className="card">
        <div className="card-header">
        <h1 className="text-center" >Comunidad del Rey</h1>
        </div>
        <div className="card-body">
        
        <Link href="/new">
          <a className="btn btn-primary w-100 mb-2">Agregar</a>
        </Link>
        <div className="table-responsive">
        <table className="table table-responsive">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre y Apellido</th>
                <th scope="col">Cedula</th>
                <th scope="col">Telefono</th>
                <th scope="col">...</th>
              </tr>
            </thead>
            <tbody >
              
            {movies.map(({ _id, nombre, apellido,cedula,tel2,tel1 }) => (
              <tr key={_id}>
              <th scope="row" ></th>
                <td>{nombre} - {apellido} </td>
                <td><strong>{cedula} </strong></td>
                <td>{tel2}</td>
                <td>
                <Link href={`/${_id}`}>
                <a className="btn btn-success btn-xs">Más info...</a>
              </Link>
                </td>
              </tr>
                
              ))
                
              }
            </tbody>
          </table>
       </div>
        
       
          
        </div>
        <div className="card-footer text-muted">
          2 days ago
        </div>
      </div>

      </main>
    </div>
  );
};

export default MoviePage;

export async function getServerSideProps({ params }) {
  try {
    await conectarDB();

    /*const xmovie = await Oveja.findById(params.id).lean();*/
    const { texto } = req.params 
    const movie = await Oveja.find(
      { $or: [ 
          {nombre: { $regex: `${texto}`, $options: 'i'}}, 
          {apellido: { $regex: `${texto}`, $options: 'i'}},
          {cedula: { $regex: `${texto}`, $options: 'i'}} 
            ] })
            
    /*res.json( tasks )*/

    if (!movie) {
      return { props: { success: false, error: "pelicula no encontrada" } };
    }

    console.log(movie);
    movie._id = `${movie._id}`;

    return { props: { success: true, movie } };
  } catch (error) {
    console.log(error);
    if (error.kind === "ObjectId") {
      return { props: { success: false, error: "id no válido" } };
    }
    return { props: { success: false, error: "Error de servidor" } };
  }
}
