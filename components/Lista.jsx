import Link from "next/link";
import React, { useState } from 'react';

const Datos = ({movies}) => {
return(
    <div>
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
                <a className="btn btn-success btn-xs fst-italic">Más info...</a>
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