/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getMeasData = /* GraphQL */ `
  query GetMeasData($id: ID!) {
    getMeasData(id: $id) {
      id
      date
      type
      key
      param1
      param2
      param3
      owner
      __typename
    }
  }
`;
export const listMeasData = /* GraphQL */ `
  query ListMeasData(
    $filter: ModelMeasDataFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMeasData(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        date
        type
        key
        param1
        param2
        param3
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
