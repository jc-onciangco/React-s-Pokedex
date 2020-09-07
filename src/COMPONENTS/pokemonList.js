import React, {useState, useEffect, useRef} from 'react';
import PokemonType from './pokemonType.js';
import axios from 'axios';
import pokeball from '../pokeball.png';
import '../pokemonCard.css';
import { Link } from 'react-router-dom';

// const spriteContainer = {
//     width: '100%',
//     minHeight: '150px',
//     // backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url(${pokeball})`,
//     // backgroundSize: 'cover',
//     // backgroundPosition: 'center',
//     borderRadius: '5px',
//     position: 'relative',
//     border: '2px solid #4E5665',
//     backgroundColor: 'white'
// }

// var spriteImage = {
//     width: '100%',
//     height: '100%',
//     borderRadius: '5px',
//     transition: '0.5s ease-in',
//     // filter: 'contrast(0%) brightness(50%)'
// }

// const pokeballIcon = {
//     position: 'absolute',
//     top: '0',
//     left: '0',
//     height: '100%',
//     width: '100%',
//     opacity: '0.2'
// }

// const pokemonIndex = {
//     height: '30px',
//     width: '30px',
//     borderRadius: '50%',
//     backgroundColor: '#4E5665',
//     color: 'white',
//     position: 'absolute',
//     top: '0',
//     right: '0',
//     transform: 'translate(50%, -50%)',
//     display: 'grid',
//     placeItems: 'center',
//     fontWeight: 'bold',
//     zIndex: '5'
// }

// const cardDetails = {
//     width: '100%',
//     height: '100%',
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'space-between',
//     position: 'relative'
// }

// const pokemonName = {
//     backgroundColor: '#4E5665',
//     display: 'grid',
//     placeItems: 'center',
//     fontWeight: 'bold',
//     color: 'white',
//     position: 'absolute',
//     top: '0',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     padding: '2px 10px',
//     borderRadius: '5px',
//     whiteSpace: 'nowrap',
//     textTransform: 'capitalize'
// }

// const pokemonType = {
//     backgroundColor: 'green',
//     display: 'flex',
//     fontWeight: 'bold',
//     color: 'white',
//     position: 'absolute',
//     bottom: '0',
//     width: '100%'
// }


const PokemonList = ({pokemon, index, pathname}) => {
    const [sprite, setSprite] = useState({});
    const [types, setTypes] = useState([]);
    const spriteRef = useRef();

    useEffect(() => {
        axios.get(pokemon.url)
            .then(res => {
                setSprite({sprite: `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${newOrder}.png`, order: res.data.order});
                setTypes( res.data.types.map(type => { return {name: type.type.name, url: type.type.url}}));
            });
    }, [])

    let order = pokemon.currentPage.slice(pokemon.currentPage.search('offset')+7);
    let removedOrder = order.slice(0,order.search('&'));
    let finalOrder = (pokemon.currentPage==='https://pokeapi.co/api/v2/pokemon')? 0 : removedOrder;
    let pokemonOrderVersionOne = parseInt(finalOrder)+index;
    let pokemonOrderVersionTwo = (pokemonOrderVersionOne>99)? pokemonOrderVersionOne : (
        (pokemonOrderVersionOne>9)? '0'+pokemonOrderVersionOne.toString() : '00'+pokemonOrderVersionOne.toString()
    );
    let newOrder = parseInt(pokemonOrderVersionTwo)>806? (parseInt(pokemonOrderVersionTwo)+2).toString() : pokemonOrderVersionTwo;
    
    return (
        <div className="pokemon-card">
            <Link to={`/pokemon/${pokemon.name}-${pokemonOrderVersionTwo}`}>
                <div className="sprite-container">
                    <img alt="img" src={pokeball} className="pokeball-icon" />
                    <img    ref={spriteRef}
                            src={sprite.sprite} 
                            alt={pokemon.name}
                            className="pokemon-icon" />
                    <div className="pokemon-index">
                        {index}
                    </div>
                </div>
            </Link>
            <div className="card-details">
                <Link to="/pokemon">
                    <div className="pokemon-name">
                        <p>{pokemon.name}</p>
                    </div>
                </Link>
                <div className="pokemon-type">
                    {
                        types.map((type, index) => {
                            return (
                                <PokemonType type={type} key={index} pathname={pathname}/>
                            )
                        })
                    }
                </div>  
            </div>  
        </div>
    )
}

export default PokemonList;