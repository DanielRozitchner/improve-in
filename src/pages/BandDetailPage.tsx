import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { fetchBandAlbums, fetchBandById } from '../store/features/bands/bandsSlice';
import { RootState } from '../store/store';

const BandDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { selectedBand, selectedBandAlbums, loading, error } = useSelector(
    (state: RootState) => state.bands,
  );

  useEffect(() => {
    if (id) {
      const bandId = parseInt(id);
      dispatch(fetchBandById(bandId));
      dispatch(fetchBandAlbums(bandId));
    }
  }, [dispatch, id]);

  const handleBack = () => {
    navigate(-1);
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

  if (!selectedBand) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-yellow-50 p-4 rounded-lg">
          <p className="text-yellow-700">Band not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={handleBack}
        className="mb-6 flex items-center text-sm text-indigo-600 hover:text-indigo-800 transition-colors"
      >
        Back
      </button>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-900">{selectedBand.name}</h1>
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <span className="inline-block bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">
              {selectedBand.genreCode}
            </span>
            <span className="mx-2">•</span>
            <span>{selectedBand.year}</span>
            <span className="mx-2">•</span>
            <span>{selectedBand.country}</span>
          </div>
        </div>

        {selectedBand.members && selectedBand.members.length > 0 && (
          <div className="border-t border-gray-200 px-6 py-5">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Members</h2>
            <ul className="space-y-3">
              {selectedBand.members.map((member, index) => (
                <li key={index} className="text-gray-700">
                  <span className="font-medium">{member.name}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {selectedBandAlbums && selectedBandAlbums.length > 0 && (
          <div className="border-t border-gray-200 px-6 py-5">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Albums</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {selectedBandAlbums.map((album) => (
                <div
                  key={`${album.id}-${album.name}`}
                  className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <h3 className="font-medium text-gray-900">{album.name}</h3>
                  <p className="mt-1 text-sm text-gray-500">{album.year}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BandDetailPage;
