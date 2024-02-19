import {StateResponse} from "./state.interface";

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
  id: number;
  categoryMenuId: number;
  name: string;
  position: number | undefined;
  description: string;
  price: number;
  active: boolean
  quantity: number;
  createdAt: Date | undefined;
  modifiedAt: Date | undefined;
  deletedAt: Date | undefined;
}

