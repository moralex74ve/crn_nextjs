import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { useState } from "react";

const Form = ({ formData, forNewMovie = true }) => {
  const router = useRouter();

  const [form, setForm] = useState({
    nombre: formData.nombre,
    apellido: formData.apellido,
    cedula: formData.cedula,
    nacio: formData.nacio,
    mail: formData.mail,
    direccion: formData.direccion,
    tel1: formData.tel1,
    tel2: formData.tel2,
    status:formData.status,
    listado:formData.listado,
    nota:formData.nota
});

 
  const [message, setMenssage] = useState([]);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (forNewMovie) {
      postData(form);
    } else {
      // editar data
      putData(form);
    }
  };

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
     // console.log(data);

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

  const postData = async (form) => {
    try {
      console.log(form);
      const res = await fetch("/api/oveja", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      console.log(data);

      if (!data.success) {
        for (const key in data.error.errors) {
          let error = data.error.errors[key];
          setMenssage((oldmenssage) => [
            ...oldmenssage,
            { message: error.message },
          ]);
        }
      } else {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="form-control my-2"
        type="text"
        placeholder="Nombre"
        autoComplete="off"
        name="nombre"
        value={form.nombre}
        onChange={handleChange}
      />
      <input
        className="form-control my-2"
        type="text"
        placeholder="Apellido"
        autoComplete="off"
        name="apellido"
        value={form.apellido}
        onChange={handleChange}
      />
      
      <input
        className="form-control my-2"
        type="text"
        placeholder="Cedula"
        autoComplete="off"
        name="cedula"
        value={form.cedula}
        onChange={handleChange}
      />
      <input
        className="form-control my-2"
        type="text"
        placeholder="Celular"
        autoComplete="off"
        name="tel2"
        value={form.tel2}
        onChange={handleChange}
      />
      <input
        className="form-control my-2"
        type="text"
        placeholder="Telefono Otro"
        autoComplete="off"
        name="tel1"
        value={form.tel1}
        onChange={handleChange}
      />
      <input
        className="form-control my-2"
        type="text"
        placeholder="Plot"
        autoComplete="off"
        name="nacio"
        value={form.nacio}
        onChange={handleChange}
      />
      <input
        className="form-control my-2"
        type="text"
        placeholder="Plot"
        autoComplete="off"
        name="mail"
        value={form.mail}
        onChange={handleChange}
      />
      <input
        className="form-control my-2"
        type="text"
        placeholder="Plot"
        autoComplete="off"
        name="direccion"
        value={form.direccion}
        onChange={handleChange}
      />
      
      
      <input
        className="form-control my-2"
        type="text"
        placeholder="Plot"
        autoComplete="off"
        name="nota"
        value={form.nota}
        onChange={handleChange}
      />
      <input
        className="form-control my-2"
        type="text"
        placeholder="Plot"
        autoComplete="off"
        name="status"
        value={form.status}
        onChange={handleChange}
      />
      <input
        className="form-control my-2"
        type="text"
        placeholder="Plot"
        autoComplete="off"
        name="listado"
        value={form.listado}
        onChange={handleChange}
      />
      <button className="btn btn-primary w-100" type="submit">
        {forNewMovie ? "Agregar" : "Editar"}
      </button>
      <Link href="/">
        <a className="btn btn-warning w-100 my-2">Volver...</a>
      </Link>
      {message.map(({ message }) => (
        <p key={message}>{message}</p>
      ))}
    </form>
  );
};

export default Form;
