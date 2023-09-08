const axios = require('axios');
const fs = require('fs');

async function identitas(req, res){
	const identitas = {
		nama:'ian',
		alamat:'solo',
		umur:12,

	}
	res.status(200).json(identitas);
}

async function penilaian(req, res){
	const id = req.params.id;
	if (id >0 && id <=5 ) {
		var result = 'buruk';
	}else if(id > 5){
		var result = 'baik';

	}else if(id == ""){
		var result = 'nilai kosong';
	}
	res.status(200).json({msg:result});
}

async function kirimData(req,res){
	const data = req.body;
	var kipas = 0;
	var humidifier = "";
	if (data.temp > 0 && data.temp <=10 ) {
		 kipas = 1;
	}else if (data.temp >10  && data.temp <=20 ) {
		 kipas = 2;
	}else if (data.temp >20  && data.temp < 30 ) {
		 kipas = 3;
	}else{
		 kipas = 4;
	}

if (data.hum > 0 && data.hum <=50 ) {
		 humidifier = "on";
	}else {
		 humidifier = "off";

	}


	res.status(200).json({
		'pesan':{
			"kipas": kipas,
			"humidifier": humidifier,
		}
	});
}


async function weather(req, res) {

    const apiKey = '6c1afb710ddeda10ae6ee2390c228126'; // Ganti dengan kunci API Anda
    const city = req.query.city || 'Surakarta'; // Anda dapat menerima kota dari permintaan
    try {


        // Buat permintaan ke OpenWeather API
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);

        // console.log(response)
        // // Kirim data suhu dan kelembaban sebagai JSON ke Node-RED
        const suhu = response.data.main.temp;
        const kelembaban = response.data.main.humidity;

        // // Kirim data cuaca sebagai respons
        res.json({ suhu: suhu, kelembaban: kelembaban });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data cuaca.' });
    }

}


async function sendData(req,res){
	const data = req.body;
	var kipas = 1;
	var humidifier = "";
	if (data.temp > 0 && data.temp <=10 ) {
		 kipas = 1;
	}else if (data.temp >10  && data.temp <=20 ) {
		 kipas = 2;
	}else if (data.temp >20  && data.temp < 30 ) {
		 kipas = 3;
	}else{
		 kipas = 4;
	}

if (data.hum > 0 && data.hum <=50 ) {
		 humidifier = "on";
	}else {
		 humidifier = "off";

	}



const json = {
		'pesan':{
			"kipas": kipas,
			"humidifier": humidifier,
		}
	};

const jsonString = JSON.stringify(json);
fs.writeFile('./coba.json', jsonString, err => {
    if (err) {
        console.log('Error writing file', err)
    } else {
        console.log('Successfully wrote file')
    }
})
	res.status(200).json(json);
}



module.exports = {identitas,penilaian,kirimData,weather,sendData};