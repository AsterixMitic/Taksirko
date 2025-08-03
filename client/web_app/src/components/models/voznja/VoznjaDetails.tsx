import React from 'react';
import type { Voznja } from '../../../types';

type VoznjaDetailsProps = {
  voznja: Voznja;
};

const VoznjaDetails: React.FC<VoznjaDetailsProps> = ({ voznja }) => {
  return (
    <div className="card my-3 shadow-sm">
      <div className="card-header bg-success text-white">
        Detalji vožnje #{voznja.id}
      </div>
      <div className="card-body">
        <ul className="list-group list-group-flush">
          <li className="list-group-item"><strong>Početna lokacija ID:</strong> {voznja.pocetna_lokacija_id}</li>
          <li className="list-group-item"><strong>Krajnja lokacija ID:</strong> {voznja.krajnja_lokacija_id}</li>
          <li className="list-group-item"><strong>Vreme početka:</strong> {voznja.vreme_pocetka}</li>
          <li className="list-group-item"><strong>Očekivano vreme dolaska:</strong> {voznja.ocekivano_vreme_dolaska}</li>
          <li className="list-group-item"><strong>Cena:</strong> {voznja.cena} RSD</li>
          <li className="list-group-item"><strong>Način plaćanja:</strong> {voznja.nacin_placanja}</li>
          <li className="list-group-item"><strong>Traženi jezik ID:</strong> {voznja.trazeni_jezik_id}</li>
          <li className="list-group-item"><strong>Broj leta:</strong> {voznja.broj_leta}</li>
          <li className="list-group-item"><strong>Napomena:</strong> {voznja.napomena || 'Nema'}</li>
          <li className="list-group-item"><strong>Status vožnje:</strong> {voznja.status_voznje}</li>
        </ul>
      </div>
    </div>
  );
};

export default VoznjaDetails;
