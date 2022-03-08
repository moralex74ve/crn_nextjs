import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import Head from "next/head";
import React, { useState } from 'react';

const Datos = ({movies}) => {
return(
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
)
}
export default Datos;