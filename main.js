const TelegramBot = require("node-telegram-bot-api");


const token = "6411392918:AAHvfZ2YcnnRxVZfV96jUaEsucZBGSAICtw";

const option = {
  polling: true,
};

const erashibot = new TelegramBot(token, option);

const prefix = "/";

const sayHi = new RegExp(`^${prefix}halo$`);
const gempa = new RegExp(`^${prefix}gempa$`);
const cuaca = new RegExp(`^${prefix}cuaca$`);

erashibot.onText(sayHi, (callback) => {
  erashibot.sendMessage(callback.from.id, `Hai ${callback.from.first_name}`);
});

erashibot.onText(gempa, async (callback) => {
  const BMKG_ENDPOINT = "https://data.bmkg.go.id/DataMKG/TEWS/";

  const apiCall = await fetch(BMKG_ENDPOINT + "autogempa.json");
  const {
    Infogempa: {
      gempa: { Jam, Magnitude, Tanggal, Wilyah, Potensi, Kedalaman, Shakemap, Dirasakan },
    },
  } = await apiCall.json();
  const BMKGImage = BMKG_ENDPOINT + Shakemap;

  const resultText = `
Waktu : ${Tanggal} | ${Jam}
Besaran : ${Magnitude}
Wilayah : ${Wilyah}
Potensi : ${Potensi}
Kedalaman : ${Kedalaman}
Dirasakan : ${Dirasakan}`;

  erashibot.sendPhoto(callback.from.id, BMKGImage, {
    caption: resultText,
  });
});

// BOT CUACA 

// const fetch = require('node-fetch')
// const xml2js = require("xml2js")

// erashibot.onText(cuaca, async(callback) => {
//     const CUACA_ENDPOINT = "https://data.bmkg.go.id/DataMKG/MEWS/"

//     const apiCall = await fetch(CUACA_ENDPOINT + "DigitalForecast/DigitalForecast-Lampung.xml")
//     const cuacaXML = await apiCall.text()

//     const parser = new xml2js.Parser()
//     parser.parseString(cuaca)
//     console.log(cuaca)
// })



// erashibot.onText(cuaca, async (callback) => {
//     const CUACA_ENDPOINT = "https://data.bmkg.go.id/DataMKG/MEWS/";

//     const apiCall = await fetch(CUACA_ENDPOINT + "DigitalForecast/DigitalForecast-Lampung.xml");
//     const cuacaXML = await apiCall.text();

//     const parser = new xml2js.Parser();
//     parser.parseString(cuacaXML, (err, result) => {
//         if (err) {
//             console.error(`Kesalahan parsing XML: ${err.message}`);
//             return;
//         }
//         console.log(result); // Mencetak representasi JSON dari data XML
//         // Di sini Anda bisa melakukan sesuatu dengan data JSON yang dihasilkan, misalnya, mengirimnya sebagai pesan ke pengguna Telegram
//     });
// });
