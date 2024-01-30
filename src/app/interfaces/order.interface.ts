import {StateResponse} from "./state.interface";

export interface ClientOrderResponse{
  id: number;
  orderId: number | undefined;
  state: StateResponse;
  tableName: string | undefined;
  client_email: string | undefined;
  companyMenuId: number | undefined;
  active: number | undefined;
  createdAt: Date | undefined;
  modifiedAt: Date | undefined ;
  deletedAt: Date | undefined;
  clientOrderItemList: ClientOrderItemResponse[];
}

export interface ClientOrderItemResponse{
  id: number | undefined;
  additionalComments: string | undefined;
  itemMenuId: number | undefined;
  clientOrderId: number | undefined;
  itemName: string | undefined;
  description:  string | undefined;
  quantity: number;
}

