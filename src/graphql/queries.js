/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getItem = `query GetItem($id: ID!) {
  getItem(id: $id) {
    id
    title
    description
    tags
    url
    imgUrl
    price
  }
}
`;
export const listItems = `query ListItems(
  $filter: ModelItemFilterInput
  $limit: Int
  $nextToken: String
) {
  listItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      title
      description
      tags
      url
      imgUrl
      price
    }
    nextToken
  }
}
`;
