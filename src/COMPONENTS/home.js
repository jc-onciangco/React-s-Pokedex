import React, { useState, useEffect, useRef } from 'react';
import Pokemon from './pokemonList.js';
import axios from 'axios';
import './grid.css';

const nextPrev = {
    position: 'fixed',
    width: '98%',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    justifyContent: 'space-between',
}

const loader = {
    position: 'fixed',
    top: '0',
    left: '0',
    bottom: '0',
    width: '100%',
    zIndex: '-1',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}




const Home = (props) => {
    const [pokemonList, setpokemonList] = useState([]);
    const [currentPage, setCurrentPage] = useState('https://pokeapi.co/api/v2/pokemon');
    const [nextPage, setNextPage] = useState('');
    const [prevPage, setPrevPage] = useState('');
    const [loading, setLoading] = useState(true);
    const showRegionsRef = useRef();
    const regionsWrapper = useRef();
    const [currentRegion, setCurrentRegion] = useState('all');
    const [isRegionSelectedForTheFirstTime, setisRegionSelectedForTheFirstTime] = useState(false);
    const [regions] = useState([
        {name: 'all', url: 'https://pokeapi.co/api/v2/pokemon'},
        {name: 'kanto', url: 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=20'},
        {name: 'johto', url: 'https://pokeapi.co/api/v2/pokemon?offset=151&limit=20'},
        {name: 'hoenn', url: 'https://pokeapi.co/api/v2/pokemon?offset=251&limit=20'},
        {name: 'sinnoh', url: 'https://pokeapi.co/api/v2/pokemon?offset=386&limit=20'},
        {name: 'unova', url: 'https://pokeapi.co/api/v2/pokemon?offset=494&limit=20'},
        {name: 'kalos', url: 'https://pokeapi.co/api/v2/pokemon?offset=649&limit=20'},
        {name: 'alola', url: 'https://pokeapi.co/api/v2/pokemon?offset=721&limit=20'},
        {name: 'galar', url: 'https://pokeapi.co/api/v2/pokemon?offset=807&limit=20'},
    ])

    const next = {
        backgroundColor: '#E91E63',
        fontSize: '1.5rem',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        display: 'grid',
        placeItems: 'center',
        color: 'white',
        opacity: nextPage===null? '0' : '1'
    }
    
    const prev = {
        backgroundColor: '#E91E63',
        fontSize: '1.5rem',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        display: 'grid',
        placeItems: 'center',
        color: 'white',
        opacity: prevPage===null? '0' : '1'
    }


    useEffect(() => {
        setLoading(true)
        axios.get(currentPage)
                .then(res => {
                    setpokemonList(res.data.results.map(pokemon => { return { name: pokemon.name, url: pokemon.url, currentPage: currentPage}})); 
                    setNextPage(res.data.next);
                    setPrevPage(res.data.previous);
                    setLoading(false);
                    

                    if(currentRegion==='all') return;

                    if(!isRegionSelectedForTheFirstTime) {
                        if(regions.some(region => region.url === currentPage)) {
                            setPrevPage(null);
                            return 
                        }
                        return
                    }
                    setPrevPage(null);
                    setisRegionSelectedForTheFirstTime(false);
                });
    }, [currentPage, isRegionSelectedForTheFirstTime, currentRegion, regions]);

    const goToPage = (action) => {
        if(action==='next'){
            if(nextPage===null) return;
            setCurrentPage(nextPage);
        }
        else {
            if(prevPage===null) return;
            setCurrentPage(prevPage);
            console.log(currentPage);
        }
    } 

    const pokemonLists = loading? (
        <div style={loader} >
            <div className="preloader-wrapper big active">
                <div className="spinner-layer spinner-red-only">
                    <div className="circle-clipper left">
                        <div className="circle"></div>
                        </div><div className="gap-patch">
                        <div className="circle"></div>
                        </div><div className="circle-clipper right">
                        <div className="circle"></div>
                    </div>
                </div>
            </div>
        </div>
    ) : 
    (
        <div className="grid-list">
            {
                pokemonList.map((pokemon, index) => {
                    return (
                        <Pokemon pokemon={pokemon} index={index+1} key={pokemon.name} pathname={props.location.pathname}/>
                    )
                })
            }
        </div>
    )

    const showRegions = () => {
        showRegionsRef.current.classList.toggle('show-regions');
        regionsWrapper.current.classList.toggle('show-regions-wrapper');
    }

    const selectRegion = (regionName) => {
        showRegions();
        regions.forEach((region) => {
            if(region.name === regionName) {
                setCurrentPage(region.url);
                setCurrentRegion(regionName);
                setisRegionSelectedForTheFirstTime(true);
            }
        })
    }

    return (
        <>
            <div className="inner-container">
                <div className="select-region">
                    <div className="selected-value-wrapper">
                        <div className="selected-value">{currentRegion}</div>
                        <div onClick={showRegions} className="caret">
                            <i className="fas fa-angle-down"></i>
                        </div>
                    </div>
                    <div className="regions" ref={regionsWrapper}>
                        <div className="board" ref={showRegionsRef}>
                            {
                                regions.map(region => {
                                    return (
                                        <div className="region" onClick={() => {selectRegion(region.name)}} key={region.name}>
                                            <span className="region-name">{region.name}</span>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <p className="region-label">Region</p>
                    {
                      pokemonLists
                    }
            </div>
            <div style={nextPrev}>
                <div onClick={() => {goToPage('prev')}} style={prev} className="z-depth-2">
                    <i className="fas fa-arrow-left"></i>
                </div>
                <div onClick={() => {goToPage('next')}} style={next} className="z-depth-2">
                    <i className="fas fa-arrow-right"></i>
                </div>
            </div>
        </>
    )
}

export default Home;