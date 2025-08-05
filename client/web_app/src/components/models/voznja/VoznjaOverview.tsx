import type {Jezik, Lokacija, Vozac, Vozilo, Voznja} from "../../../types.ts";
import {format} from "date-fns";
import {CrudFactory} from "../../../services/data/CrudService.ts";
import LoadAsync from "../../common/LoadAsync.tsx";
import {MapStatusToName} from "../../../services/StatusService.ts";
import {useState} from "react";
import PopUpWindow from "../../common/PopUpWindow.tsx";
import LokacijaOverview from "../lokacija/LokacijaOverview.tsx";
import VoziloDetails from "../vozilo/VoziloDetails.tsx";
import VozacDetails from "../vozac/VozacDetails.tsx";
import CardListItem from "../../common/CardListItem.tsx";
import {nazivJezikaNaSrpskom} from "../../../services/JezikService.ts";

interface Props{
  voznja: Voznja
}


function VoznjaOverview({voznja}: Props) {

  const vozacService=CrudFactory.GetVozaciService()
  const voziloService=CrudFactory.GetVozilaService()
  const lokacijaService=CrudFactory.GetLokacijeService()
  const jezikService=CrudFactory.GetJeziciService()

  const fetchVozac = async () => await vozacService.GetOne(voznja.vozac_id);
  const fetchVozilo = async () => await voziloService.GetOne(voznja.vozilo_id);
  const fetchLokacija1 = async () => await lokacijaService.GetOne(voznja.pocetna_lokacija_id);
  const fetchLokacija2 = async () => await lokacijaService.GetOne(voznja.krajnja_lokacija_id);
  const fetchJezik = async () => await jezikService.GetOne(voznja.trazeni_jezik_id!);


  const [lokacijaDisplay, setLokacijaDisplay] = useState<Lokacija | null>(null);
  const [voziloDisplay, setVoziloDisplay] = useState<Vozilo | null>(null);
  const [vozacDisplay, setVozacDisplay] = useState<Vozac | null>(null);

  return (
    <>
      {lokacijaDisplay && (
        <PopUpWindow onClose={() => setLokacijaDisplay(null)} title="Lokacija">
          <LokacijaOverview lokacija={lokacijaDisplay}/>
        </PopUpWindow>
      )}

      {voziloDisplay && (
        <PopUpWindow onClose={() => setVoziloDisplay(null)} title="Vozilo">
          <VoziloDetails vozilo={voziloDisplay}/>
        </PopUpWindow>
      )}

      {vozacDisplay && (
        <PopUpWindow onClose={() => setVozacDisplay(null)} title="Vozač">
          <VozacDetails vozac={vozacDisplay}/>
        </PopUpWindow>
      )}

      <div className="card my-3 shadow-sm fs-5">

        <div className="card-header bg-success text-white">
          Detalji vožnje #{voznja.id}
        </div>
        <div className="card-body">
          <CardListItem>
            <strong>Vreme: </strong> {format(new Date(voznja.vreme_pocetka), 'hh:mm')}
          </CardListItem>

          <CardListItem>
            <strong>Vozač: </strong>
            <LoadAsync<Vozac> inline={true} loadModel={fetchVozac} render={(vozac) => (
              <div onClick={() => setVozacDisplay(vozac)} className="stw-link">
                {`${vozac.ime} ${vozac.prezime}`}
              </div>
            )}/>
          </CardListItem>

          <CardListItem>
            <strong>Vozilo: </strong>
            <LoadAsync<Vozilo> inline={true} loadModel={fetchVozilo} render={(vozilo) => (
              <div onClick={() => setVoziloDisplay(vozilo)} className="stw-link">
                {`${vozilo.registracija} ${vozilo.marka} ${vozilo.model}`}
              </div>
            )}/>
          </CardListItem>


          <CardListItem>
            <strong>Status: </strong> {MapStatusToName(voznja.status_voznje)}
          </CardListItem>

          <CardListItem>
            <strong>Početna lokacija: </strong>
            <LoadAsync<Lokacija> inline={true} loadModel={fetchLokacija1} render={(pocetnaLokacija) => (
              <div onClick={() => setLokacijaDisplay(pocetnaLokacija)} className="stw-link">
                {pocetnaLokacija.naziv ? pocetnaLokacija.naziv : pocetnaLokacija.adresa}
              </div>
            )}/>
          </CardListItem>

          <CardListItem>
            <strong>Završna lokacija: </strong>
            <LoadAsync<Lokacija> inline={true} loadModel={fetchLokacija2} render={(krajnjaLokacija) => (
              <div onClick={() => setLokacijaDisplay(krajnjaLokacija)} className="stw-link">
                {krajnjaLokacija.naziv ? krajnjaLokacija.naziv : krajnjaLokacija.adresa}
              </div>
            )}/>
          </CardListItem>
          {voznja.ocekivano_vreme_dolaska && (
            <CardListItem>
              <strong>Očekivano vreme dolaska: </strong>{format(new Date(voznja.ocekivano_vreme_dolaska), 'hh:mm')}
            </CardListItem>
          )}
          {voznja.cena && (
            <CardListItem>
              <strong>Cena: </strong>{voznja.cena} RSD
            </CardListItem>
          )}
          {voznja.nacin_placanja && (
            <CardListItem>
              <strong>Način placanja: </strong>{voznja.nacin_placanja}
            </CardListItem>
          )}
          {voznja.trazeni_jezik_id && (
            <CardListItem>
              <strong>Traženi jezik: </strong>
              <LoadAsync<Jezik> inline={true} loadModel={fetchJezik} render={(jezik) => (
                <>
                  {nazivJezikaNaSrpskom(jezik.ime)}
                </>
              )}/>
            </CardListItem>
          )}
          {voznja.broj_leta && (
            <CardListItem>
              <strong>Broj leta: </strong>{voznja.broj_leta}
            </CardListItem>
          )}
          <CardListItem>
            <strong>Povratak: </strong>{voznja.povratak ? "Da":"Ne"}
          </CardListItem>
          {voznja.cekanje && (
            <CardListItem>
              <strong>Čekanje: </strong>{voznja.cekanje}h
            </CardListItem>
          )}
          {voznja.napomena && (
            <CardListItem>
              <strong>Napomena: </strong>{voznja.napomena}
            </CardListItem>
          )}
          {voznja.recenzija && (
            <CardListItem>
              <strong>Recenzija: </strong>{voznja.recenzija}
            </CardListItem>
          )}

        </div>

      </div>
    </>
  );
}

export default VoznjaOverview;