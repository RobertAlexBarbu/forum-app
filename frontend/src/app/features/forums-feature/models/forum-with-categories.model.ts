export interface ForumWithCategoriesModel {
  name: string,
  id: number,
  categories:CategoryModel[]
}

export interface CategoryModel {
  id: number,
  name: string
}
