import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchMovieById, createMovie, updateMovie } from '../api';

const AddEditMovie = () => {
    const [title, setTitle] = useState('');
    const [year, setYear] = useState('');
    const [poster, setPoster] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            const loadMovie = async () => {
                try {
                    const res = await fetchMovieById(id);
                    setTitle(res.data.movie.title);
                    setYear(res.data.movie.year);
                    setPoster(res.data.movie.poster);
                } catch (error) {
                    console.error('Failed to fetch movie:', error);
                }
            };

            loadMovie();
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const movieData = { title, year, poster };

        try {
            if (id) {
                await updateMovie(id, movieData);
            } else {
                await createMovie(movieData);
            }
            navigate('/movies');
        } catch (error) {
            console.error('Error saving movie:', error);
        }
    };

    return (
        <div>
            <div className="p-0 bg-dark position w-100 h-auto d-flex flex-column">
                <div className="text-white create-movie">
                    <form onSubmit={handleSubmit}>
                        <h1>{id ? 'Edit Movie' : 'Add Movie'}</h1>
                        <div className="d-flex inputs">
                            <div className="drop-image d-flex flex-column justify-content-center align-items-center">

                                <input
                                    type="file"
                                    multiple
                                    onChange={(e) => setPoster(e.target.files[0])}
                                    required={id ? false : true}
                                />
                            </div>
                            <div className="d-flex flex-column gap-4">
                                <input
                                    type="text"
                                    placeholder="Title"
                                    className='title text-white'
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                                <input
                                    type="number"
                                    placeholder="Year"
                                    className='year text-white'
                                    value={year}
                                    onChange={(e) => setYear(e.target.value)}
                                    required
                                />
                                <div className="">
                                    <button onClick={() => navigate(`/movies`)}>Cancel</button>
                                    <button className="ms-2" type='submit' id='submit'>Submit</button>
                                </div>
                            </div>
                        </div>
                        </form>
                </div>
            
            <div className="d-flex align-items-end fotter w-100">
                <img src="image/fotter.svg" alt="" className="w-100" />
            </div>
        </div>
            
        </div >
    );
};

export default AddEditMovie;
