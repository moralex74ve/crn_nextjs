import Head from "next/head";
import Link from "next/link";
import React, { useState } from 'react';
import Nav from "../components/Navbar";

import conectarDB from "../lib/dbConnect";
//import Movie from "../models/Movie";
import Oveja from "../models/Oveja";

export default function Home({ movies }) {
  console.log(movies);
  const [count, setCount] = useState(0);
  const [texto, setTexto] = useState('a');

  const Filtrando = () => {
    setTexto(document.getElementById('xtexto').value)
    console.log(texto)
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
      
      <Head>
        <title>Create Next App</title>
        <meta name="viewport" content="width=device-width, initial-scale=.5" />
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      

      <main className="container" >
      <div className="card">
        
        <div className="card-body">
        
          <form >
            <div className="form-group">
              <label >Filtrar</label>
              <input type="text" className="form-control" id="xtexto" onChange={Filtrando} placeholder="Nombre o Cedula a Buscar" />
            </div>
            
            <Link href={`/${texto}/busqueda`}>
            <a className="btn btn-warning btn-sm me-2">Filtrar</a>
          </Link>
          <br />
          </form>

        <div className="table-responsive">
        <table className="table table-responsive">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre y Apellido</th>
                <th scope="col">Cedula</th>
                <th scope="col">Telefono.</th>
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
                <Link href={`${_id}`}>
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
}

export async function getServerSideProps() {
  try {
    await conectarDB();

    const res = await Oveja.find({}).sort({nombre: 1, apellido: 1});

    const movies = res.map((doc) => {
      const movie = doc.toObject();
      movie.nacio=`${movie.nacio};`
      movie._id = `${movie._id}`;
      return movie;
    });

    // console.log(res)

    return { props: { movies } };
  } catch (error) {
    console.log(error);
  }
}
