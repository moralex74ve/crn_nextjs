import Link from "next/link";

const Nav=() =>{
    return(
        <div className="container">
            <nav className="navbar navbar-dark bg-primary">
            <div className="container-fluid">
                <Link href="/">
                    <a className="btn btn-success btn-sm">Home</a>
                </Link>
                <div className="d-none d-sm-none d-md-block">
                   <div className="card">
                        <div className="card-header text-center">
                            <h7 className="text-center" >Centro de Adiestramiento Cristiano</h7>
                            <h4 className="text-center" >Comunidad del Rey a las Naciones</h4>
                        </div>
                   </div> 
                    
                </div>
                <div className="d-block d-sm-block d-md-none">
                    <h9 className="text-center text-white" >Centro de Adiestramiento Cristiano</h9>
                    <h6 className="text-center text-white" >Comunidad del Rey a las Naciones</h6>
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