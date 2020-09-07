import React from 'react';
import DataBlock from './dataBlock.js';
import Abilities from './abilities.js';

const MajorStat = ({abilities, heightWeight, specie}) => {
    return (
        <div className="stat">
            <Abilities abilities={abilities}>
                <div className="ability stat-container">
                    <div className="title ability-title">Ability</div>
                    <div className="content">
                        {   
                            abilities? 
                            (abilities.map(ability => {
                                return(
                                    <p key={ability.ability.name}>
                                        {ability.ability.name}
                                        {ability.is_hidden? (<small className="hidden-ability">Hidden Ability</small>) : (<></>)}
                                    </p>
                                )
                            }))
                            :
                            (
                                <p>LOADING....</p>
                            )
                        }
                    </div>
                </div>
            </Abilities>  
            <DataBlock
                content={[{name: heightWeight.height}, {name: heightWeight.weight}]}
                titles={["height", "weight"]}
            />
            <DataBlock 
                content={specie.habitat}
                titles={["habitat"]}
            />
            <DataBlock 
                content={specie.egg_groups}
                titles={["egg-groups"]}
            />
            <DataBlock 
                content={specie.growth_rate}
                titles={["growth-rate"]}
            />
        </div> 
    )
}

export default MajorStat;