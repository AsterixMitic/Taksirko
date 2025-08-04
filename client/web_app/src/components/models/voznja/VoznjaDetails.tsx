import React from 'react';
import type { Voznja } from '../../../types';
import { format } from 'date-fns';

type VoznjaDetailsProps = {
  voznja: Voznja;
};

const VoznjaDetails: React.FC<VoznjaDetailsProps> = ({ voznja }) => {
  const formatDate = (iso?: string) =>
    iso ? format(new Date(iso), 'dd.MM.yyyy. HH:mm') : 'Nepoznato';

  return (
    <div className="card my-3 shadow-sm">
      <div className="card-header bg-success text-white">
        Detalji vožnje #{voznja.id}
      </div>
      <div className="card-body">
        <ul className="list-group list-group-flush">
          <li className="list-group-item"><strong>Početna lokacija ID:</strong> {voznja.pocetna_lokacija_id}</li>
          <li className="list-group-item"><strong>Krajnja lokacija ID:</strong> {voznja.krajnja_lokacija_id}</li>
          <li className="list-group-item"><strong>Vreme početka:</strong> {formatDate(voznja.vreme_pocetka)}</li>
          <li className="list-group-item"><strong>Očekivano vreme dolaska:</strong> {formatDate(voznja.ocekivano_vreme_dolaska)}</li>
          <li className="list-group-item"><strong>Cena:</strong> {voznja.cena != null ? `${voznja.cena} RSD` : 'Nije uneta'}</li>
          <li className="list-group-item"><strong>Način plaćanja:</strong> {voznja.nacin_placanja || 'Nije definisano'}</li>
          <li className="list-group-item"><strong>Traženi jezik ID:</strong> {voznja.trazeni_jezik_id ?? 'Nije definisano'}</li>
          <li className="list-group-item"><strong>Broj leta:</strong> {voznja.broj_leta || 'Nema'}</li>
          <li className="list-group-item"><strong>Napomena:</strong> {voznja.napomena || 'Nema'}</li>
          <li className="list-group-item"><strong>Recenzija:</strong> {voznja.recenzija || 'Nema'}</li>
          <li className="list-group-item"><strong>Status vožnje:</strong> {voznja.status_voznje}</li>
          <li className="list-group-item"><strong>Povratak:</strong> {voznja.povratak ? 'Da' : 'Ne'}</li>
          <li className="list-group-item"><strong>Čekanje:</strong> {voznja.cekanje || 'Nema'}</li>
          <li className="list-group-item"><strong>Vozač ID:</strong> {voznja.vozac_id}</li>
          <li className="list-group-item"><strong>Vozilo ID:</strong> {voznja.vozilo_id}</li>
        </ul>
      </div>
    </div>
  );
};

export default VoznjaDetails;
