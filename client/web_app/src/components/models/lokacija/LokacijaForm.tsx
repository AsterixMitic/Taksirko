import React, { useState } from "react";
import type { Lokacija } from "../../../types";
import {getLatLonFromAddress} from "../../../services/LokacijaService.ts";
import ClickableLocationMap from "../../map/ClickableLocationMap.tsx";

type LokacijaFormProps = {
    onCreate: (nova: Lokacija) => void;
};

export default function LokacijaForm({ onCreate }: LokacijaFormProps) {
    const [naziv, setNaziv] = useState("");
    const [adresa, setAdresa] = useState("");
    const [lat, setLat] = useState(44.7866); // Beograd centar default
    const [lng, setLng] = useState(20.4489);
    const [greska, setGreska] = useState("");

    const handleSearch = async () => {
        try {
            const { latitude, longitude } = await getLatLonFromAddress(adresa);
            console.log(latitude, longitude);
            setLat(latitude);
            setLng(longitude);
            setGreska("");
        } catch (error) {
            setGreska("Greška pri pretrazi adrese.");
            console.error(error);
        }
    };

    const handleMapClick = (lat: number, lng: number) => {
        setLat(lat);
        setLng(lng);
    };

    const handleSubmit = () => {
        if (!naziv || !adresa) {
            setGreska("Naziv i adresa su obavezni.");
            return;
        }

        const novaLokacija: Lokacija = {
            id: 0, // backend će dodeliti ID
            naziv,
            adresa,
            latituda:lat,
            longituda:lng,
        };

        onCreate(novaLokacija);
    };

    return (
        <div>
            <h2>Dodaj novu lokaciju</h2>

            <div>
                <label>Naziv:</label>
                <input
                    type="text"
                    value={naziv}
                    onChange={(e) => setNaziv(e.target.value)}
                />
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <label>Adresa:</label>
                <input
                    type="text"
                    value={adresa}
                    onChange={(e) => setAdresa(e.target.value)}
                />
                <button onClick={handleSearch}>Pretraži</button>
            </div>

            {greska && <p style={{ color: "red" }}>{greska}</p>}

            <ClickableLocationMap lat={lat} lng={lng} onSelect={handleMapClick} />

            <button onClick={handleSubmit}>Sačuvaj lokaciju</button>
        </div>
    );
}
