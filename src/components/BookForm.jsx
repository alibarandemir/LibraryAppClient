import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { bookService } from '../services/api';

function BookForm() {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = !!id;

    const [formData, setFormData] = useState({
        title: '',
        price: null,
        ISBN13: '',
        publicationDate: null,
        publisherName: '',
        authorNameSurname: ''
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (isEditMode) {
            loadBook();
        }
    }, [id]);

    const loadBook = async () => {
        try {
            const response = await bookService.getBookById(id);
            const book = response.data.data;
            setFormData({
                ...book,
                publicationDate: new Date(book.publicationDate)
            });
        } catch (error) {
            console.error('Error loading book:', error);
            navigate('/');
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.title.trim()) {
            newErrors.title = 'Kitap adı boş olamaz';
        }
        
        if (!formData.price || formData.price <= 0) {
            newErrors.price = 'Fiyat pozitif olmalıdır';
        }
        
        if (!formData.ISBN13 || formData.ISBN13.length !== 13) {
            newErrors.ISBN13 = 'ISBN13 13 haneli olmalıdır';
        }
        
        if (!formData.publicationDate) {
            newErrors.publicationDate = 'Yayın tarihi boş olamaz';
        }
        
        if (!formData.publisherName.trim()) {
            newErrors.publisherName = 'Yayınevi adı boş olamaz';
        }
        
        if (!formData.authorNameSurname.trim()) {
            newErrors.authorNameSurname = 'Yazar adı ve soyadı boş olamaz';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        try {
            const submitData = {
                ...formData,
                publicationDate: formData.publicationDate.toISOString().split('T')[0]
            };

            if (isEditMode) {
                await bookService.updateBook(id, submitData);
            } else {
                await bookService.createBook(submitData);
            }
            
            navigate('/');
        } catch (error) {
            console.error('Error saving book:', error);
        }
    };

    return (
        <div className="card p-4">
            <h2 className="text-2xl mb-4">{isEditMode ? 'Kitap Düzenle' : 'Yeni Kitap Ekle'}</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <label htmlFor="title">Kitap Adı</label>
                    <InputText
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        className={errors.title ? 'p-invalid' : ''}
                    />
                    {errors.title && <small className="text-red-500">{errors.title}</small>}
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="price">Fiyat</label>
                    <InputNumber
                        id="price"
                        value={formData.price}
                        onValueChange={(e) => setFormData({...formData, price: e.value})}
                        mode="decimal"
                        minFractionDigits={2}
                        className={errors.price ? 'p-invalid' : ''}
                    />
                    {errors.price && <small className="text-red-500">{errors.price}</small>}
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="ISBN13">ISBN13</label>
                    <InputText
                        id="ISBN13"
                        value={formData.ISBN13}
                        onChange={(e) => setFormData({...formData, ISBN13: e.target.value})}
                        className={errors.ISBN13 ? 'p-invalid' : ''}
                    />
                    {errors.ISBN13 && <small className="text-red-500">{errors.ISBN13}</small>}
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="publicationDate">Yayın Tarihi</label>
                    <Calendar
                        id="publicationDate"
                        value={formData.publicationDate}
                        onChange={(e) => setFormData({...formData, publicationDate: e.value})}
                        dateFormat="dd/mm/yy"
                        className={errors.publicationDate ? 'p-invalid' : ''}
                    />
                    {errors.publicationDate && <small className="text-red-500">{errors.publicationDate}</small>}
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="publisherName">Yayınevi</label>
                    <InputText
                        id="publisherName"
                        value={formData.publisherName}
                        onChange={(e) => setFormData({...formData, publisherName: e.target.value})}
                        className={errors.publisherName ? 'p-invalid' : ''}
                    />
                    {errors.publisherName && <small className="text-red-500">{errors.publisherName}</small>}
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="authorNameSurname">Yazar Adı Soyadı</label>
                    <InputText
                        id="authorNameSurname"
                        value={formData.authorNameSurname}
                        onChange={(e) => setFormData({...formData, authorNameSurname: e.target.value})}
                        className={errors.authorNameSurname ? 'p-invalid' : ''}
                    />
                    {errors.authorNameSurname && <small className="text-red-500">{errors.authorNameSurname}</small>}
                </div>

                <div className="flex gap-2 mt-4">
                    <Button 
                        type="submit" 
                        label={isEditMode ? 'Güncelle' : 'Kaydet'} 
                        icon="pi pi-save" 
                    />
                    <Button 
                        type="button" 
                        label="İptal" 
                        icon="pi pi-times" 
                        className="p-button-secondary" 
                        onClick={() => navigate('/')}
                    />
                </div>
            </form>
        </div>
    );
}

export default BookForm; 