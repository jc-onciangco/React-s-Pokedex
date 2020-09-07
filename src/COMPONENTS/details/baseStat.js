import React from 'react';
import TitleBlock from './titleBlock.js';

const BaseStat = ({pokemonData, color}) => {
    const style = {
        statusBackGround: {
            backgroundColor: `${color ?? "#4E5665"}`,
            color: `${color==='white' || color==='yellow'? "black":  "white"}`
        },
        valueBorder: {
            border: `2px solid ${color ?? "#4E5665"}`,
            backgroundColor: `${color==='white'? "#eee":  "white"}`
        }
    }

    return (
        <div className="base-stat">
            <TitleBlock title={'Base Stat'} />
            <div className="base-stat-wrapper">
                {
                    pokemonData.stats? 
                    (
                        pokemonData.stats.map(stat => {
                            return (
                                <div className="base-stat-name" key={stat.stat.name}>
                                    <div className="status" style={style.statusBackGround}>{stat.stat.name}</div>
                                    <div className="value" style={style.valueBorder}>{stat.base_stat}</div>
                                </div>
                            )
                        })
                    ):
                    (
                        <p>Loading...</p>
                    )
                }
            </div>
        </div>
    )
}

export default BaseStat;