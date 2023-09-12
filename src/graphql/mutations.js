/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createMeasData = /* GraphQL */ `
  mutation CreateMeasData(
    $input: CreateMeasDataInput!
    $condition: ModelMeasDataConditionInput
  ) {
    createMeasData(input: $input, condition: $condition) {
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
export const updateMeasData = /* GraphQL */ `
  mutation UpdateMeasData(
    $input: UpdateMeasDataInput!
    $condition: ModelMeasDataConditionInput
  ) {
    updateMeasData(input: $input, condition: $condition) {
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
export const deleteMeasData = /* GraphQL */ `
  mutation DeleteMeasData(
    $input: DeleteMeasDataInput!
    $condition: ModelMeasDataConditionInput
  ) {
    deleteMeasData(input: $input, condition: $condition) {
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
