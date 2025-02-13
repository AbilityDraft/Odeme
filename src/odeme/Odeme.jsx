import React, {useState} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap stil dosyası

const Odeme = () => {
    const [email, setEmail] = useState('infoexxon@paymorph.com');
    const [key, setKey] = useState('7b07ff57a3fcef0c650a11a7ffbc866a');
    const [iban1, setIban1] = useState('TR830083800875002128712239');
    const [iban2, setIban2] = useState('TR050083800875002105001411');
    const [iban3, setIban3] = useState('TR270083800875002113735671');

    const [tutar1, setTutar1] = useState();
    const [tutar2, setTutar2] = useState();
    const [tutar3, setTutar3] = useState();

    const hesapHareketleriHandleSubmit1 = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get('http://213.14.188.27:8080/api/odeme/odemeKontrol');
            const balanceList = response?.data?.data?.map(b => b.balance);

            console.log(response.data.data[0].balance);
            console.log(balanceList);

            if (balanceList.includes( parseFloat(tutar1)) ) {
                alert('Başarılı: Tutar ve Gönderilen para doğru eşleşti.');
            } else {
                throw new Error('Hata: Balance ve Gönderilen para uyuşmuyor.');
            }
        } catch (error) {
            alert('Hata: Tutar ve Gönderilen para uyuşmuyor.');
        }
    };

    const hesapHareketleriHandleSubmit2 = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`https://api.paymorph.com/transaction/last/list?email=${email}&key=${key}&iban=${iban2}`);
            const balanceList = response?.data?.data?.map(b => b.balance);

            console.log(response.data.data[0].balance);
            console.log(balanceList);

            if (balanceList.includes( parseFloat(tutar2)) ) {
                alert('Başarılı: Tutar ve Gönderilen para doğru eşleşti.');
            } else {
                throw new Error('Hata: Balance ve Gönderilen para uyuşmuyor.');
            }
        } catch (error) {
            alert('Hata: Tutar ve Gönderilen para uyuşmuyor.');
        }
    };
    const hesapHareketleriHandleSubmit3 = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`https://api.paymorph.com/transaction/last/list?email=${email}&key=${key}&iban=${iban3}`);
            const balanceList = response?.data?.data?.map(b => b.balance);

            console.log(response.data.data[0].balance);
            console.log(balanceList);

            if (balanceList.includes( parseFloat(tutar1)) ) {
                alert('Başarılı: Tutar ve Gönderilen para doğru eşleşti.');
            } else {
                throw new Error('Hata: Balance ve Gönderilen para uyuşmuyor.');
            }
        } catch (error) {
            alert('Hata: Tutar ve Gönderilen para uyuşmuyor.');
        }
    };

    return (

        <div className="container-fluid">
            <div style={{ backgroundColor: 'black', color: 'white', padding: '10px', textAlign: 'center' }}>
                <h2>Ödeme Kontrol Paneli</h2>
            </div>
            <div className="card-header">
                <h3 className="text-center">Ödeme Yaptıktan Sonra Ödeme Bildirimi Yapınız</h3>
            </div>
            <div className="card">
                <div className="card-body">
                    <form onSubmit={hesapHareketleriHandleSubmit1}>
                        <div className="form-group">
                            <label>IBAN: {iban1} </label>
                        </div>
                        <div>
                            <label>Alıcı: EXXON</label>
                        </div>
                        <div>TUTAR:</div>
                        <input

                            type="number"
                            max='100000'
                            className="form-control mt-2"
                            style={{
                                width: '200px',      // Genişlik
                                padding: '8px',      // Dolgu
                                fontSize: '14px',    // Yazı boyutu  
                                margin:'auto',                                                            
                                borderColor: "black",    // Yazı boyutu
                                // Diğer istediğiniz stil özellikleri
                            }}
                            value={tutar1}
                            onChange={(event) => {
                                // Handle onChange directly here
                                // For example, you can setTutar directly here
                                setTutar1(event.target.value);
                            }}                        />

                        <button type="submit" className="btn btn-primary mt-2" disabled={!tutar1}>Odeme Bildir</button>
                        <p className='mt-2'>Tek İBAN ile en fazla 100.000 TL ödeme yapabilirsiniz</p>
                        <p>Odeme kontrolü 3 dakika içinde onaylanmazsa yetkiliyle irtibata geçiniz</p>
                    </form>
                </div>
            </div>
        </div>

    );

}

export default Odeme;
