function NavBar () {
  return (
    <>
      <nav id="home" className="navbar navbar-expand-lg bg-dark rounded" aria-label="Eleventh navbar example">
        <div className="container-fluid">
            <a className="navbar-brand text-danger fw-bold"  href="#home">Roster Radar</a>
            <button className="navbar-toggler bg-danger" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample09" aria-controls="navbarsExample09" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarsExample09">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                <a className="nav-link active text-danger" aria-current="page" href="#">Players</a>
                </li>
                <li className="nav-item">
                <a className="nav-link text-danger" href="#">Teams</a>
                </li>
                <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle text-danger" href="#" data-bs-toggle="dropdown" aria-expanded="false">Other</a>
                <ul className="dropdown-menu bg-dark">
                    <li><a className="dropdown-item text-danger " href="https://www.basketball-reference.com/">Basketball Reference</a></li>
                    <li><a className="dropdown-item text-danger" href="https://www.espn.com/fantasy/mens-basketball/">ESPN Fantasy</a></li>
                    <li><a className="dropdown-item text-danger" href="https://x.com/NBA">NBA Twitter</a></li>
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