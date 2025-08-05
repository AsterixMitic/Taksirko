export type Firma = {
  id: number;
  naziv: string;
  pib: string;
};

export type Lokacija = {
  id: number;
  adresa?: string;
  naziv?: string;
  latituda?: number;
  longituda?: number;
};

export type Jezik = {
  id: number;
  ime: string;
};

export type Vozac = {
  id: number;
  ime: string;
  prezime: string;
  jmbg: string;
  slika_url?: string;
  broj_telefona: string;
  username: string;
  password_hash: string;
  trenutno_zaposljen: boolean;
  napomena?: string;
};

export type Vozilo = {
  id: number;
  redni_broj: number;
  registracija: string;
  marka?: string;
  model?: string;
  boja?: string;
  karoserija?: string;
  broj_putnika: string;
  gorivo: string;
  godiste: number;
};

export type Putnik = {
  id: number;
  ime?: string;
  prezime?: string;
  broj_telefona?: string;
};

export type Dispecer = {
  id: number;
  ime: string;
  prezime: string;
  username: string;
  password_hash: string;
  broj_telefona: string;
};

export type Voznja = {
  id: number;
  pocetna_lokacija_id: number; //
  krajnja_lokacija_id: number; //
  vreme_pocetka: string; // ISO string
  ocekivano_vreme_dolaska?: string; //
  cena?: number; //
  nacin_placanja?: string; //
  trazeni_jezik_id?: number;  //
  broj_leta?: string; //
  napomena?: string;
  recenzija?: string;
  status_voznje: number; //
  povratak: boolean; //
  cekanje?: string; //
  vozac_id: number; //
  vozilo_id: number; //
};

export type PromenaStatusa = {
  id: number;
  novi_status_voznje: number;
  vreme: string; // ISO string
};

export type Admin = {
  id: number;
  username: string;
  password_hash: string;
};

export type Odsustvo = {
  id: number;
  vozac_id: number;
  pocetni_datum: string; // yyyy-mm-dd
  krajnji_datum?: string;
  razlog_odsustva: string;
};
