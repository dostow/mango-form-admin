import { ReduxState, Record, Identifier } from "react-admin";

export type ThemeName = "light" | "dark";

export interface AppState extends ReduxState {
  theme: ThemeName;
}

export interface Form extends Record {
  name: string;
}

// export interface Product extends Record {
//   category_id: Identifier;
//   description: string;
//   height: number;
//   image: string;
//   price: number;
//   reference: string;
//   stock: number;
//   thumbnail: string;
//   width: number;
// }

// export interface Customer extends Record {
//   first_name: string;
//   last_name: string;
//   address: string;
//   stateAbbr: string;
//   city: string;
//   zipcode: string;
//   avatar: string;
//   birthday: string;
//   first_seen: string;
//   last_seen: string;
//   has_ordered: boolean;
//   latest_purchase: string;
//   has_newsletter: boolean;
//   groups: string[];
//   nb_commands: number;
//   total_spent: number;
// }

// export type OrderStatus = "ordered" | "delivered" | "cancelled";

// export interface Order extends Record {
//   status: OrderStatus;
//   basket: BasketItem[];
//   date: Date;
//   total: number;
// }

// export interface BasketItem {
//   product_id: Identifier;
//   quantity: number;
// }

// export interface Invoice extends Record {}

// export type BudgetStatus = "accepted" | "pending" | "rejected";

// export interface Budget extends Record {
//   created_at: Date;
//   name: String;
//   description: String;
// }

// export interface BudgetItem extends Record {
//   created_at: Date;
//   name: String;
//   description: String;
//   amount: Number;
// }

declare global {
  interface Window {
    restServer: any;
  }
}
