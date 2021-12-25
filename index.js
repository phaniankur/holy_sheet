const express = require("express");
const { auth } = require("google-auth-library");
const { google } = require("googleapis")
var cors = require('cors')
PORT = 4747;
const app = express();

app.use(cors())

app.use(express.json());

app.post("/subs", async (req, res) => {

    const auth = new google.auth.GoogleAuth({
        keyFile: "credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets",
    })

    //create client instancce
    const client = await auth.getClient();

    //instance of google sheet api

    const googleSheets = google.sheets({ version: "v4", auth: client });


    const spreadsheetId = "1ZgPvbpJhFT2kpGvIb1q3DeTPNzL848TYpMGlV5H4_4Q"

    // //get metadata
    // const metaData = await googleSheets.spreadsheets.get({
    //     auth,
    //     spreadsheetId,
    // })

    // //Read rows FROM sheet

    // const getRows = await googleSheets.spreadsheets.values.get({
    //     auth,
    //     spreadsheetId,
    //     range: "Subs!A:B"
    // })

    //Write rows TO sheet
    const { name, email, phone, city } = req.body;

    await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range: "Subs!A:B",
        valueInputOption: "USER_ENTERED",
        resource: {
            values: [
                [name, email, phone, city]
            ],
        }
    })

    res.send("Response Submitted")
});

app.listen(PORT, (req, res) => {
    console.log("backend running")
})