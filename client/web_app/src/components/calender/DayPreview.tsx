import { format } from 'date-fns';
import type {Voznja} from "../../types.ts";

interface Props {
  date: Date;
  voznje: Voznja[];
}

function DayPreview({date, voznje}: Props) {

  return (
    <div className="d-flex flex-column" style={{minHeight: "70px"}}>
      <div className="fs-5">
        {format(date, "d")}
      </div>
      {voznje.length > 0 && (
        <div className="card bg-danger p-1">
          V: {voznje.length}
        </div>
      )}
    </div>
  );
}

export default DayPreview;