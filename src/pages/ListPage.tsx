import { useEffect, useState } from "react";
import ListItem from "../components/ListItem";
import { API } from "aws-amplify";
import { listMeasData } from "../graphql/queries";
import { GraphQLResult } from "@aws-amplify/api-graphql";
import { MeasDataParams } from "../types";
import { removeItemFromTable } from "../utils/utils";

export interface ListPageProps {
  items: Array<any>;
}

export default function ListPage(props: ListPageProps) {
  const [measTable, setMeasTable] = useState([]);

  async function fetchMeasData() {
    const apiData: GraphQLResult<any> = await API.graphql({
      query: listMeasData,
    });
    setMeasTable(apiData.data.listMeasData.items);
  }

  useEffect(() => {
    fetchMeasData();
  }, []);

  const onDelete = (item: MeasDataParams) => {
    removeItemFromTable(item.id, () => {
        fetchMeasData();
    });
  };

  return (
    <>
      <table id="table">
        <tbody>
          <tr>
            <th>Predict</th>
            <th>Key</th>
            <th>x</th>
            <th>y</th>
            <th>Lv</th>
            <th>Date</th>
            <th>Type</th>
            <th>Delete</th>
          </tr>
          {measTable.map((item: MeasDataParams) => {
            return <ListItem item={item} key={item.id} onDelete={onDelete} />;
          })}
        </tbody>
      </table>
    </>
  );
}
