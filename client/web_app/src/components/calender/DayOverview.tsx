import type {Voznja} from "../../types.ts";
import VoznjaDetails from "../models/voznja/VoznjaDetails.tsx";

interface Props {
  voznje: Voznja[];
}

function DayOverview({voznje}: Props) {
  return (
    <>
      <h2 className="text-center">Voznje:</h2>
      <ul className="list-unstyled">
        {voznje.map((voznja) => (
          <li key={voznja.id}>
            <VoznjaDetails voznja={voznja}/>
          </li>
        ))}
      </ul>
    </>
  );
}

export default DayOverview;