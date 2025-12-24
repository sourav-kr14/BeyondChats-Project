import React from 'react';

const Header = ({ onRefresh, loading, viewMode, setViewMode }) => {
  return (
    <header className="text-gray-600 body-font bg-white border-b sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        {/* Branding */}
        <div className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span className="ml-3 text-xl font-bold tracking-tight text-indigo-600">BeyondChats</span>
        </div>

        {/* Navigation - Click Handlers Added */}
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          <button 
            onClick={() => setViewMode('all')}
            className={`mr-5 hover:text-indigo-600 font-medium transition-all ${viewMode === 'all' ? 'text-indigo-600 border-b-2 border-indigo-600' : ''}`}
          >
            All Articles
          </button>
          <button 
            onClick={() => setViewMode('original')}
            className={`mr-5 hover:text-indigo-600 font-medium transition-all ${viewMode === 'original' ? 'text-indigo-600 border-b-2 border-indigo-600' : ''}`}
          >
            Original
          </button>
          <button 
            onClick={() => setViewMode('enhanced')}
            className={`mr-5 hover:text-indigo-600 font-medium transition-all ${viewMode === 'enhanced' ? 'text-indigo-600 border-b-2 border-indigo-600' : ''}`}
          >
            Enhanced
          </button>
        </nav>

        <button 
          onClick={onRefresh}
          disabled={loading}
          className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0 transition-colors"
        >
          {loading ? 'Refreshing...' : 'Sync Data'}
          <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className={`w-4 h-4 ml-1 ${loading ? 'animate-spin' : ''}`} viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;