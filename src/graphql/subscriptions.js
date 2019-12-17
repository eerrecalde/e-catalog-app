/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateMyCatalogItems = `subscription OnCreateMyCatalogItems(
  $id: ID
  $title: String
  $description: String
  $tags: [String]
  $url: String
) {
  onCreateMyCatalogItems(
    id: $id
    title: $title
    description: $description
    tags: $tags
    url: $url
  ) {
    id
    title
    description
    tags
    url
    price
  }
}
`;
export const onUpdateMyCatalogItems = `subscription OnUpdateMyCatalogItems(
  $id: ID
  $title: String
  $description: String
  $tags: [String]
  $url: String
) {
  onUpdateMyCatalogItems(
    id: $id
    title: $title
    description: $description
    tags: $tags
    url: $url
  ) {
    id
    title
    description
    tags
    url
    price
  }
}
`;
export const onDeleteMyCatalogItems = `subscription OnDeleteMyCatalogItems(
  $id: ID
  $title: String
  $description: String
  $tags: [String]
  $url: String
) {
  onDeleteMyCatalogItems(
    id: $id
    title: $title
    description: $description
    tags: $tags
    url: $url
  ) {
    id
    title
    description
    tags
    url
    price
  }
}
`;
