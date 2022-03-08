import Head from "next/head";
import Lista from "../../components/Lista"
import Link from "next/link";
import useSWR from "swr";
import { useRouter } from "next/dist/client/router";

const fetcher = async (url) => {
  const res = await fetch(url);
  console.log(url)
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
    console.log(id)
  const { data: movie, error } = useSWR(
    id ? `/api/oveja/ruto/${id}` : null,
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

  

  return (
    
    <div className="container">
        <Lista movies={movie}></Lista>
    </div>
  );
};

export default EditMovie;
