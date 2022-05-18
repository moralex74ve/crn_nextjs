import { useRouter } from "next/dist/client/router";
//import { useRouter } from "next/router"
import { getSession } from "next-auth/react";
import Link from "next/link";
import React, { useState, useEffect } from 'react';
import Lista from "../components/Lista";
import conectarDB from "../lib/dbConnect";
import Oveja from "../models/Oveja";

export default function Home({ movies,seccion }) {
  //console.log(movies);
  
  const router = useRouter();
  const [count, setCount] = useState(0);
  const [texto, setTexto] = useState('a');

  if (typeof window !== "undefined") {
  // browser code
  window.addEventListener("keypress", function(event){
    if (event.keyCode == 13){
        event.preventDefault();
    }
}, false);
}
  
  function Filtrando(e) {
    setTexto(document.getElementById('xtexto').value);
    //console.log(texto);
  }
  
  const putData = async (form) => {
    setMenssage([]);
    const { id } = router.query;
    try {
      const res = await fetch(`/api/oveja/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!data.success) {
        for (const key in data.error.errors) {
          let error = data.error.errors[key];
          setMenssage((oldmenssage) => [
            ...oldmenssage,
            { message: error.message },
          ]);
        }
      } else {
        setMenssage([]);
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <main className="container">
        <div className="card">
          <div className="card-body">
            <form className="form-inline">
              <div className="form-group">
                <label className="fw-bold">
                  Usuario: {seccion.user.name} ...{" "}
                </label>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() =>
                    router.push("/api/auth/signout")
                    
                  }
                >
                  <span className="badge badge-secondary">Salir</span>
                </button>
                <br />
                <label>Filtrar:</label>
                <input
                  type="text"
                  className="form-control"
                  id="xtexto"
                  onChange={Filtrando}
                  placeholder="Nombre o Cedula a Buscar"
                />
              </div>

              <Link href={`/${texto}/busqueda`}>
                <a className="btn btn-warning btn-sm me-1 text-wrap">Filtrar</a>
              </Link>
              <br />
            </form>
            <Lista movies={movies} />
          </div>
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  try {
    const seccion= await getSession(ctx)
    if (!seccion) return {
      redirect:{
        destination: "/login",
        permanent: false,
      }
    };
    

    await conectarDB();
    const res = await Oveja.find().sort({nombre:1,apellido:1});

    const movies = res.map((doc) => {
      const movie = doc.toObject();
      movie._id = `${movie._id}`;
      return movie;
    });
    // console.log(res)
    return { props: { movies,seccion} };
  } catch (error) {
    console.log(error);
  }
}
