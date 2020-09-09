import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Details from './details.js';
import '../pokemonDetails.css';
import '../pokemonPage.css';
import {Link} from 'react-router-dom';

const Pokemon = ({match}) => {
    const {pokemon, id} = match.params;
    const [prevPokemon, setPrevPokemon] = useState({});
    const [nextPokemon, setNextPokemon] = useState({});
    const [loading, setLoading] = useState(false);

    let idNumberPrev = parseInt(id) - 1;
    let prevPokemonIdString = (idNumberPrev>99)? idNumberPrev : (
        (idNumberPrev>9)? '0'+idNumberPrev.toString() : '00'+idNumberPrev.toString()
    );

    let idNumberNext = parseInt(id) + 1;
    let nextPokemonIdString = (idNumberNext>99)? idNumberNext : (
        (idNumberNext>9)? '0'+idNumberNext.toString() : '00'+idNumberNext.toString()
    );

    useEffect(() => {
        setLoading(true);
        if(id!=="001") {
            axios.get(`https://pokeapi.co/api/v2/pokemon/${idNumberPrev}`)
            .then(res => {
                setPrevPokemon({name: res.data.name, id: prevPokemonIdString});
                setLoading(false);
            });
        }

        axios.get(`https://pokeapi.co/api/v2/pokemon/${idNumberNext}`)
        .then(res => {
            setNextPokemon({name: res.data.name, id: nextPokemonIdString});
            setLoading(false);
        });
    }, [match, id, idNumberNext, idNumberPrev, nextPokemonIdString, prevPokemonIdString]);

    return (
        <div>
           <div className="details-container">
                <div className="pokemon-navigation">
                    <div className="prev-wrapper">
                        {
                            id==="001"? (<></>):
                            (
                                <div className="prev-btn">
                                    <Link to={`/pokemon/${prevPokemon.name}-${prevPokemon.id}`}>
                                        <div className="prev-image-wrapper">
                                            <img alt="img" src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${prevPokemon.id}.png`} className="prev-image" width="100%" />
                                        </div>
                                    </Link>
                                    <div className="prev-order">{prevPokemon.id ?? 'LOADING...'}</div>
                                    <Link to={`/pokemon/${prevPokemon.name}-${prevPokemon.id}`}>
                                        <div className="prev-name">{prevPokemon.name ?? 'LOADING...'}</div>
                                    </Link>
                                </div>
                            )
                        }
                    </div>
                    <Details pokemonMainDetails={{name: pokemon, id: id}} loading={loading}/>
                    <div className="next-wrapper">
                        <div className="next-btn">
                            <Link to={`/pokemon/${nextPokemon.name}-${nextPokemon.id}`}>
                                <div className="next-image-wrapper">
                                    <img alt="img" src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${nextPokemon.id}.png`} className="next-image" width="75px" />
                                </div>
                            </Link>
                            <Link to={`/pokemon/${nextPokemon.name}-${nextPokemon.id}`}>
                                <div className="next-name">{nextPokemon.name}</div>
                            </Link>
                            <div className="next-order">{nextPokemon.id}</div>
                        </div>
                    </div>
                </div>
           </div>
        </div>
    )
}


export default Pokemon;
