import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Panel } from 'primereact/panel';
import { authorService } from '../services/api';

function AuthorList() {
    const [authors, setAuthors] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        loadAuthors();
    }, []);

    const loadAuthors = async () => {
        try {
            setLoading(true);
            const response = await authorService.getAllAuthors();
            setAuthors(response.data.data);
        } catch (error) {
            console.error('Error loading authors:', error);
        } finally {
            setLoading(false);
        }
    };

    const booksBodyTemplate = (rowData) => {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {rowData.books.map((book, index) => (
                    <div key={index} className="p-3 border-1 border-round surface-border">
                        <div className="font-bold text-lg mb-2">{book.title}</div>
                        <div className="text-sm text-600">
                            <div><i className="pi pi-tag mr-2"></i>ISBN: {book.ISBN13}</div>
                            <div><i className="pi pi-money-bill mr-2"></i>Fiyat: {book.price} TL</div>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    const header = (
        <div className="flex justify-content-between align-items-center">
            <h2 className="text-2xl font-bold m-0">
                <i className="pi pi-users mr-2"></i>
                Yazarlar ve Kitapları
            </h2>
        </div>
    );

    return (
        <div className="card">
            <DataTable 
                value={authors} 
                loading={loading}
                paginator 
                rows={5}
                rowsPerPageOptions={[5, 10, 25]}
                className="p-datatable-striped"
                header={header}
                emptyMessage="Yazar bulunamadı"
            >
                <Column 
                    field="authorNameSurname" 
                    header="Yazar Adı Soyadı" 
                    sortable
                    className="font-semibold"
                />
                <Column 
                    body={booksBodyTemplate} 
                    header="Kitapları" 
                />
            </DataTable>
        </div>
    );
}

export default AuthorList; 