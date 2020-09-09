import React from 'react';

const SecondPokemon = ({secondPokemon, componentStyle}) => {
    return (
        <div className="second-evolution-collection" style={componentStyle.secondPokemon}>
            {
                secondPokemon?
                (
                    secondPokemon.map(secondPokemon => {
                        return (
                            <div className="second evolution-phase" key={secondPokemon.id}>
                                <img className="evolution-pic" alt={secondPokemon.name} src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${secondPokemon.id}.png`} />
                                <div className="evolve-name" >{secondPokemon.name}</div>
                            </div>
                        )
                    })
                ):
                <></>
            }
        </div>
    )
}

export default SecondPokemon;