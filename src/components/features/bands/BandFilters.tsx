import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { Genre } from '../../../types/models';

interface BandFiltersProps {
  onGenreChange: (genre: string) => void;
  onSortChange: (sort: { field: string; order: 'asc' | 'desc' }) => void;
  selectedGenre: string;
  selectedSort: string;
}

const BandFilters = ({
  onGenreChange,
  onSortChange,
  selectedGenre,
  selectedSort,
}: BandFiltersProps) => {
  const genres = useSelector<RootState, Genre[]>((state) => state.bands.genres);

  return (
    <div className="flex gap-4 mb-6">
      <select
        onChange={(e) => onGenreChange(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
        value={selectedGenre}
      >
        <option value="">All Genres</option>
        {genres.map((genre) => (
          <option key={genre.code} value={genre.code}>
            {genre.name}
          </option>
        ))}
      </select>

      <select
        onChange={(e) => {
          const [field, order] = e.target.value.split('-');
          onSortChange({ field, order: order as 'asc' | 'desc' });
        }}
        className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
        value={selectedSort}
      >
        <option value="name-asc">Name (A-Z)</option>
        <option value="name-desc">Name (Z-A)</option>
        <option value="year-desc">Year (Newest)</option>
        <option value="year-asc">Year (Oldest)</option>
      </select>
    </div>
  );
};

export default BandFilters;
