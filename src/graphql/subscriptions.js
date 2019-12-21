/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateMyCatalogItems = `subscription OnCreateMyCatalogItems(
  $title: String
  $description: String
  $tags: [String]
  $url: String
  $imgUrl: String
) {
  onCreateMyCatalogItems(
    title: $title
    description: $description
    tags: $tags
    url: $url
    imgUrl: $imgUrl
  ) {
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
export const onUpdateMyCatalogItems = `subscription OnUpdateMyCatalogItems(
  $title: String
  $description: String
  $tags: [String]
  $url: String
  $imgUrl: String
) {
  onUpdateMyCatalogItems(
    title: $title
    description: $description
    tags: $tags
    url: $url
    imgUrl: $imgUrl
  ) {
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
export const onDeleteMyCatalogItems = `subscription OnDeleteMyCatalogItems(
  $title: String
  $description: String
  $tags: [String]
  $url: String
  $imgUrl: String
) {
  onDeleteMyCatalogItems(
    title: $title
    description: $description
    tags: $tags
    url: $url
    imgUrl: $imgUrl
  ) {
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
