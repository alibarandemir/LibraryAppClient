import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';

const Navbar = () => {
  return (
    <nav className="border-b border-gray-200">
      <div className="flex items-center justify-between h-14">
        <div className="flex items-center gap-1">
          <Link 
            to="/" 
            className="text-gray-700 hover:text-gray-900 px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-100"
          >
            Kitaplar
          </Link>
          <Link 
            to="/authors" 
            className="text-gray-700 hover:text-gray-900 px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-100"
          >
            Yazarlar
          </Link>
          <Link 
            to="/publishers" 
            className="text-gray-700 hover:text-gray-900 px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-100"
          >
            Yayınevleri
          </Link>
        </div>
        <div className="pr-2">
          <Link to="/book/new">
            <Button 
              label="Yeni Kitap" 
              icon="pi pi-plus" 
              severity="primary"
              size="small"
            />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 