import ApiService from "./ApiService.ts";
import type {Putnik, Vozac, Vozilo, Voznja} from "../../types.ts";

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
  public async Post(data: Model): Promise<Model> {
    return ApiService.post<Model>(`${this.endpoint}`, data);
  }
  public async Put(id: number, data: Model): Promise<Model> {
    return ApiService.put<Model>(`${this.endpoint}/${id}`, data);
  }
  public async Delete(id: number): Promise<void> {
    return ApiService.delete(`${this.endpoint}/${id}`);
  }
}

export class CrudFactory {
  public static GetPutniciService() {
    return new CrudService<Putnik>("putnici");
  }
  public static GetVozaciService() {
    return new CrudService<Vozac>("vozaci");
  }
  public static GetVoziloService() {
    return new CrudService<Vozilo>("vozila");
  }
  public static GetVoznjaService() {
    return new CrudService<Voznja>("voznje");
  }
}