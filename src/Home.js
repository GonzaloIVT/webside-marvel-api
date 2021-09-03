import React, { useEffect, useState } from 'react';
import md5 from 'md5';
import './Home.css';

const Home = () => {

    const [characters, setCharacters] = useState(null);
    const [comics, setComics] = useState(null);
    const [active, setActive] = useState(0);
    const [hash] = useState(md5(1 + process.env.REACT_APP_PRIVATE_KEY + process.env.REACT_APP_PUBLIC_KEY));
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        // componentDidMound o Renderizado del Componente
        getCharacters();
        getComics();

    }, [])

    const getCharacters = (offset = 0, limit = 20) => {
        fetch(`${process.env.REACT_APP_API_URL}/v1/public/characters?ts=1&apikey=${process.env.REACT_APP_PUBLIC_KEY}&hash=${hash}&limit=${limit}&offset=${offset}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setCharacters(data);
            });
    }

    const getComics = () => {
        fetch(`${process.env.REACT_APP_API_URL}/v1/public/comics?ts=1&apikey=${process.env.REACT_APP_PUBLIC_KEY}&hash=${hash}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setComics(data);
            });
    }
    // [10,11,12,13,14,15,16,17,18,19]
    // Math.floor 1.6 => 1
    // Math.ceil 1.3 => 2
    // Math.round 1.3 => 1 // 1.4 => 2

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h1>Home</h1>
                </div>
                <div className="col-md-12">
                    {
                        !!characters &&
                        "total paginas: " + Math.ceil(characters.data.total / characters.data.limit)
                    }
                </div>
                <div className="col-md-12">
                    <nav aria-label="Page navigation example">
                        <ul className="pagination">
                            <li className="page-item">
                                <a className="page-link active" href="#">
                                    Previous
                                </a>
                            </li>
                            <li className={"page-item " + (active === 0 ? " active" : "")}>
                                <a className="page-link" href="#" onClick={(e) => {
                                    e.preventDefault();
                                    getCharacters(0 * characters.data.limit);
                                    setActive(0);
                                }}>
                                    1
                                </a>
                            </li>
                            <li className={"page-item" + (active === 1 ? " active" : "")}>
                                <a className="page-link" href="#" onClick={(e) => {
                                    e.preventDefault();
                                    getCharacters(1 * characters.data.limit);
                                    setActive(1);
                                }}>
                                    2
                                </a>
                            </li>
                            <li className={"page-item" + (active === 2 ? " active" : "")}>
                                <a className="page-link" href="#" onClick={(e) => {
                                    e.preventDefault();
                                    getCharacters(2 * characters.data.limit);
                                    setActive(2);
                                }}>
                                    3
                                </a>
                            </li>
                            <li className={"page-item" + (active === 3 ? " active" : "")}>
                                <a className="page-link" href="#" onClick={(e) => {
                                    e.preventDefault();
                                    getCharacters(3 * characters.data.limit);
                                    setActive(3);
                                }}>
                                    4
                                </a>
                            </li>
                            <li className={"page-item" + (active === 4 ? " active" : "")}>
                                <a className="page-link" href="#" onClick={(e) => {
                                    e.preventDefault();
                                    getCharacters(4 * characters.data.limit);
                                    setActive(4);
                                }}>
                                    5
                                </a>
                            </li>
                            <li className="page-item">
                                <a className="page-link" href="#">
                                    Next
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            <div className="row">
                <div className="col-md-8 offset-md-2 py-5">
                    {
                        !!selected && (
                            <div className="card detail">
                                <img src={`${selected.thumbnail.path}.${selected.thumbnail.extension}`} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">{selected.name}</h5>
                                    <p className="card-text">
                                        {selected.description}
                                    </p>
                                </div>
                                <div className="card-footer">
                                    <button className="btn btn-danger btn-sm float-end" onClick={() => setSelected(null)}>Close</button>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
            <div className="row">
                {
                    characters === null ? (
                        <div className="spinner-grow text-secondary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    ) :
                        !!characters &&
                        characters.data.results.map((character, index) => {
                            const { name, description, thumbnail } = character;
                            const { path, extension } = thumbnail;
                            return (
                                <div className="col-md-6" key={index}>
                                    <div className="card mb-3 info">
                                        <div className="row g-0">
                                            <div className="col-md-4">
                                                <img src={`${path}.${extension}`} className="rounded-start" alt="..." />
                                            </div>
                                            <div className="col-md-8">
                                                <div className="card-body">
                                                    <h5 className="card-title">{name}</h5>
                                                    <p className="card-text">
                                                        {description}
                                                    </p>
                                                    <p className="card-text">
                                                        <small className="text-muted">Last updated 3 mins ago</small>
                                                    </p>
                                                    <button className="btn btn-outline-success" onClick={() => setSelected(character)}>
                                                        Show Detail
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                }
            </div>
        </div>
    )
}

export default Home;