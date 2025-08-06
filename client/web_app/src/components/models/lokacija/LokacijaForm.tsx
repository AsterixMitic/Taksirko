import React, { useState } from "react";
import type { Lokacija } from "../../../types";
import {getLatLonFromAddress} from "../../../services/LokacijaService.ts";
import ClickableLocationMap from "../../map/ClickableLocationMap.tsx";
import {LoadingSpinnerInline} from "../../common/Loading.tsx";

type LokacijaFormProps = {
    onCreate: (nova: Lokacija) => Promise<void>;
};

export default function LokacijaForm({ onCreate }: LokacijaFormProps) {
    const [naziv, setNaziv] = useState("");
    const [adresa, setAdresa] = useState("");
    const [lat, setLat] = useState(43.3209); // Nis default
    const [lng, setLng] = useState(21.8958);

    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [loadingSearch, setLoadingSearch] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSearch = async () => {
        setLoadingSearch(true);
        setError(null);
        try {
            const { latitude, longitude } = await getLatLonFromAddress(adresa);
            console.log(latitude, longitude);
            setLat(latitude);
            setLng(longitude);
        } catch (error) {
            setError("Greška pri pretrazi adrese.");
            console.error(error);
        } finally {
            setLoadingSearch(false);
        }
    };

    const handleMapClick = (lat: number, lng: number) => {
        setLat(lat);
        setLng(lng);
    };

    const handleSubmit = async () => {


        const novaLokacija: Lokacija = {
            id: 0, // backend će dodeliti ID
            naziv,
            adresa,
            latituda:lat,
            longituda:lng,
        };

        try{
            setLoadingSubmit(true);
            setError(null);
            await onCreate(novaLokacija);
        }
        catch (err) {
            setError("Greška prilikom kreiranja lokacije.");
        } finally {
            setLoadingSubmit(false);
        }
    };

    return (
      <div className="container">
          <div className="mb-3">
              <label className="form-label">Naziv:</label>
              <input
                type="text"
                className="form-control"
                value={naziv}
                onChange={(e) => setNaziv(e.target.value)}
              />
          </div>

          <div className="mb-3 row align-items-center">

              <label className="form-label">Adresa:</label>

              <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    value={adresa}
                    onChange={(e) => setAdresa(e.target.value)}
                  />
              </div>
              <div className="col-auto">
                  <button
                    className="btn btn-outline-primary"
                    onClick={handleSearch}
                    disabled={loadingSearch}
                  >
                      {loadingSearch ? <LoadingSpinnerInline /> : "Pretraži"}
                  </button>
              </div>
          </div>

          {error && <div className="alert alert-danger">{error}</div>}

          <div className="mb-4">
              <ClickableLocationMap lat={lat} lng={lng} onSelect={handleMapClick} />
          </div>

          <button
            className="btn btn-success"
            onClick={handleSubmit}
            disabled={loadingSubmit}
          >
              {loadingSubmit ? <LoadingSpinnerInline /> : "Sačuvaj lokaciju"}
          </button>
      </div>
    );
}
