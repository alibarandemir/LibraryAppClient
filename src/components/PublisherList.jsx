import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Panel } from 'primereact/panel';
import { Button } from 'primereact/button';
import { publisherService } from '../services/api';

function PublisherList() {
    const [publishers, setPublishers] = useState([]);
    const [randomPublishers, setRandomPublishers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [randomLoading, setRandomLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        loadPublishers();
        loadRandomPublishers();
    }, []);

    const loadPublishers = async () => {
        try {
            setLoading(true);
            const response = await publisherService.getAllPublishers();
            setPublishers(response.data.data);
        } catch (error) {
            console.error('Error loading publishers:', error);
        } finally {
            setLoading(false);
        }
    };

    const loadRandomPublishers = async () => {
        try {
            setRandomLoading(true);
            const response = await publisherService.getTwoRandomPublishers();
            setRandomPublishers(response.data.data);
        } catch (error) {
            console.error('Error loading random publishers:', error);
        } finally {
            setRandomLoading(false);
        }
    };

    const booksBodyTemplate = (rowData) => {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {rowData.books.map((book, index) => (
                    <div key={index} className="p-3 border-1 border-round surface-border">
                        <div className="font-bold text-lg mb-2">{book.title}</div>
                        <div className="text-sm text-600">
                            <div><i className="pi pi-user mr-2"></i>Yazar: {book.authorNameSurname}</div>
                            <div><i className="pi pi-money-bill mr-2"></i>Fiyat: {book.price} TL</div>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    const randomHeader = (
        <div className="flex justify-content-between align-items-center">
            <h2 className="text-xl font-bold m-0">
                <i className="pi pi-star mr-2"></i>
                2 Yayınevini Listeleme
            </h2>
            <Button 
                icon="pi pi-refresh" 
                onClick={loadRandomPublishers}
                className="p-button-rounded p-button-text"
                tooltip="Yayınevlerini Yenile"
            />
        </div>
    );

    const allPublishersHeader = (
        <div className="flex justify-content-between align-items-center">
            <h2 className="text-2xl font-bold m-0">
                <i className="pi pi-building mr-8"></i>
                Tüm Yayınevleri
            </h2>
        </div>
    );

    return (
        <div className="flex flex-col gap-4">
            <div className="card">
                <DataTable 
                    value={randomPublishers} 
                    loading={randomLoading}
                    className="p-datatable-striped"
                    header={randomHeader}
                    emptyMessage="Yayınevi bulunamadı"
                >
                    <Column 
                        field="publisherName" 
                        header="Yayınevi Adı" 
                        sortable
                        className="font-semibold"
                    />
                    <Column 
                        body={booksBodyTemplate} 
                        header="Kitapları" 
                    />
                </DataTable>
            </div>

            <div className="card">
                <DataTable 
                    value={publishers} 
                    loading={loading}
                    paginator 
                    rows={5}
                    rowsPerPageOptions={[5, 10, 25]}
                    className="p-datatable-striped"
                    header={allPublishersHeader}
                    emptyMessage="Yayınevi bulunamadı"
                >
                    <Column 
                        field="publisherName" 
                        header="Yayınevi Adı" 
                        sortable
                        className="font-semibold"
                    />
                    <Column 
                        body={booksBodyTemplate} 
                        header="Kitapları" 
                    />
                </DataTable>
            </div>
        </div>
    );
}

export default PublisherList; 