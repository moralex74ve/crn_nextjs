import { useRouter } from "next/dist/client/router";
import Form from "../../components/Form";
import Link from "next/link";
import conectarDB from "../../lib/dbConnect";
//import Movie from "../../models/Movie";
import Oveja from "../../models/Oveja";

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

  return (
    
    <div className="container">
      <h1>Detalle de Movie</h1>
      <Form forNewMovie={false} formData={movie}></Form>
    
    </div>
  );
};

export default MoviePage;

export async function getServerSideProps({ params }) {
  try {
    await conectarDB();

    const movie = await Oveja.findById(params.id).lean();

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
