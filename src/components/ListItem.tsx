import { ListItemParams, MeasDataParams } from "../types";

export class ListItemProps {
  "item": MeasDataParams;
  "key": string;
  "onDelete": (item: MeasDataParams) => void;
}

function getColorRef(item: MeasDataParams) {
  const x = parseFloat(item.param2);
  const y = parseFloat(item.param3);
  if (y < 0.3 && x > 0.4) return "R";
  if (y < 0.3 && x < 0.2) return "B";
  if (y > 0.5) return "G";
  if (Math.abs(x - 0.3127) < 0.03 && Math.abs(y - 0.326) < 0.03) return "W";
  return "RGBW";
}

export default function ListItem(props: ListItemProps) {
  const colorRef = getColorRef(props.item);

  const item: ListItemParams = {
    item: props.item,
    metadata: { colorRef: colorRef },
  };

  const timeTick: number = Math.floor((item.item.date % (24 * 3600000)) / 1000);
  const hours = ("0" + Math.floor(timeTick / 3600)).slice(-2);
  const minutes = ("0" + Math.floor((timeTick % 3600) / 60)).slice(-2);
  const seconds = ("0" + Math.floor(timeTick % 60)).slice(-2);
  const time: string = hours + ":" + minutes + ":" + seconds;

  const shortKey =
    item.item.key.split("/")[item.item.key.split("/").length - 1];

  const onDelete = () => {
    props.onDelete(props.item);
  };

  return (
    <>
      <tr>
        <td>{item.metadata.colorRef}</td>
        <td>{shortKey}</td>
        <td>{item.item.param2}</td>
        <td>{item.item.param3}</td>
        <td>{item.item.param1}</td>
        <td>{time}</td>
        <td>{item.item.type}</td>
        <td>
          <button onClick={onDelete}>Delete</button>
        </td>
      </tr>
    </>
  );
}
