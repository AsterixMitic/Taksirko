import React from 'react';
import type {Lokacija, Vozac, Vozilo, Voznja} from '../../../types.ts';
import {CrudFactory} from "../../../services/data/CrudService.ts";
import {format} from "date-fns";
import {MapStatusToName} from "../../../services/StatusService.ts";
import LoadAsync from "../../common/LoadAsync.tsx";

interface VoznjaCardProps {
    voznja: Voznja;
}


const VoznjaPreview: React.FC<VoznjaCardProps> = ({ voznja }) => {


    const vozacService=CrudFactory.GetVozaciService()
    const voziloService=CrudFactory.GetVozilaService()
    const lokacijaService=CrudFactory.GetLokacijeService()

    const fetchVozac = async () => await vozacService.GetOne(voznja.vozac_id);

    const fetchVozilo = async () => await voziloService.GetOne(voznja.vozilo_id);

    const fetchLokacija1 = async () => await lokacijaService.GetOne(voznja.pocetna_lokacija_id);

    const fetchLokacija2 = async () => await lokacijaService.GetOne(voznja.krajnja_lokacija_id);



    return (
        <div className="card mb-3 shadow-sm">
            <div className="card-body">
                <h5 className="card-title">Voznja #{voznja.id}</h5>
                <div className="card-text">

                    <div>
                        <strong>Vreme: </strong> {format(new Date(voznja.vreme_pocetka), 'hh:mm')}
                    </div>

                    <div>
                        <strong>Vozac: </strong>
                        <LoadAsync<Vozac> inline={true} loadModel={fetchVozac} render={(vozac) => (
                            <>
                                {`${vozac.ime} ${vozac.prezime}`}
                            </>
                        )}/>
                    </div>

                    <div>
                        <strong>Vozilo: </strong>
                        <LoadAsync<Vozilo> inline={true} loadModel={fetchVozilo} render={(vozilo) => (
                            <>
                                {`${vozilo.registracija} ${vozilo.marka} ${vozilo.model}`}
                            </>
                        )}/>
                    </div>


                    <div>
                        <strong>Status: </strong> {MapStatusToName(voznja.status_voznje)}
                    </div>

                    <div>
                        <strong>Pocetna lokacija: </strong>
                        <LoadAsync<Lokacija> inline={true} loadModel={fetchLokacija1} render={(pocetnaLokacija) => (
                            <>
                                {pocetnaLokacija.adresa ? pocetnaLokacija.adresa : pocetnaLokacija.naziv}
                            </>
                        )}/>
                    </div>

                    <div>
                        <strong>Zavrsna lokacija: </strong>
                        <LoadAsync<Lokacija> inline={true} loadModel={fetchLokacija2} render={(krajnjaLokacija) => (
                            <>
                                {krajnjaLokacija.adresa ? krajnjaLokacija.adresa : krajnjaLokacija.naziv}
                            </>
                        )}/>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default VoznjaPreview;
