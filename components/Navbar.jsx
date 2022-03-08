import Link from "next/link";

const Nav=() =>{
    return(
        <div className="container">
            <nav className="navbar navbar-dark bg-primary">
            <div className="container-fluid">
                <Link href="/">
                    <a className="btn btn-success btn-sm">Home</a>
                </Link>
                <div className="card">
                    <div className="card-header">
                        <h6 className="text-center" >Centro de Adiestramiento Cristiano</h6>
                        <h3 className="text-center" >Comunidad del Rey a las Naciones</h3>
                    </div>
                </div>
                
                <Link href="/new">
                    <a className="btn btn-success btn-sm d-flex">Agregar Nuevo</a>
                </Link>
                
                
            </div>
            </nav>
        </div>
    );
}
export default Nav;