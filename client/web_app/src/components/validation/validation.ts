import type {Voznja} from "../../types.ts";

export interface ValidationErrors {
    [key: string]: string;
}

export function validateVoznja(formData: Partial<Voznja>): ValidationErrors {
    const errors: ValidationErrors = {};

    if (!formData.vreme_pocetka) {
        errors.vreme_pocetka = "Vreme početka je obavezno";
    }
    if (!formData.vozilo_id) {
        errors.vozilo_id = "Vozilo je obavezno";
    }
    if (!formData.vozac_id) {
        errors.vozac_id = "Vozač je obavezan";
    }
    if (!formData.pocetna_lokacija_id) {
        errors.pocetna_lokacija_naziv = "Početna lokacija je obavezna";
    }
    if (!formData.krajnja_lokacija_id) {
        errors.krajnja_lokacija_naziv = "Krajnja lokacija je obavezna";
    }

    return errors;
}
