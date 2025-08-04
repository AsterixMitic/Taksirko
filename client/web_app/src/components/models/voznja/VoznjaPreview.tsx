import React, {useEffect, useState} from 'react';
import type {Lokacija, Vozac, Vozilo, Voznja} from '../../../types.ts';
import {CrudFactory} from "../../../services/data/CrudService.ts";
import {format} from "date-fns";
import {MapStatusToName} from "../../../services/StatusService.ts";

interface VoznjaCardProps {
    voznja: Voznja;
}


const VoznjaCard: React.FC<VoznjaCardProps> = ({ voznja }) => {
    const [vozac, setVozac] = useState<Vozac | null>(null);
    const [vozilo, setVozilo] = useState<Vozilo | null>(null);
    const [pocetnaLokacija, setPocetnaLokacija] = useState<Lokacija | null>(null);
    const [krajnjaLokacija, setKrajnjaLokacija] = useState<Lokacija | null>(null);


    const fetchVozac = async () => {
        const vozacService=CrudFactory.GetVozaciService()
        try {
            const response = await vozacService.GetOne(voznja.vozac_id);
            setVozac(response);
        } catch (error) {
            console.error("Greška prilikom učitavanja vozača:", error);
        }
    };

    const fetchVozilo = async () => {
        const voziloService=CrudFactory.GetVoziloService()
        try {
            const response = await voziloService.GetOne(voznja.vozilo_id);
            setVozilo(response);
        } catch (error) {
            console.error("Greška prilikom učitavanja vozila:", error);
        }
    };

    const fetchLokacija = async () => {
        const LokacijaService=CrudFactory.GetLokacijeService()
        try {
            const response1 = await LokacijaService.GetOne(voznja.pocetna_lokacija_id);
            setPocetnaLokacija(response1)
            const response2 = await LokacijaService.GetOne(voznja.krajnja_lokacija_id);
            setKrajnjaLokacija(response2)
        } catch (error) {
            console.error("Greška prilikom učitavanja lokacije:", error);
        }
    };

    useEffect(() => {

        fetchLokacija()
        fetchVozilo()
        fetchVozac()
    })


    return (
        <div className="card mb-3 shadow-sm">
            <div className="card-body">
                <h5 className="card-title">Voznja #{voznja.id}</h5>
                <p className="card-text">
                    <strong>Datum:</strong> {format(new Date(voznja.vreme_pocetka), 'hh:mm')}<br />
                    <strong>Vozac:</strong> {vozac ? `${vozac.ime} ${vozac.prezime}`: "loading"}<br />
                    <strong>Vozilo:</strong> {vozilo ? `${vozilo.registracija} ${vozilo.marka} ${vozilo.model}`: "loading"}<br />
                    <strong>Status:</strong> {MapStatusToName(voznja.status_voznje)}<br />
                    <strong>Pocetna lokacija:</strong> {pocetnaLokacija ? pocetnaLokacija.adresa ? pocetnaLokacija.adresa : pocetnaLokacija.naziv : "loading"}<br />
                    <strong>Zavrsna lokacija:</strong> {krajnjaLokacija ? krajnjaLokacija.adresa ? krajnjaLokacija.adresa : krajnjaLokacija.naziv : "loading"}<br />
                </p>
            </div>
        </div>
    );
};

export default VoznjaCard;
