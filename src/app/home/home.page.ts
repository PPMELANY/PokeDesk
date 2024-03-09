import { Component } from '@angular/core';
import { PokeapiService } from './../Services/apiservice.service';
import { Firestore, doc, setDoc } from '@angular/fire/firestore'; // Importa Firestore

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  pokemonId: number | null = null;
  pokemonName: string = ''; // Inicializar pokemonName como una cadena vacía
  pokemonQuery: string = ''; // Para buscar por ID o nombre
  pokemon: any;
  pokemonByName: any;
  pokemonByQuery: any;

  constructor(private api: PokeapiService, private db: Firestore) {}

  getPokemonData() {
    try {
      if (this.pokemonId !== null) {
        this.api.getPokemonID(this.pokemonId).subscribe((response) => {
          this.pokemon = {
            name: response.name,
            imageUrl: response.sprites.front_default
          };
          // Llamar a guardarTipoPokemon aquí para garantizar que se ejecute después de obtener la respuesta
          this.guardarTipoPokemon(response);
        });
      } else {
        console.log('ID de Pokémon no válido');
      }
    } catch (error) {
      console.log(error);
    }
  }

  getPokemonDataByName() {
    try {
      if (this.pokemonName) {
        this.api.getPokemonByName(this.pokemonName.toLowerCase()).subscribe((response) => {
          this.pokemonByName = {
            name: response.name,
            imageUrl: response.sprites.front_default,
            id: response.id
          };
          // Llamar a guardarTipoPokemon aquí para garantizar que se ejecute después de obtener la respuesta
          this.guardarTipoPokemon(response);
        });
      } else {
        console.log('Nombre de Pokémon no válido');
      }
    } catch (error) {
      console.log(error);
    }
  }

  getPokemonDataByQuery() {
    try {
      if (this.pokemonQuery) {
        // Si la consulta es un número, buscar por ID
        if (!isNaN(Number(this.pokemonQuery))) {
          const id = parseInt(this.pokemonQuery);
          this.api.getPokemonID(id).subscribe((response) => {
            this.pokemonByQuery = {
              name: response.name,
              imageUrl: response.sprites.front_default,
              id: response.id
            };
            // Llamar a guardarTipoPokemon aquí para garantizar que se ejecute después de obtener la respuesta
            this.guardarTipoPokemon(response);
          });
        } else { // Si no, buscar por nombre
          this.api.getPokemonByName(this.pokemonQuery.toLowerCase()).subscribe((response) => {
            this.pokemonByQuery = {
              name: response.name,
              imageUrl: response.sprites.front_default,
              id: response.id
            };
            // Llamar a guardarTipoPokemon aquí para garantizar que se ejecute después de obtener la respuesta
            this.guardarTipoPokemon(response);
          });
        }
      } else {
        console.log('Consulta de Pokémon no válida');
      }
    } catch (error) {
      console.log(error);
    }
  }

  async guardarTipoPokemon(pokemonData: any) {
    try {
      const tipoPokemon = pokemonData.types[0].type.name;
      const pokemonDoc = doc(this.db, 'pokemones', 'pokemon');
      await setDoc(pokemonDoc, { tipo: tipoPokemon });
      console.log('Tipo de Pokémon guardado en Firestore.');
    } catch (error) {
      console.error('Error al guardar el tipo de Pokémon en Firestore: ', error);
    }
  }
}
