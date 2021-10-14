import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import PokemonList from './components/PokemonList';
import AddFavourites from './components/AddFavourites';
import RemoveFavourites from './components/RemoveFavourites';
import MainNav from './layout/MainNav';
import { Route, Switch } from 'react-router';
import PokemonDetail from './components/PokemonDetail';
import { Modal } from 'react-bootstrap';
import Favorites from './components/Favorites';
import Button from 'react-bootstrap';
import Footer from './layout/Footer';

const App = () => {
	const [favourites, setFavourites] = useState([]);

	useEffect(() => {
		const pokemonFavourites = JSON.parse(
			localStorage.getItem('react-pokemon-app-favourites')
		);

		if (pokemonFavourites) {
			setFavourites(pokemonFavourites);
		}
	}, []);

	const saveToLocalStorage = (items) => {
		localStorage.setItem('react-pokemon-app-favourites', JSON.stringify(items));
	};

	const addFavouritePokemon = (pokemon) => {
		const newFavouriteList = [...favourites, pokemon];
		setFavourites(newFavouriteList);
		saveToLocalStorage(newFavouriteList);
	};

	const removeFavouritePokemon = (pokemon) => {
		const newFavouriteList = favourites.filter(
			(favourite) => favourite.name !== pokemon.name
		);

		setFavourites(newFavouriteList);
		saveToLocalStorage(newFavouriteList);
	};

	return (
		<div className="main-bg">
			<div className="footer-bg">
				<div className="container">
					<MainNav/>
				</div>
			</div>
			<div className='container'>				
				<div className='row'>						
				 					
					<Switch>
						<Route path="/" component={PokemonList} exact/>
						<Route path="/favorites" component={Favorites} exact/>
						<Route path="/pokemon/:id" component={PokemonDetail} />	
					</Switch>	
						{/* <PokemonDetail/>					 */}
								
								{/* <PokemonList
									pokemons={favourites}
									handleFavouritesClick={removeFavouritePokemon}
									favouriteComponent={RemoveFavourites}
								/> */}					
				
				</div>											
			</div>
			<div className="row footer-bg">
				<div className="container">
				<Footer/>
				</div>
			</div>
		</div>
		
	);
};

export default App;
