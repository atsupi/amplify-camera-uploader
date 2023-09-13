import ListItem from "../components/ListItem";

export interface ListPageProps {
  items: Array<any>;
}

export default function ListPage(props: ListPageProps) {
  console.log(props.items);
  return (
    <>
      <p>ListPage</p>
          <table id="table">
            <tbody>
              <tr>
                <th>Serial#</th>
                <th>Date</th>
                <th>ReportedBy</th>
                <th>Location</th>
                <th>Storage</th>
                <th>Asset type</th>
                <th>PK</th>
                <th>Link</th>
              </tr>
              <ListItem items={props.items}/>
            </tbody>
          </table>
        );
    </>
  );
}
