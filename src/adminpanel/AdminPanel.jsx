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
    const [email, setEmail] = useState('infoexxon@paymorph.com');
    const [key, setKey] = useState('7b07ff57a3fcef0c650a11a7ffbc866a');
    const [iban1, setIban1] = useState('TR830083800875002128712239');
    const [selectedRow, setSelectedRow] = useState(null);
    const [gondermeList, setGondermeList] = useState({});

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

            const response = await axios.get(`https://api.paymorph.com/transaction/last/list?email=${email}&key=${key}&iban=${iban1}`);
            setResponse(response.data?.data); // API'den gelen veriyi state'e kaydet

            alert('Başarılı: Veri başarıyla alındı.');
        } catch (error) {
            alert('Hata: Veri alınamadı.');
            console.error('Veri alımı hatası:', error);
        }
    };
    console.log(selectedRow);

    const sendCashoutRequest = async () => {

        const data = {
            email,
            key,
            name: gondermeList.adSoyad,
            description: gondermeList.aciklama,
            from_iban: selectedRow ? selectedRow.account.iban : gondermeList.from_iban,
            iban: gondermeList.iban,
            balance: gondermeList.tutar,
            identity_id: '12312312312',
            reference_id: `${new Date().getTime()}`, // Benzersiz işlem id'si için timestamp kullanıyoruz
        };

        try {
            const response = await axios.post('https://api.paymorph.com/cashout/sipay/send', data);
            alert('Başarılı: Çekim işlemi başarıyla gerçekleştirildi.');
            console.log('Response:', response.data);
        } catch (error) {
            alert('Hata: Çekim işlemi gerçekleştirilemedi.');
            console.error('Çekim işlemi hatası:', error);
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
                accessor: 'name', // Örnek olarak API'den dönen veriye göre ayarlayın
            },
            {
                Header: 'Tutar',
                accessor: 'balance', // Örnek olarak API'den dönen veriye göre ayarlayın
            },
            {
                Header: 'Açıklama',
                accessor: 'desc', // Örnek olarak API'den dönen veriye göre ayarlayın
            },
        ],
        []
    );
    console.log(response?.data?.length);
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data: response });

    return (
        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'column', height: '100vh' }}>
            {!isLoggedIn ? (
                <div >
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
                    <table {...getTableProps()} className="table table-bordered border-primary" style={{ borderColor: 'black' }}>
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
                                <tr
                                    {...row.getRowProps()}
                                    onClick={() => setSelectedRow(row.original)} // Set selected row on click
                                    style={{
                                        background: selectedRow === row.original ? '#00afec' : 'white', // Highlight selected row
                                        cursor: 'pointer',
                                    }}
                                >
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
                    {selectedRow &&  (
                        <div>
                            <h3>Para Çekim Bilgileri</h3>
                            <p>{selectedRow?.account.iban}</p>
                            <p>Ad Soyad: </p>
                            <input
                                style={{borderColor:"black", marginTop:"2px" }}
                                id="iban"
                                type="text"
                                value={gondermeList?.adSoyad}
                                onChange={(e) => setGondermeList({ ...gondermeList, adSoyad: e.target.value })}
                                className="form-control"
                            />
                            <p>Tutar: {gondermeList.tutar}</p>
                            <input

                                style={{borderColor:"black", marginTop:"2px" }}
                                id="iban"
                                type="text"
                                value={gondermeList?.tutar}
                                onChange={(e) => setGondermeList({ ...gondermeList, tutar: e.target.value })}
                                className="form-control"
                            />
                            <label htmlFor="iban">Paranın Gönderileceği IBAN:</label>
                            <input

                                style={{borderColor:"black", marginTop:"2px" }}
                                id="iban"
                                type="text"
                                value={gondermeList.iban}
                                onChange={(e) => setGondermeList({ ...gondermeList, iban: e.target.value })}
                                className="form-control"
                            />
                            <label htmlFor="iban">Açıklama:</label>
                            <input

                                style={{borderColor:"black", marginTop:"2px" }}
                                id="aciklama"
                                type="text"
                                value={gondermeList.aciklama}
                                onChange={(e) => setGondermeList({ ...gondermeList, aciklama: e.target.value })}
                                className="form-control"
                            />
                            <button

                                className="btn btn-success mt-3"
                                onClick={sendCashoutRequest}
                            >
                                Bilgileri Gönder
                            </button>
                        </div> )}
                    {   response?.data?.length === undefined &&  (
                        <div>
                        <h3>Para Çekim Bilgileri</h3>
                        <p>{selectedRow?.account.iban}</p>
                        <p>Ad Soyad: </p>
                        <input
                        style={{borderColor:"black", marginTop:"2px" }}
                        id="iban"
                        type="text"
                        value={gondermeList?.adSoyad}
                        onChange={(e) => setGondermeList({ ...gondermeList, adSoyad: e.target.value })}
                        className="form-control"
                        />
                        <p>Tutar: {gondermeList.tutar}</p>
                        <input

                        style={{borderColor:"black", marginTop:"2px" }}
                        id="iban"
                        type="text"
                        value={gondermeList?.tutar}
                        onChange={(e) => setGondermeList({ ...gondermeList, tutar: e.target.value })}
                        className="form-control"
                        />
                            <label htmlFor="iban">Paranın Çekileceği IBAN:</label>
                            <input
                                style={{borderColor:"black", marginTop:"2px" }}
                                id="iban"
                                type="text"
                                value={gondermeList.from_iban}
                                onChange={(e) => setGondermeList({ ...gondermeList, from_iban: e.target.value })}
                                className="form-control"
                            />
                        <label htmlFor="iban">Paranın Gönderileceği IBAN:</label>
                        <input

                        style={{borderColor:"black", marginTop:"2px" }}
                        id="iban"
                        type="text"
                        value={gondermeList.iban}
                        onChange={(e) => setGondermeList({ ...gondermeList, iban: e.target.value })}
                        className="form-control"
                        />
                        <label htmlFor="iban">Açıklama:</label>
                        <input

                        style={{borderColor:"black", marginTop:"2px" }}
                        id="aciklama"
                        type="text"
                        value={gondermeList.aciklama}
                        onChange={(e) => setGondermeList({ ...gondermeList, aciklama: e.target.value })}
                        className="form-control"
                        />
                        <button

                        className="btn btn-success mt-3"
                        onClick={sendCashoutRequest}
                        >
                        Bilgileri Gönder
                        </button>
                        </div>
                    )}
                </div>
            )}

        </div>
    );
};

export default AdminPanel;
