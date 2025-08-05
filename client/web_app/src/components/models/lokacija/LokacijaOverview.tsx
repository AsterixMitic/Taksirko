import React from 'react';
import type {Lokacija} from "../../../types.ts";
import LocationMap from "../../map/LocationMap.tsx";

interface Props {
  lokacija: Lokacija
}

function LokacijaOverview({lokacija}: Props) {

  const showMap = (lokacija.latituda) && (lokacija.longituda);

  return (
    <>
      <div className="mb-2">{lokacija.naziv}</div>
      <div className="mb-2">{lokacija.adresa}</div>

      {showMap && (
        <LocationMap lat={lokacija.latituda!} lng={lokacija.longituda!}/>
      )}
    </>
  );
}

export default LokacijaOverview;