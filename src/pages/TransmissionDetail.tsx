import  { useEffect, useState } from "react";
import { ITransmission } from "../types/GeneralTypes";
import { useParams } from "react-router";
import { TransmissionsApi } from "../features/transmissions/transmissionsApi";

/* interface TransmissionDetailProps {
    transmission: ITransmission;
} */

export const TransmissionDetail = () => {
  const params = useParams<{ id: string }>();
  const [transmission, setTransmission] = useState<ITransmission | null>(null);
  useEffect(() => {
    if (params.id)
      TransmissionsApi.get(params.id).then(response => {
        setTransmission(response.data.data);
      });
  }, []);
  return (
    <>
      {transmission && (
        <div>
          <h1>{transmission.title}</h1>
          <p>{transmission.content}</p>
          <p>{transmission.date}</p>
        </div>
      )}
    </>
  );
};
