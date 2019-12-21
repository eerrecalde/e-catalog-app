/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getMyCatalogItems = `query GetMyCatalogItems($id: ID!) {
  getMyCatalogItems(id: $id) {
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
export const listMyCatalogItems = `query ListMyCatalogItems(
  $filter: TableMyCatalogItemsFilterInput
  $limit: Int
  $nextToken: String
) {
  listMyCatalogItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
