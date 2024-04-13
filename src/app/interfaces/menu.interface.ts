export interface MenuResponse {
  id: number;
  branch: string
  title: string;
  description: string;
  header: string;
  footer: string;
  companyDataId: number;
  active: boolean;
  createdAt: Date | null;
  modifiedAt: Date | null;
  deletedAt: Date | null;
  listCategory: CategoryResponse[];
}

export interface CategoryResponse{
  id: number;
  name: string;
  position: number | undefined;
  active: boolean;
  menuItems: ItemMenuResponse[];
}

export interface ItemMenuResponse{
  id: number | undefined;
  categoryMenuId: number | undefined;
  name: string | undefined;
  position: number | undefined;
  description: string | undefined;
  price: number | undefined;
  active: boolean | undefined
  quantity: number | undefined;
  createdAt: Date | undefined;
  modifiedAt: Date | undefined;
  deletedAt: Date | undefined;
}


