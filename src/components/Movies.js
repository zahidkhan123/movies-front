import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchMovies } from '../api';
import Pagination from './Pagination';
import logout from '../images/logout.svg';
import dummy from '../images/movie.svg';
import add_circle from '../images/add_circle.svg';
import footer from '../images/fotter.svg'
import './Movies.css';

const Movies = () => {
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        const loadMovies = async () => {
            try {
                const res = await fetchMovies(currentPage, 8);
                setMovies(res.data.movies);
                setTotalPages(res.data.totalPages);
            } catch (error) {
                console.error('Failed to fetch movies:', error);
            }
        };

        loadMovies();
    }, [currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/')
    }

    return (
        <div>
            <div className="position bg-dark w-100 h-auto d-flex flex-column">
                <div className="movies">
                    <div
                        className="text-white w-100 d-flex justify-content-between movie-header"
                    >
                        <div className="d-flex gap-2 align-items-center">
                            <h2>My movies</h2>
                            <img src={add_circle} alt="" onClick={() => navigate('/add-movie')} />
                        </div>
                        <div className="d-flex gap-2 align-items-center" onClick={handleLogout}>
                            <h3>Logout</h3>
                            <img src={logout} alt=""/>
                        </div>
                    </div>
                    <div className="movie-list d-flex flex-wrap">
                        {movies.map((movie) => {
                            return (
                                <div className="text-white">
                                    <img src={movie.poster} alt="" />
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <h4 className="mt-3">{movie.title}</h4>
                                            <h5 className="mt-3">{movie.year}</h5>
                                        </div>
                                        <button className="edit" onClick={() => navigate(`/edit-movie/${movie.id}`)}>Edit</button>
                                    </div>
                                </div>
                            )
                        })}

                    </div>
                </div>
                <Pagination
                    className="movie-list-fotter text-white d-flex justify-content-center"
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
                <div className="d-flex align-items-end fotter w-100">
                    <img src={footer} alt="" class="w-100" />
                </div>
            </div>
        </div>
    );
};

export default Movies;
