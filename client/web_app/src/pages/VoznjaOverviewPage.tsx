import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import type { Voznja } from "../types";
import CrudService, {CrudFactory} from "../services/data/CrudService.ts";
import LoadingSpinner from "../components/common/Loading.tsx";
import VoznjaOverview from "../components/models/voznja/VoznjaOverview.tsx";

function VoznjaOverviewPage() {
  const { voznja_id } = useParams<{ voznja_id: string }>();

  const [voznja, setVoznja] = useState<Voznja | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadVoznja = async () => {

    try{
      const voznja_id_num = Number(voznja_id);
      const VoznjaService = CrudFactory.GetVoznjeService();
      const response = await VoznjaService.GetOne(voznja_id_num);

      setVoznja(response);
    }
    catch (e)
    {
      console.error(e);
      setError("Greška pri učitavanju.");
    }
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadVoznja();
  }, []);

  return (
    <div className="container mt-5">
      {loading && (<LoadingSpinner/>)}
      {error && (<div className="alert alert-danger">{error}</div>)}
      {voznja && (
        <VoznjaOverview voznja={voznja}/>
      )}
    </div>
  );
}

export default VoznjaOverviewPage;