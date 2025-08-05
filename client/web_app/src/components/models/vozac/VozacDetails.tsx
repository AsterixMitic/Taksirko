
import React from 'react';
import type { Vozac } from '../../../types.ts';

type Props = {
  vozac: Vozac;
};

const VozacDetails = ({ vozac }: Props) => {
  return (
    <>
      <div className="text-white fs-3 mb-2 text-center">
        Vozač <em>{vozac.ime} {vozac.prezime}</em>
      </div>
      <div className="d-flex flex-column align-items-center">
        {vozac.slika_url && (
          <img
            src={vozac.slika_url}
            alt={`${vozac.ime} ${vozac.prezime}`}
            className="img-thumbnail mb-3"
            style={{ maxWidth: '200px' }}
          />
        )}
        <ul className="list-group w-100">
          <li className="list-group-item"><strong>JMBG:</strong> {vozac.jmbg}</li>
          <li className="list-group-item"><strong>Telefon:</strong> {vozac.broj_telefona}</li>
          <li className="list-group-item"><strong>Korisničko ime:</strong> {vozac.username}</li>
          <li className="list-group-item"><strong>Status:</strong> {vozac.trenutno_zaposljen ? 'Zaposlen' : 'Nije zaposlen'}</li>
          {vozac.napomena && (
            <li className="list-group-item"><strong>Napomena:</strong> {vozac.napomena}</li>
          )}
        </ul>
      </div>
    </>
  );
};

export default VozacDetails;
