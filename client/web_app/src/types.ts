export type Vozac = {
  id: number;
  ime: string;
  prezime: string;
  jmbg: string;
  slika_url: string;
  broj_telefona: string;
};

export type Vozilo = {
  id: number;
  redni_broj: number;
  registracija: string;
  marka: string;
  model: string;
  boja: string;
  karoserija: string;
  broj_putnika: string;
  gorivo: string;
  godiste: number;
};

export type Voznja = {
  id: number;
  pocetna_lokacija_id: number;
  krajnja_lokacija_id: number;
  vreme_pocetka: string; // u frontend-u obično koristimo string za Date
  ocekivano_vreme_dolaska: string;
  cena: string; // decimal u backendu, u frontend može biti string ili number, zavisi
  nacin_placanja: string;
  trazeni_jezik_id: number;
  broj_leta: string;
  napomena: string;
  status_voznje: number;
};

export type Putnik = {
  id: number;
  ime: string;
  prezime: string;
  broj_telefona: string;
};

export type PromenaStatusa = {
  id: number;
  novi_status_voznje: number;
  vreme: string;
};

export type Povratak = {
  id: number;
  vreme_pocetka: string;
  ocekivano_vreme_dolaska: string;
  status_voznje: number;
  cekanje: number;
};

export type Lokacija = {
  id: number;
  adresa: string;
  naziv: string;
  latituda: number;   // decimal(7,5) -> number
  longituda: number;  // decimal(8,5) -> number
};

export type Jezik = {
  id: number;
  ime: string;
};

export type Firma = {
  id: number;
  naziv: string;
  pib: string;
};

export type Dispecer = {
  id: number;
  ime: string;
  prezime: string;
  username: string;
  password_hash: string;
  broj_telefona: string;
};
