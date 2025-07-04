import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { bookService } from '../services/api';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    loadAllBooks();
  }, []);

  const loadAllBooks = async () => {
    try {
      setLoading(true);
      const response = await bookService.getAllBooks();
      setBooks(response.data.data || []);
    } catch (error) {
      console.error('Error loading books:', error);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      loadAllBooks();
      return;
    }
    try {
      setLoading(true);
      const response = await bookService.searchBooks(searchTerm);
      setBooks(response.data.data || []);
    } catch (error) {
      console.error('Error searching books:', error);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex gap-2">
        <Button
          icon="pi pi-eye"
          className="p-button-rounded p-button-info p-button-sm"
          onClick={() => navigate(`/book/${rowData.isbn13}`)}
        />
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-warning p-button-sm"
          onClick={() => navigate(`/book/edit/${rowData.isbn13}`)}
        />
      </div>
    );
  };

  const header = (
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-semibold text-gray-800">Kitap Listesi</h2>
      <div className="flex gap-2">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={searchTerm}
            onChange={handleSearchInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Google Books API ile Kitap ara..."
            className="p-inputtext-sm"
          />
        </span>
        <Button
          icon="pi pi-search"
          className="p-button-primary p-button-sm"
          onClick={handleSearch}
          tooltip="Ara"
        />
      </div>
    </div>
  );

  return (
    <div className="card">
      <DataTable
        value={books}
        paginator
        rows={10}
        dataKey="isbn13"
        loading={loading}
        header={header}
        emptyMessage="Kitap bulunamadı"
        className="p-datatable-sm"
        stripedRows
        responsiveLayout="scroll"
      >
        <Column field="title" header="Başlık" sortable />
        <Column field="authorNameSurname" header="Yazar" sortable />
        <Column field="publisherName" header="Yayınevi" sortable />
        <Column field="isbn13" header="ISBN" />
        <Column field="publicationDate" header="Yayın Tarihi" sortable />
        <Column field="price" header="Fiyat" sortable body={(rowData) => `${rowData.price} TL`} />
        <Column body={actionBodyTemplate} exportable={false} style={{ width: '8rem' }} />
      </DataTable>
    </div>
  );
};

export default BookList; 