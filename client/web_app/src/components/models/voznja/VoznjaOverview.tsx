import type {Jezik, Lokacija, Vozac, Vozilo, Voznja} from "../../../types.ts";
import {format} from "date-fns";
import {CrudFactory} from "../../../services/data/CrudService.ts";
import LoadAsync from "../../common/LoadAsync.tsx";
import {MapStatusToName} from "../../../services/StatusService.ts";

interface Props{
  voznja: Voznja
}


function VoznjaOverview({voznja}: Props) {


  const vozacService=CrudFactory.GetVozaciService()
  const voziloService=CrudFactory.GetVoziloService()
  const lokacijaService=CrudFactory.GetLokacijeService()
  const jezikService=CrudFactory.GetJeziciService()


  const fetchVozac = async () => await vozacService.GetOne(voznja.vozac_id);

  const fetchVozilo = async () => await voziloService.GetOne(voznja.vozilo_id);

  const fetchLokacija1 = async () => await lokacijaService.GetOne(voznja.pocetna_lokacija_id);

  const fetchLokacija2 = async () => await lokacijaService.GetOne(voznja.krajnja_lokacija_id);

  const fetchJezik = async () => await jezikService.GetOne(voznja.trazeni_jezik_id!);






  return (
      <div className="card my-3 shadow-sm">
        <div className="card-header bg-success text-white">
          Detalji vožnje #{voznja.id}
        </div>
        <div className="card-body">
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
          {voznja.ocekivano_vreme_dolaska && (
              <div>
                <strong>Ocekivano vreme dolaska: </strong>{format(new Date(voznja.ocekivano_vreme_dolaska), 'hh:mm')}
              </div>
          )}
          {voznja.cena && (
              <div>
                <strong>Cena: </strong>{voznja.cena}
              </div>
          )}
          {voznja.nacin_placanja && (
              <div>
                <strong>Nacin placanja: </strong>{voznja.nacin_placanja}
              </div>
          )}
          {voznja.trazeni_jezik_id && (
              <div>
                <strong>Trazeni jezik: </strong>
                <LoadAsync<Jezik> inline={true} loadModel={fetchJezik} render={(jezik) => (
                    <>
                      {jezik.ime}
                    </>
                )}/>
              </div>
          )}
          {voznja.broj_leta && (
              <div>
                <strong>Broj leta: </strong>{voznja.broj_leta}
              </div>
          )}
          <div>
            <strong>Povratak: </strong>{voznja.povratak ? "Da":"Ne"}
          </div>
          {voznja.cekanje && (
              <div>
                <strong>Cekanje: </strong>{voznja.cekanje}
              </div>
          )}
          {voznja.napomena && (
              <div>
                <strong>Napomena: </strong>{voznja.napomena}
              </div>
          )}
          {voznja.recenzija && (
              <div>
                <strong>Recenzija: </strong>{voznja.recenzija}
              </div>
          )}

        </div>

      </div>
  );
}

export default VoznjaOverview;