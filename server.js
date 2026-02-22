import express from "express";

const app = express();
const PORT = 3000;

/*
========================================
MICROSERVICE 1 - WEATHER API
========================================
*/
app.get("/api/weather", (req, res) => {
    res.json({
        service: "Weather Service",
        data: "Weather today is rain"
    });
});

/*
========================================
MICROSERVICE 2 - FX API
========================================
*/
app.get("/api/fx", (req, res) => {
    res.json({
        service: "FX Service",
        data: "The current USD rate is Rp 15,000"
    });
});

/*
========================================
MAIN WEB APPLICATION
========================================
*/
app.get("/", async (req, res) => {

    // Simulating internal API calls
    const weatherResponse = await fetch("http://localhost:3000/api/weather");
    const weatherData = await weatherResponse.json();

    const fxResponse = await fetch("http://localhost:3000/api/fx");
    const fxData = await fxResponse.json();

    res.send(`
        <html>
        <head>
            <title>API Demo for IT Auditor</title>
        </head>
        <body style="font-family: Arial; padding: 40px;">
            <h1>Hello World</h1>

            <h2>API Concept Demonstration</h2>

            <p><strong>Weather API:</strong> ${weatherData.data}</p>
            <p><strong>FX API:</strong> ${fxData.data}</p>

            <hr>
            <h3>Architecture Concept:</h3>
            <ul>
                <li>Main App (Web Layer)</li>
                <li>Weather Microservice (API)</li>
                <li>FX Microservice (API)</li>
            </ul>

            <p>IT Auditor View: System integrates multiple APIs internally.</p>
        </body>
        </html>
    `);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
