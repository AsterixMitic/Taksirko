import {type ReactElement, useEffect, useState} from "react";
import LoadingSpinner from "./Loading.tsx";

interface Props<Model> {
  loadModel: () => Promise<Model>;
  render: (m: Model) => ReactElement;
}

function LoadAsync<Model>({render, loadModel}: Props<Model>) {
  const [model, setModel] = useState<Model | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const result = await loadModel();
        setModel(result);
      }
      catch (err) {
        setError(true);
        console.error(err);
      }
      finally {
        setLoading(false);
      }
    }

    load()
  })

  return (
    <>
      {loading && <LoadingSpinner/>}
      {error && (<div className="alert alert-danger">Greška</div>)}
      {model && render(model)}
    </>
  );
}

export default LoadAsync;