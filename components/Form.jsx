import { Checkbox } from "@material-ui/core";
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
  const deleteData = async (form) => {
    let result = confirm(
      "Este Registro sera Eliminado y no hay forma de recuperarlo...\nEsta Seguro...\nPresione Cancelar para Salir"
    );
    if (result == true) {
      setMenssage([]);
      const { id } = router.query;
      try {
        await fetch(`/api/oveja/${id}`, {
          method: "DELETE",
        });
        router.push("/");
      } catch (error) {
        console.log(error);
      }

      
    } else {
      router.push("/");
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
    <>
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
          autoComplete="off"
          name="tel2"
          value={form.tel2}
          placeholder="0424-1234567"
          pattern="[0-9]{4}-[0-9]{7}"
          onChange={handleChange}
        />
        <input
          className="form-control my-2"
          type="text"
          placeholder="0424-1234567"
          pattern="[0-9]{4}-[0-9]{7}"
          autoComplete="off"
          name="tel1"
          value={form.tel1}
          onChange={handleChange}
        />
        <input
          className="form-control my-2"
          type="date"
          placeholder="Fecha de Nacimiento"
          autoComplete="off"
          name="nacio"
          value={form.nacio}
          onChange={handleChange}
        />
        <input
          className="form-control my-2"
          type="text"
          placeholder="E-mail"
          autoComplete="off"
          name="mail"
          value={form.mail}
          onChange={handleChange}
        />
        <input
          className="form-control my-2"
          type="text"
          placeholder="Direccion"
          autoComplete="off"
          name="direccion"
          value={form.direccion}
          onChange={handleChange}
        />
        <input
          className="form-control my-2"
          type="text"
          placeholder="Notas Adicionales"
          autoComplete="off"
          name="nota"
          value={form.nota}
          onChange={handleChange}
        />
        <div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              name="status"
              id="exampleRadios1"
              defaultValue="option1"
              value={form.status ? true : false}
              checked={form.status ? true : false}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="exampleRadios1">
              Activo
            </label>
          </div>
        </div>

        <input
          className="form-control my-2"
          type="text"
          placeholder="Status"
          autoComplete="off"
          name="status2"
          value={form.status}
          onChange={handleChange}
        />

        <input
          className="form-control my-2"
          type="text"
          placeholder="Listado"
          autoComplete="off"
          name="listado"
          value={form.listado}
          onChange={handleChange}
        />
        <Link href="/">
          <a className="btn btn-warning w-100 my-2">Volver...</a>
        </Link>
        <div className="text-center">
          <button className="btn btn-primary w-50" type="submit">
            {forNewMovie ? "Agregar" : "Guardar Cambios"}
          </button>
          {!forNewMovie ? (
            <button
              className="btn btn-danger w-50"
              onClick={() => deleteData(form._id)}
            >
              Eliminar
            </button>
          ) : (
            ""
          )}
        </div>

        {message.map(({ message }) => (
          <p key={message}>{message}</p>
        ))}
      </form>
    </>
  );
};

export default Form;
