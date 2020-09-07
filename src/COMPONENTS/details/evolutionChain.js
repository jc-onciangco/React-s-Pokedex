import React, {useState, useEffect} from 'react';
import axios from 'axios';
import TitleBlock from './titleBlock.js';
import FirstPokemon from './EVOLUTION-PHASE/firstPokemon.js';
import SecondPokemon from './EVOLUTION-PHASE/secondPokemon.js';
import ThirdPokemon from './EVOLUTION-PHASE/thirdPokemon.js';

const EvolutionChain = ({evolutionChainUrl, color}) => {
    const [evolutionChain, setEvolutionChain] = useState(true);
    const pokemonColor = color;

    useEffect(() => {
        const url = evolutionChainUrl;
        axios.get(url)
            .then(res => {
                let chain = {
                    first: {
                        name: res.data.chain.species.name,
                        id: getImageId(res.data.chain.species.url)
                    },
                    second: res.data.chain.evolves_to? res.data.chain.evolves_to.map(pokemon => {return {name: pokemon.species.name, id: getImageId(pokemon.species.url)}}) : null,
                    third: res.data.chain.evolves_to.map(pokemon => {
                        return (pokemon.evolves_to? (
                            pokemon.evolves_to.map(pokemonLast => {
                                return {
                                    name: pokemonLast.species.name,
                                    id: getImageId(pokemonLast.species.url)
                                }
                            })
                        ):null)
                    })
                }
                let mod = {
                    ...chain,
                    third: chain.third[0].length? chain.third[0][0] : null
                }
                setEvolutionChain(mod)
            })
            .catch(err => console.log(err))
    },)

    const getImageId = (url) => {
        let withSlash = url.slice(42);
        let pokemonID = withSlash.slice(0,withSlash.search('/'));
        let pokemonIDString = (pokemonID>99)? pokemonID : (
            (pokemonID>9)? '0'+pokemonID.toString() : '00'+pokemonID.toString());
        return pokemonIDString;
    }

    // DYNAMIC STYLING
    const style = {

        firstPokemon: {
            backgroundColor: `${pokemonColor}`
        },
        secondPokemon: {
            gridTemplateColumns: evolutionChain.second? (evolutionChain.second.length===1? '1fr' : '1fr 1fr') : '1fr 1fr',
            gridGap: '25px',
            backgroundColor: pokemonColor,
            display: `${evolutionChain.second? 'grid' : 'none'}`
        },
        thirdPokemon: {
            backgroundColor: pokemonColor,
            display: `${evolutionChain.third? 'grid' : 'none'}`
        }
    }

    return (
        <div className="evolution-chain" >
            <TitleBlock title={'Evolution Chain'} />
            <div className="evolution-chain-wrapper">
                <FirstPokemon componentStyle={style} firstPokemon={evolutionChain.first} />
                <SecondPokemon componentStyle={style} secondPokemon={evolutionChain.second} />
                <ThirdPokemon componentStyle={style} thirdPokemon={evolutionChain.third} />
            </div>
        </div>
    )
}

export default EvolutionChain;
