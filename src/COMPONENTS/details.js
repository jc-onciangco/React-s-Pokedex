import React, {useState, useEffect} from 'react';
import axios from 'axios';
import '../pokemonDetails.css';
import '../details.css';
import pokeball from '../pokeball.png';
import PokemonType from './pokemonType.js';
import EvolutionChain from './details/evolutionChain.js';
import BaseStat from './details/baseStat.js';
import MajorStat from './details/majorStat.js';

const Details = ({pokemonMainDetails, loading}) => {
    const [specie,setSpecie] = useState({});
    const [pokemonData, setPokemonData] = useState({});


    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon-species/${parseInt(pokemonMainDetails.id)}`)
            .then(res => {
                setSpecie({
                    habitat: [res.data.habitat? res.data.habitat : 'N/A'],
                    egg_groups: res.data.egg_groups.map(egg => egg),
                    growth_rate: [res.data.growth_rate],
                    color: res.data.color.name,
                    evolution_chain_url: res.data.evolution_chain.url
                });
                console.log(specie)
            })
            .catch(err => {
                console.log(err);
            })

        axios.get(`https://pokeapi.co/api/v2/pokemon/${parseInt(pokemonMainDetails.id)}`)
            .then(res => {
                setPokemonData(res.data);
                console.log(specie.color);
            })
            .catch(err => {
                console.log(err);
            })    
    }, [loading, pokemonMainDetails, specie]);


   const borderColor = {
       border: `5px solid ${specie.color ?? 'black'}`
   }

    return (
        <div className="details-wrapper">
            <div className="name-specie-wrapper">
                <div className="name-specie">
                    <img alt="pokeball-icon" className="pokeball-icons" src={pokeball} height="50%"/>
                    <div className="specie-wrapper">
                        <p className="name">{pokemonMainDetails.name}</p>
                        <p className="specie">{pokemonMainDetails.id}</p>
                    </div>
                    <img alt="pokeball-icon" className="pokeball-icons" src={pokeball} height="50%"/>
                </div>
            </div>

            <div className="pokemon-image">
                <div className="pic-wrapper" style={borderColor}>
                    {
                        loading? (
                            <img alt="pokeball-loading" src={pokeball} className="pokeball-bounce" />
                        ) : 
                        (<img alt="pokemon" className="pic" src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokemonMainDetails.id}.png`} />)
                    }
                </div>
                <div className="types">
                    {
                        pokemonData.types?
                        (
                            pokemonData.types.map((type, index) => {
                                return(
                                    <PokemonType type={type.type} key={index} className="type"/>
                                )
                            })
                        )
                        :
                        (
                            <p>LOADING....</p>
                        )
                    }
                    
                </div>  
            </div>  
            <MajorStat
                abilities={pokemonData.abilities} 
                heightWeight={{height: pokemonData.height, weight: pokemonData.weight}}
                specie={specie}
            />      
            
            <BaseStat   
                pokemonData={pokemonData} 
                color={specie.color}
            />
           
            <EvolutionChain
                evolutionChainUrl={specie.evolution_chain_url} 
                color={specie.color}
            />
        </div>
    )
}

export default Details;
