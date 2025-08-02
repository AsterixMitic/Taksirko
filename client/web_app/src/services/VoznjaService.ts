import {isSameDay, isSameMonth} from "date-fns";
import {CrudFactory} from "./data/CrudService.ts";
import type {Voznja} from "../types.ts";

export default class VoznjaService {

  public static async GetVoznjeInMonth(month: Date) {
    const voznjaCrud = CrudFactory.GetVoznjaService();
    const response = await voznjaCrud.GetAll(); // TODO: Coa da napravi endpoint samo za mesec
    const voznjeInMonth = response.filter(v => isSameMonth(new Date(v.vreme_pocetka), month));
    return voznjeInMonth;
  }
}

export class MonthInfo {
  constructor(
    public readonly month: Date,
    public readonly voznje: Voznja[]
  ) {}

  public GetVoznjeInDay(day: Date){
    return this.voznje.filter(v => isSameDay(new Date(v.vreme_pocetka), day));
  }
}