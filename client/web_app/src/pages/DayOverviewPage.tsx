// src/pages/VoznjeZaDatum.tsx
import { useParams } from "react-router-dom";
import type { Voznja } from "../types.ts";
import VoznjaPreview from "../components/models/voznja/VoznjaPreview.tsx";
import {useState} from "react";
import LoadAsync from "../components/common/LoadAsync.tsx";
import VoznjaService from "../services/VoznjaService.ts";

interface Props {
}


const DayOverviewPage = ({}: Props) => {
    const { datum } = useParams<{ datum: string }>();

    const [error, setError] = useState<string | null>(null);

    const loadVoznje = async (): Promise<Voznja[]> => {
        if (!datum) {
            setError("Datum nije definisan u URL-u");
            return[];
        }

        const date = new Date(datum); // Konverzija iz stringa u Date

        if (isNaN(date.getTime())) {
            setError("Nevalidan datum u URL-u: " + datum);
            return[];
        }

        const voznje = await VoznjaService.GetVoznjeInMonth(date)
        return voznje;
    }

    if (error) {
        return <div className="alert alert-danger">{error}</div>
    }

    return (
        <div className="container mt-5">
            <h2>Voznje za datum: {datum}</h2>
            <LoadAsync<Voznja[]> loadModel={loadVoznje} render={(voznje) => {
                return (
                  <ul className="list-group">
                      {voznje.map(v => (
                        <li key={v.id} className="list-group-item">
                            <VoznjaPreview voznja={v} />
                        </li>
                      ))}
                  </ul>
                )
            }}/>
        </div>
    );
};

export default DayOverviewPage;
