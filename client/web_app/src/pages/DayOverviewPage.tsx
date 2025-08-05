// src/pages/VoznjeZaDatum.tsx
import {useNavigate, useParams} from "react-router-dom";
import type { Voznja } from "../types.ts";
import VoznjaPreview from "../components/models/voznja/VoznjaPreview.tsx";
import {useState} from "react";
import LoadAsync from "../components/common/LoadAsync.tsx";
import VoznjaService from "../services/VoznjaService.ts";
import {format} from "date-fns";

interface Props {
}


const DayOverviewPage = ({}: Props) => {
    const { datum } = useParams<{ datum: string }>();
    const [formatDate, setFormatDate] = useState<string | undefined>(datum);

    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

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

        setFormatDate(format(date, "dd.MM.yyyy"));

        const voznje = await VoznjaService.GetVoznjeInDay(date)
        return voznje;
    }

    if (error) {
        return <div className="alert alert-danger">{error}</div>
    }

    return (
        <div className="container mt-5">
            <h2>Voznje za datum: {formatDate}</h2>
            <LoadAsync<Voznja[]> loadModel={loadVoznje} render={(voznje) => {
                return (
                  <div className="d-flex flex-row flex-wrap">
                      {voznje.map(v => (
                        <div key={v.id}
                             style={{marginLeft: "20px", cursor: "pointer"}}
                             onClick={() => {navigate(`/dispecer/voznja/${v.id}`)
                        }}
                        >
                            <VoznjaPreview voznja={v} />
                        </div>
                      ))}
                  </div>
                )
            }}/>
        </div>
    );
};

export default DayOverviewPage;
