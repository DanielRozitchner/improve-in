import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import BandFilters from '../components/features/bands/BandFilters';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { fetchBands, fetchGenres } from '../store/features/bands/bandsSlice';
import { RootState } from '../store/store';

interface FilterParams {
  genreCode?: string;
  _sort?: string;
  _order?: 'asc' | 'desc';
}

const BandsPage = () => {
  const dispatch = useAppDispatch();
  const { bands, loading, error } = useSelector((state: RootState) => state.bands);

  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedSort, setSelectedSort] = useState('name-asc');

  useEffect(() => {
    dispatch(fetchGenres());
    dispatch(fetchBands({}));
  }, [dispatch]);

  const handleGenreChange = (genre: string) => {
    setSelectedGenre(genre);
    const params = genre ? { genreCode: genre } : {};
    if (selectedSort) {
      const [field, order] = selectedSort.split('-');
      Object.assign(params, { _sort: field, _order: order });
    }
    dispatch(fetchBands(params));
  };

  const handleSortChange = ({ field, order }: { field: string; order: 'asc' | 'desc' }) => {
    const sortValue = `${field}-${order}`;
    setSelectedSort(sortValue);
    const params: FilterParams = { _sort: field, _order: order };
    if (selectedGenre) {
      params.genreCode = selectedGenre;
    }
    dispatch(fetchBands(params));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-50 p-4 rounded-lg">
          <p className="text-red-700">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Music Bands</h1>
        <BandFilters
          onGenreChange={handleGenreChange}
          onSortChange={handleSortChange}
          selectedGenre={selectedGenre}
          selectedSort={selectedSort}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bands.map((band) => (
          <Link
            key={band.id}
            to={`/bands/${band.id}`}
            className="group block bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
          >
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                {band.name}
              </h2>
              <p className="mt-2 text-sm text-gray-500">{band.genreCode}</p>
              <div className="mt-4 flex items-center text-sm text-gray-500">
                <span className="inline-block bg-gray-100 px-2 py-1 rounded">{`${band.year}`}</span>
                <span className="mx-2">•</span>
                <span>{band.country}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BandsPage;
