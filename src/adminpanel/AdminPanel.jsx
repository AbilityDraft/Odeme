import React, { useEffect, useState } from 'react';
import { useTable } from 'react-table';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

const AdminPanel = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [dbusername, setDbusername] = useState('Admin');
    const [dbpassword, setDbpassword] = useState('Admin');
    const [isLoggedIn, setIsLoggedIn] = useState(false); // New state to track login status
    const [response, setResponse] = useState([]);

    const onSubmit = (event) => {
        event.preventDefault();
        if (username === dbusername && password === dbpassword) {
            setIsLoggedIn(true); // Set login status to true on successful login
        } else {
            alert('Geçersiz kullanıcı adı veya şifre');
        }
    };

    const hesapHareketleriHandleSubmit1 = async () => {
        try {
            const email = 'example@email.com'; // Burada örnek bir email kullanıyorum, gerçek emailinizi geçmelisiniz
            const key = 'examplekey'; // Burada örnek bir key kullanıyorum, gerçek keyinizi geçmelisiniz
            const iban1 = 'exampleiban'; // Burada örnek bir iban kullanıyorum, gerçek ibanınızı geçmelisiniz

            const response = await axios.get(`https://api.paymorph.com/transaction/last/list?email=${email}&key=${key}&iban=${iban1}`);
            setResponse(response.data?.data); // API'den gelen veriyi state'e kaydet

            alert('Başarılı: Veri başarıyla alındı.');
        } catch (error) {
            alert('Hata: Veri alınamadı.');
            console.error('Veri alımı hatası:', error);
        }
    };

    useEffect(() => {
        if (isLoggedIn) {
            hesapHareketleriHandleSubmit1();
        }
    }, [isLoggedIn]);

    const columns = React.useMemo(
        () => [
            {
                Header: 'Ad Soyad',
                accessor: 'col1', // Örnek olarak API'den dönen veriye göre ayarlayın
            },
            {
                Header: 'Tutar',
                accessor: 'col2', // Örnek olarak API'den dönen veriye göre ayarlayın
            },
            {
                Header: 'Tarih',
                accessor: 'col3', // Örnek olarak API'den dönen veriye göre ayarlayın
            },
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data: response });

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: '100vh' }}>
            {!isLoggedIn ? (
                <div style={{ width: '300px', marginBottom: '50px' }}>
                    <form onSubmit={onSubmit} className="container-sm">
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Kullanıcı Adı</label>
                            <input
                                style={{ borderColor: 'black' }}
                                type="text"
                                id="username"
                                className="form-control"
                                onChange={(event) => setUsername(event.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Şifre</label>
                            <input
                                style={{ borderColor: 'black' }}
                                type="password"
                                id="password"
                                className="form-control"
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={!password || !username}
                            style={{ zIndex: 1 }}
                        >
                            Giriş
                        </button>
                    </form>
                </div>
            ) : (
                <div>
                    <table {...getTableProps()} className="table table-striped" style={{ borderColor: 'black' }}>
                        <thead>
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                                ))}
                            </tr>
                        ))}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                        {rows.map(row => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map(cell => {
                                        return (
                                            <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminPanel;
