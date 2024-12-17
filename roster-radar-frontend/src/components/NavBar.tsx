function NavBar () {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark rounded" aria-label="Eleventh navbar example">
        <div className="container-fluid">
            <a className="navbar-brand text-danger fw-bold"  href="#">Roster Radar</a>
            <button className="navbar-toggler bg-danger" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample09" aria-controls="navbarsExample09" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarsExample09">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                <a className="nav-link active text-danger" aria-current="page" href="#">Home</a>
                </li>
                <li className="nav-item">
                <a className="nav-link text-danger" href="#">Link</a>
                </li>
                <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle text-danger" href="#" data-bs-toggle="dropdown" aria-expanded="false">Dropdown</a>
                <ul className="dropdown-menu bg-dark">
                    <li><a className="dropdown-item text-danger " href="#">Action</a></li>
                    <li><a className="dropdown-item text-danger" href="#">Another action</a></li>
                    <li><a className="dropdown-item text-danger" href="#">Something else here</a></li>
                </ul>
                </li>
            </ul>
            <form role="search">
                <input className="form-control search-input" type="search" placeholder="Search" aria-label="Search"/>
            </form>
            </div>
        </div>
        </nav>
    </>
  )
}

export default NavBar