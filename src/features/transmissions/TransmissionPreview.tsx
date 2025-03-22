import React from "react";
import { ITransmission } from "../../types/GeneralTypes";
import { Link } from "react-router";
import { DateTime } from "luxon";

interface TransmissionPreviewProps {
  transmission: ITransmission;
  key: string;
}
function TransmissionPreview({
  transmission,
  ...props
}: TransmissionPreviewProps) {
  return (
    <Link to={`/transmissions/${transmission.id}`}>
      <div key={props.key} className="d-flex justify-content-between">
        <div>{transmission.title}</div>
        <div>
          {DateTime.fromISO(transmission.date).toLocaleString()}
        </div>
      </div>
    </Link>
  );
}

export default TransmissionPreview;
