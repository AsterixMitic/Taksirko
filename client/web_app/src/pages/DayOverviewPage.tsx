// src/pages/VoznjeZaDatum.tsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import VoznjaService from "../services/VoznjaService.ts";
import type { Voznja } from "../types.ts";
import VoznjaCard from "../components/models/voznja/VoznjaPreview.tsx";
import dayPreview from "../components/calender/DayPreview.tsx";

interface Props {
    voznje: Voznja[];
}


const VoznjeZaDatum = ({voznje}: Props) => {
    const { datum } = useParams<{ datum: string }>();


    return (
        <div className="container mt-5">
            <h2>Voznje za datum: {datum}</h2>
            {voznje.length === 0 ? (
                <p>Nema vožnji za izabrani dan.</p>
            ) : (
                <ul className="list-group">
                    {voznje.map(v => (
                        <li key={v.id} className="list-group-item">
                            <VoznjaCard voznja={v} />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default VoznjeZaDatum;
