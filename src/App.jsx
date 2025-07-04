import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PrimeReactProvider } from 'primereact/api';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import './index.css';

import Navbar from './components/Navbar';
import BookList from './components/BookList';
import BookForm from './components/BookForm';
import AuthorList from './components/AuthorList';
import PublisherList from './components/PublisherList';

function App() {
  return (
    <PrimeReactProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <div className="sticky top-0 z-50 bg-white">
            <Navbar />
          </div>
          <main className="flex-grow py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              <Routes>
                <Route path="/" element={<BookList />} />
                <Route path="/book/new" element={<BookForm />} />
                <Route path="/authors" element={<AuthorList />} />
                <Route path="/publishers" element={<PublisherList />} />
              </Routes>
            </div>
          </main>
        </div>
      </Router>
    </PrimeReactProvider>
  );
}

export default App;
