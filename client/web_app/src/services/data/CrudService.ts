import ApiService from "./ApiService.ts";
import type {
  Admin,
  Dispecer,
  Firma,
  Jezik,
  Lokacija, Odsustvo,
  PromenaStatusa,
  Putnik,
  Vozac,
  Vozilo,
  Voznja
} from "../../types.ts";

export default class CrudService<Model> {

  private readonly endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  public async GetAll(): Promise<Model[]> {
    return ApiService.get<Model[]>(`${this.endpoint}`);
  }
  public async GetOne(id: number): Promise<Model> {
    return ApiService.get<Model>(`${this.endpoint}/${id}`);
  }
  public async Create(data: Model): Promise<Model> {
    return ApiService.post<Model>(`${this.endpoint}`, data);
  }
  public async Put(id: number, data: Model): Promise<Model> {
    return ApiService.put<Model>(`${this.endpoint}/${id}`, data);
  }
  public async Delete(id: number): Promise<void> {
    return ApiService.delete(`${this.endpoint}/${id}`);
  }
  public async Patch(id: number, data: any): Promise<Model> {
    return ApiService.patch<Model>(`${this.endpoint}/${id}`, data);
  }
}

export class CrudFactory {
  public static GetPutniciService() {
    return new CrudService<Putnik>("putnici");
  }
  public static GetVozaciService() {
    return new CrudService<Vozac>("vozaci");
  }
  public static GetVozilaService() {
    return new CrudService<Vozilo>("vozila");
  }
  public static GetVoznjeService() {
    return new CrudService<Voznja>("voznje");
  }
  public static GetLokacijeService() {
    return new CrudService<Lokacija>("lokacije");
  }
  public static GetFirmeService() {
    return new CrudService<Firma>("firme");
  }
  public static GetJeziciService() {
    return new CrudService<Jezik>("jezici");
  }
  public static GetDispeceriService() {
    return new CrudService<Dispecer>("dispeceri");
  }
  public static GetPromeneStatusaService() {
    return new CrudService<PromenaStatusa>("promene");
  }
  public static GetAdminiService() {
    return new CrudService<Admin>("admini");
  }
  public static GetOdsustvaService() {
    return new CrudService<Odsustvo>("odsustva");
  }
}