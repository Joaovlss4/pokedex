import React from 'react';
import { Pokemon } from '../types';

const typeColors = {
  normal: 'bg-gray-400',
  fire: 'bg-red-500',
  water: 'bg-blue-500',
  electric: 'bg-yellow-400',
  grass: 'bg-green-500',
  ice: 'bg-blue-300',
  fighting: 'bg-red-600',
  poison: 'bg-purple-500',
  ground: 'bg-yellow-600',
  flying: 'bg-indigo-400',
  psychic: 'bg-pink-500',
  bug: 'bg-green-400',
  rock: 'bg-yellow-800',
  ghost: 'bg-purple-600',
  dragon: 'bg-indigo-600',
  dark: 'bg-gray-800',
  steel: 'bg-gray-500',
  fairy: 'bg-pink-400',
};

interface PokemonCardProps {
  pokemon: Pokemon;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-200">
      <div className="p-8">
        <img
          src={pokemon.sprites.other['official-artwork'].front_default}
          alt={pokemon.name}
          className="w-full h-64 object-contain"
        />
        <div className="mt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold capitalize text-gray-900 dark:text-white">
              {pokemon.name}
            </h2>
            <span className="text-xl text-gray-600 dark:text-gray-400">
              #{pokemon.id.toString().padStart(3, '0')}
            </span>
          </div>
          <div className="mt-4 flex gap-3">
            {pokemon.types.map(({ type }) => (
              <span
                key={type.name}
                className={`${
                  typeColors[type.name as keyof typeof typeColors]
                } px-4 py-2 rounded-full text-white text-base capitalize`}
              >
                {type.name}
              </span>
            ))}
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="text-base text-gray-600 dark:text-gray-400">
              <span className="font-semibold">Height:</span> {pokemon.height / 10}m
            </div>
            <div className="text-base text-gray-600 dark:text-gray-400">
              <span className="font-semibold">Weight:</span> {pokemon.weight / 10}kg
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;