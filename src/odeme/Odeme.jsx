import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap stil dosyası

const Odeme = () => {
    const [email, setEmail] = useState('infoexxon@paymorph.com');
    const [key, setKey] = useState('7b07ff57a3fcef0c650a11a7ffbc866a');
    const [iban, setIban] = useState('TR830083800875002128712239');
    const [tutar, setTutar] = useState();

    const hesapHareketleriHandleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.get(`https://api.paymorph.com/transaction/last/list?email=${email}&key=${key}`);
            console.log('Başarıyla gönderildi:', response.data);

        } catch (error) {
            console.error('Hata:', error);

        }
    };
    console.log(tutar);

    return (

        <div className="container-fluid">
            <div className="card-header">
                <h3 className="text-center">Lütfen Ödemeyi Yaptığınız IBAN Onaylayın</h3>
            </div>
            <div className="card">
                <div className="card-body">
                    <form onSubmit={hesapHareketleriHandleSubmit}>
                        <div className="form-group">
                            <label>IBAN:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={iban}
                               disabled={true}

                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Bilgileri Gönder</button>
                    </form>
                </div>
            </div>
            <div className="card">
                <div className="card-body">
                    <form onSubmit={hesapHareketleriHandleSubmit} >
                        <div className="form-group">
                            <label>IBAN:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={iban}
                                disabled={true}
                            />
                            <input
                                type="text"
                                className="form-control"
                                value={tutar}
                                onChange={(event) => {
                                    // Handle onChange directly here
                                    // For example, you can setTutar directly here
                                    setTutar(event.target.value);
                                }}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Bilgileri Gönder</button>
                    </form>
                </div>
            </div>
            <div className="card">
                <div className="card-body">
                <form onSubmit={hesapHareketleriHandleSubmit}>
                        <div className="form-group">
                            <label>IBAN:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={iban}
                                disabled={true}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Bilgileri Gönder</button>
                    </form>
                </div>
            </div>
        </div>

    );

}

export default Odeme;
