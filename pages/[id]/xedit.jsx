import Form from "../../components/Form";
import useSWR from "swr";
import { useRouter } from "next/dist/client/router";
import Nav from "../../components/Navbar";

const fetcher = async (url) => {
  console.log(url)
  const res = await fetch(url);

  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    // Attach extra info to the error object.
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  const { data } = await res.json();

  return data;
};

const EditMovie = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: movie, error } = useSWR(
    id ? `/api/oveja/${id}` : null,
    fetcher
  );

  if (error) {
    return <div>Error Encontrado</div>;
  }

  if (!movie) {
    return (
      <div className="container mt-5 text-center">
        <h1>Loading...</h1>
      </div>
    );
  }

  const formData = {
    nombre: movie.nombre,
    apellido: movie.apellido,
    cedula: movie.cedula,
    nacio: movie.nacio,
    mail: movie.mail,
    direccion: movie.direccion,
    tel1: movie.tel1,
    tel2: movie.tel2,
    status:movie.status,
    listado:movie.listado,
    nota:movie.nota
  };

  return (
    <>
    <div className="container">
      <h1>Editar Movie</h1>
      <Form forNewMovie={false} formData={formData}></Form>
    </div></>
  );
};

export default EditMovie;
