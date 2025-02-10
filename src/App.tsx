import { useState, useEffect } from 'react';
import { Moon, Sun, Search, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import PokemonCard from './components/PokemonCard';
import { Pokemon } from './types';
import './index.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const pokemonPerPage = 1;

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
        const data = await response.json();
        
        const pokemonDetails = await Promise.all(
          data.results.map(async (pokemon: { url: string }) => {
            const res = await fetch(pokemon.url);
            return res.json();
          })
        );
        
        // Sort Pokemon by ID to ensure Bulbasaur (#001) is first
        const sortedPokemon = pokemonDetails.sort((a, b) => a.id - b.id);
        setPokemon(sortedPokemon);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Pokemon:', error);
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  const filteredPokemon = pokemon.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : filteredPokemon.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < filteredPokemon.length - 1 ? prev + 1 : 0));
  };

  const handleRandomPokemon = () => {
    const randomIndex = Math.floor(Math.random() * filteredPokemon.length);
    setCurrentIndex(randomIndex);
  };

  const currentPokemon = filteredPokemon.slice(
    currentIndex,
    currentIndex + pokemonPerPage
  );

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="dark:bg-gray-900 min-h-screen transition-colors duration-300">
        <nav className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Pokédex</h1>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search Pokemon..."
                    className="pl-10 pr-4 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button
                  onClick={handleRandomPokemon}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  <Sparkles className="h-5 w-5" />
                  <span>I'm Lucky</span>
                </button>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {darkMode ? (
                    <Sun className="h-6 w-6 text-yellow-400" />
                  ) : (
                    <Moon className="h-6 w-6 text-gray-600" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-8">
              <button
                onClick={handlePrevious}
                className="p-4 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                aria-label="Previous Pokemon"
              >
                <ChevronLeft className="h-8 w-8 text-gray-600 dark:text-gray-300" />
              </button>

              <div className="flex-1 max-w-2xl">
                {currentPokemon.map((pokemon) => (
                  <PokemonCard key={pokemon.id} pokemon={pokemon} />
                ))}
              </div>

              <button
                onClick={handleNext}
                className="p-4 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                aria-label="Next Pokemon"
              >
                <ChevronRight className="h-8 w-8 text-gray-600 dark:text-gray-300" />
              </button>
            </div>
          )}
          <div className="text-center mt-4 text-gray-600 dark:text-gray-400">
            Pokemon {currentIndex + 1} of {filteredPokemon.length}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;