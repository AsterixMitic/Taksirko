export type VoznjaInput = {
    vreme_pocetka: string;
    vozilo_id: number;
    vozac_id: number;
    pocetna_lokacija_id: number;
    krajnja_lokacija_id: number;
    trazeni_jezik_id?: number;
    cena?: number;
    nacin_placanja?: string;
    broj_leta?: string;
    povratak?: boolean;
    cekanje?: number;
    napomena?: string;
};