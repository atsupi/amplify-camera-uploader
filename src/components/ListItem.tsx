
export class ListItemProps {
    "items": Array<any>;
}

export default function ListItem(props: ListItemProps) {
    console.log(props.items);
  return (
    <>
      {
        props.items.map((item) => {
            return (
                <>
                </>
            )
        })

      }
    </>
  );
}
