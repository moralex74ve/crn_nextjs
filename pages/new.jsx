import Form from "../components/Form";
import { getSession } from "next-auth/react";

const New = ({seccion}) => {
  const formData = {
    nombre: "",
    apellido: "",
    cedula: "",
    nacio: "",
    mail: "",
    direccion: "",
    tel1: "",
    tel2: "",
    status: true,
    listado: false,
    nota: ""
  };

  return (
    <div className="container">
      <h1 className="my-3 text-center">Agregar Hermano</h1>
      <Form formData={formData} />
    </div>
  );
};


export async function getServerSideProps(ctx) {
  
    const seccion = await getSession(ctx);
    if (!seccion)
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
        
      };
      
    return { props: {seccion} };
    }
export default New;