/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateMeasData = /* GraphQL */ `
  subscription OnCreateMeasData(
    $filter: ModelSubscriptionMeasDataFilterInput
    $owner: String
  ) {
    onCreateMeasData(filter: $filter, owner: $owner) {
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
export const onUpdateMeasData = /* GraphQL */ `
  subscription OnUpdateMeasData(
    $filter: ModelSubscriptionMeasDataFilterInput
    $owner: String
  ) {
    onUpdateMeasData(filter: $filter, owner: $owner) {
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
export const onDeleteMeasData = /* GraphQL */ `
  subscription OnDeleteMeasData(
    $filter: ModelSubscriptionMeasDataFilterInput
    $owner: String
  ) {
    onDeleteMeasData(filter: $filter, owner: $owner) {
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
