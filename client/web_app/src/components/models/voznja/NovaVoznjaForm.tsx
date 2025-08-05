import React, { useEffect, useState } from 'react';
import { CrudFactory } from "../../../services/data/CrudService.ts";
import { useNavigate } from "react-router-dom";
import type { Jezik, Lokacija, Vozac, Vozilo, Voznja } from "../../../types.ts";
import {nazivJezikaNaSrpskom} from "../../../services/JezikService.ts";

function NovaVoznjaForm() {
    const [formData, setFormData] = useState<Partial<Voznja>>({});
    const navigate = useNavigate();

    const vozacService = CrudFactory.GetVozaciService();
    const voziloService = CrudFactory.GetVozilaService();
    const lokacijaService = CrudFactory.GetLokacijeService();
    const jezikService = CrudFactory.GetJeziciService();
    const voznjaService = CrudFactory.GetVoznjeService();

    const [vozaci, setVozaci] = useState<Vozac[]>([]);
    const [vozila, setVozila] = useState<Vozilo[]>([]);
    const [lokacije, setLokacije] = useState<Lokacija[]>([]);
    const [jezici, setJezici] = useState<Jezik[]>([]);

    useEffect(() => {
        vozacService.GetAll().then(setVozaci);
        voziloService.GetAll().then(setVozila);
        lokacijaService.GetAll().then(setLokacije);
        jezikService.GetAll().then(setJezici);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const updatedValue = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;

        setFormData(prev => ({
            ...prev,
            [name]: updatedValue
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setFormData(prev => ({
                ...prev,
                id: 0
            }));
            const created = await voznjaService.Create(formData as Voznja);
            navigate(`/voznje/${created.id}`);
        } catch (error) {
            console.error("Greška prilikom kreiranja vožnje:", error);
        }
    };

    return (
        <div className="container my-4">
            <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
                <h4 className="mb-4">Dodaj novu vožnju</h4>

                <div className="mb-3">
                    <label className="form-label">Vreme početka</label>
                    <input type="datetime-local" name="vreme_pocetka" onChange={handleChange} className="form-control" />
                </div>

                <div className="mb-3">
                    <label className="form-label">Vozilo</label>
                    <select name="vozilo_id" onChange={handleChange} className="form-select">
                        <option value="">Izaberi vozilo</option>
                        {vozila.map(v => (
                            <option key={v.id} value={v.id}>Br. {v.redni_broj} - {v.registracija} - {v.marka} {v.model}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Vozač</label>
                    <select name="vozac_id" onChange={handleChange} className="form-select">
                        <option value="">Izaberi vozača</option>
                        {vozaci.map(v => (
                            <option key={v.id} value={v.id}>{v.ime} {v.prezime}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Početna lokacija</label>
                    <select name="pocetna_lokacija_id" onChange={handleChange} className="form-select">
                        <option value="">Izaberi</option>
                        {lokacije.map(l => (
                            <option key={l.id} value={l.id}>{l.naziv || l.adresa}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Krajnja lokacija</label>
                    <select name="krajnja_lokacija_id" onChange={handleChange} className="form-select">
                        <option value="">Izaberi</option>
                        {lokacije.map(l => (
                            <option key={l.id} value={l.id}>{l.naziv || l.adresa}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Traženi jezik</label>
                    <select name="trazeni_jezik_id" onChange={handleChange} className="form-select">
                        <option value="">Bez jezika</option>
                        {jezici.map(j => (
                            <option key={j.id} value={j.id}>{nazivJezikaNaSrpskom(j.ime)}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Cena</label>
                    <input type="number" name="cena" onChange={handleChange} className="form-control" />
                </div>

                <div className="mb-3">
                    <label className="form-label">Način plaćanja</label>
                    <input type="text" name="nacin_placanja" onChange={handleChange} className="form-control" />
                </div>

                <div className="mb-3">
                    <label className="form-label">Broj leta</label>
                    <input type="text" name="broj_leta" onChange={handleChange} className="form-control" />
                </div>

                <div className="form-check mb-3">
                    <input type="checkbox" name="povratak" onChange={handleChange} className="form-check-input" id="povratakCheck" />
                    <label className="form-check-label" htmlFor="povratakCheck">Povratak</label>
                </div>

                <div className="mb-3">
                    <label className="form-label">Čekanje (h)</label>
                    <input type="number" name="cekanje" onChange={handleChange} className="form-control" />
                </div>

                <div className="mb-3">
                    <label className="form-label">Napomena</label>
                    <textarea name="napomena" onChange={handleChange} className="form-control" rows={3}></textarea>
                </div>

                <button type="submit" className="btn btn-primary">Sačuvaj</button>
            </form>
        </div>
    );
}

export default NovaVoznjaForm;
