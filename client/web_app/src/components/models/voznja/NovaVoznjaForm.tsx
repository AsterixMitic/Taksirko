import React, { useEffect, useState } from 'react';
import { CrudFactory } from "../../../services/data/CrudService.ts";
import { useNavigate, useSearchParams } from "react-router-dom";
import type { Jezik, Lokacija, Vozac, Vozilo, Voznja } from "../../../types.ts";
import { nazivJezikaNaSrpskom } from "../../../services/JezikService.ts";
import LoadingSpinner from "../../common/Loading.tsx";
import PopUpWindow from "../../common/PopUpWindow.tsx";
import LokacijaForm from "../lokacija/LokacijaForm.tsx";
import {validateVoznja} from "../../validation/validation.ts";

function NovaVoznjaForm() {

    const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});

    const [formData, setFormData] = useState<Partial<Voznja> & {
        pocetna_lokacija_naziv?: string;
        krajnja_lokacija_naziv?: string;
    }>({});

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

    const [searchParams] = useSearchParams();

    useEffect(() => {
        vozacService.GetAll().then(setVozaci);
        voziloService.GetAll().then(setVozila);
        lokacijaService.GetAll().then(setLokacije);
        jezikService.GetAll().then(setJezici);
    }, []);

    // Automatski popuni vreme_pocetka iz query parametra "datum" (format: yyyy-MM-dd)
    useEffect(() => {
        const datumParam = searchParams.get("datum");
        if (datumParam) {
            const datum = new Date(datumParam);
            if (!isNaN(datum.getTime())) {
                // Za input type="datetime-local" format: "YYYY-MM-DDTHH:mm"
                // Pošto datumParam može biti samo datum bez vremena, dodajemo podrazumevano vreme 08:00
                datum.setHours(8, 0, 0, 0);
                const localISO = datum.toISOString().slice(0, 16);
                setFormData(prev => ({
                    ...prev,
                    vreme_pocetka: localISO
                }));
            }
        }
    }, [searchParams]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [novaLokacija, setNovaLokacija] = useState<boolean>(false);

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

        const errors = validateVoznja(formData);
        setFieldErrors(errors);

        if (Object.keys(errors).length > 0) {
            return; // ima grešaka, ne nastavljamo
        }

        setLoading(true);
        setError(null);
        try {
            const created = await voznjaService.Create(formData as Voznja);
            const datum = new Date(formData.vreme_pocetka!).toISOString().split("T")[0];
            navigate(`/dispecer/day/${datum}`);
        } catch (error) {
            setError("Greška pri dodavanju vožnje");
            console.error("Greška prilikom kreiranja vožnje:", error);
            console.log("Postavljena greška:", "Greška pri dodavanju vožnje");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container my-4">

            {novaLokacija && (
                <PopUpWindow onClose={() => setNovaLokacija(false)} title="Nova lokacija">
                    <LokacijaForm
                        onCreate={async (nova) => {
                            const lokacijaCrud = CrudFactory.GetLokacijeService();
                            const novaLok = await lokacijaCrud.Create(nova);
                            setLokacije((prev) => [...prev, novaLok]);
                            setFormData((prev) => ({
                                ...prev,
                                pocetna_lokacija_id: novaLok.id,
                                pocetna_lokacija_naziv: novaLok.naziv || novaLok.adresa
                            }));
                            setNovaLokacija(false);
                        }}
                    />
                </PopUpWindow>
            )}

            <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
                <h4 className="mb-4">Dodaj novu vožnju</h4>

                <div className="mb-3">
                    <label className="form-label">Vreme početka</label>
                    <input
                        type="datetime-local"
                        name="vreme_pocetka"
                        value={formData.vreme_pocetka || ""}
                        onChange={handleChange}
                        className={`form-control ${fieldErrors.vreme_pocetka ? "is-invalid" : ""}`}
                    />
                    {fieldErrors.vreme_pocetka && <div className="invalid-feedback">{fieldErrors.vreme_pocetka}</div>}
                </div>

                <div className="mb-3">
                    <label className="form-label">Vozilo</label>
                    <select name="vozilo_id" onChange={handleChange} className={`form-select ${fieldErrors.vozilo_id ? 'is-invalid' : ''}`}>
                        <option value="">Izaberi vozilo</option>
                        {vozila.map(v => (
                            <option key={v.id} value={v.id}>
                                Br. {v.redni_broj} - {v.registracija} - {v.marka} {v.model}
                            </option>
                        ))}
                    </select>
                    {fieldErrors.vozilo_id && <div className="invalid-feedback">{fieldErrors.vozilo_id}</div>}
                </div>

                <div className="mb-3">
                    <label className="form-label">Vozač</label>
                    <select name="vozac_id" onChange={handleChange} className={`form-select ${fieldErrors.vozac_id ? 'is-invalid' : ''}`}>
                        <option value="">Izaberi vozača</option>
                        {vozaci.map(v => (
                            <option key={v.id} value={v.id}>
                                {v.ime} {v.prezime}
                            </option>
                        ))}
                    </select>
                    {fieldErrors.vozac_id && <div className="invalid-feedback">{fieldErrors.vozac_id}</div>}

                </div>

                <div className="mb-3">
                    <label className="form-label">Početna lokacija</label>
                    <div className="row g-2">
                        <div className="col-9">
                            <input
                                type="text"
                                list="pocetne-lokacije"
                                className={`form-control ${fieldErrors.pocetna_lokacija_naziv ? 'is-invalid' : ''}`}
                                value={formData.pocetna_lokacija_naziv || ""}
                                onChange={(e) => {
                                    const naziv = e.target.value;
                                    const lok = lokacije.find(l => (l.naziv || l.adresa) === naziv);
                                    setFormData(prev => ({
                                        ...prev,
                                        pocetna_lokacija_id: lok?.id || undefined,
                                        pocetna_lokacija_naziv: naziv
                                    }));
                                }}
                            />
                            {fieldErrors.pocetna_lokacija_naziv && <div className="invalid-feedback">{fieldErrors.pocetna_lokacija_naziv}</div>}

                            <datalist id="pocetne-lokacije">
                                {lokacije.map(l => (
                                    <option key={l.id} value={l.naziv || l.adresa} />
                                ))}
                            </datalist>
                        </div>
                        <div className="col-3">
                            <button
                                type="button"
                                className="btn btn-outline-secondary w-100"
                                onClick={() => setNovaLokacija(true)}
                            >
                                Dodaj novu
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mb-3">
                    <label className="form-label">Krajnja lokacija</label>
                    <div className="row g-2">
                        <div className="col-9">
                            <input
                                type="text"
                                list="krajnje-lokacije"
                                className={`form-control ${fieldErrors.krajnja_lokacija_naziv ? 'is-invalid' : ''}`}
                                value={formData.krajnja_lokacija_naziv || ""}
                                onChange={(e) => {
                                    const naziv = e.target.value;
                                    const lok = lokacije.find(l => (l.naziv || l.adresa) === naziv);
                                    setFormData(prev => ({
                                        ...prev,
                                        krajnja_lokacija_id: lok?.id || undefined,
                                        krajnja_lokacija_naziv: naziv
                                    }));
                                }}
                            />
                            {fieldErrors.krajnja_lokacija_naziv && <div className="invalid-feedback">{fieldErrors.krajnja_lokacija_naziv}</div>}

                            <datalist id="krajnje-lokacije">
                                {lokacije.map(l => (
                                    <option key={l.id} value={l.naziv || l.adresa} />
                                ))}
                            </datalist>
                        </div>
                        <div className="col-3">
                            <button
                                type="button"
                                className="btn btn-outline-secondary w-100"
                                onClick={() => setNovaLokacija(true)}
                            >
                                Dodaj novu
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mb-3">
                    <label className="form-label">Traženi jezik</label>
                    <select name="trazeni_jezik_id" onChange={handleChange} className="form-select">
                        <option value="">Bez jezika</option>
                        {jezici.map(j => (
                            <option key={j.id} value={j.id}>
                                {nazivJezikaNaSrpskom(j.ime)}
                            </option>
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

                {formData.povratak && (
                    <div className="mb-3">
                        <label className="form-label">Čekanje (h)</label>
                        <input type="number" name="cekanje" onChange={handleChange} className="form-control" />
                    </div>
                )}

                <div className="mb-3">
                    <label className="form-label">Napomena</label>
                    <textarea name="napomena" onChange={handleChange} className="form-control" rows={3}></textarea>
                </div>

                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? <LoadingSpinner /> : "Sačuvaj"}
                </button>
                {error && <div className="alert alert-danger">{error}</div>}
            </form>
        </div>
    );
}

export default NovaVoznjaForm;
