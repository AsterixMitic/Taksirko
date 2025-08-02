import React from 'react';
import type { Vozilo } from '../../../types.ts';

type VoziloDetailsProps = {
  vozilo: Vozilo;
};

const VoziloDetails: React.FC<VoziloDetailsProps> = ({ vozilo }) => {
  return (
    <div className="card my-3 shadow-sm">
      <div className="card-header bg-primary text-white fs-3">
        Vozilo br.{vozilo.redni_broj} – {vozilo.marka} {vozilo.model}
      </div>
      <div className="card-body">
        <ul className="list-group list-group-flush">
          <li className="list-group-item"><strong>Registracija:</strong> {vozilo.registracija}</li>
          <li className="list-group-item"><strong>Marka:</strong> {vozilo.marka}</li>
          <li className="list-group-item"><strong>Model:</strong> {vozilo.model}</li>
          <li className="list-group-item"><strong>Boja:</strong> {vozilo.boja}</li>
          <li className="list-group-item"><strong>Karoserija:</strong> {vozilo.karoserija}</li>
          <li className="list-group-item"><strong>Broj putnika:</strong> {vozilo.broj_putnika}</li>
          <li className="list-group-item"><strong>Gorivo:</strong> {vozilo.gorivo}</li>
          <li className="list-group-item"><strong>Godište:</strong> {vozilo.godiste}</li>
        </ul>
      </div>
    </div>
  );
};

export default VoziloDetails;
