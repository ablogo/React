import { saveAsJsonItem, getAsJsonItem } from "../utils/storage"
import type { Product, Prices, ChartInfo } from "../models/types"

const apiUrl = import.meta.env.VITE_API_URL;

export async function getProduct(id: number, history: boolean = false): Promise<Product | null> {
  try {

    const response = await fetch(apiUrl + "/product/" + id + "?history=" + history, {
      method: 'GET',
    });

    console.log("user service: " + response.ok);

    if (!response.ok) {
      console.error(response.status + ' ' + response.statusText);
      return null;
    }

    const data = await response.json();
    return data;
  }
  catch (error) {
    console.error(error);
    return null;
  }

}

export async function getProducts(history: boolean): Promise<Product[]> {
  try {
    const response = await fetch(apiUrl + "/products?history=" + history, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        //'Authorization': 'Bearer ' + getStorageItem('token')
      }
    });

    if (!response.ok) {
      console.error(response.status + ' ' + response.statusText);
      return [];
    }

    const data = await response.json();
    //await saveAsJsonItem("products", data);

    return data;
  }
  catch (error) {
    console.error(error);
    return [];
  }

}

export async function getProductHistoricalLowestPrices(product_id: number): Promise<Prices[]> {
  try {
    const response = await fetch(apiUrl + "/product/prices/historical/" + product_id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        //'Authorization': 'Bearer ' + getStorageItem('token')
      }
    });

    if (!response.ok) {
      console.error(response.status + ' ' + response.statusText);
      return [];
    }

    const data = await response.json();
    return data;
  }
  catch (error) {
    console.error(error);
    return [];
  }

}

export async function getProductChartInfo(product_id: string): Promise<ChartInfo> {
  let info: ChartInfo = { prices: [], dates: [] }
  try {
    const response = await fetch(apiUrl + "/product/prices/chart/" + product_id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        //'Authorization': 'Bearer ' + getStorageItem('token')
      }
    });

    if (!response.ok) {
      console.debug(response.status + ' ' + response.statusText);
      return info;
    }

    const data = await response.json();
    return data;
  }
  catch (error) {
    console.error(error);
    return info;
  }

}

export async function createProduct(product: Product): Promise<boolean> {
  try {
    const response = await fetch(apiUrl + "/products", {
      method: 'POST',
      body: JSON.stringify(product),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    console.log("user service: " + response.ok);

    if (!response.ok) {
      console.error(response.status + ' ' + response.statusText);
      return false;
    }

    const data = await response.json();
    console.log(data);

    return true;
  }
  catch (error) {
    console.error(error);
    return false;
  }

}

export async function updateProduct(product: Product): Promise<boolean> {
  try {
    const response = await fetch(apiUrl + "/product", {
      method: 'PUT',
      body: JSON.stringify(product),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      console.error(response.status + ' ' + response.statusText);
      return false;
    }

    return true;
  }
  catch (error) {
    console.error(error);
    return false;
  }
}

export async function changeTrackedState(id: number): Promise<boolean> {
  try {

    const response = await fetch(apiUrl + "/product/tracked/" + id, {
      method: 'PUT',
    });

    console.log("user service: " + response.ok);

    if (response.ok) return true;
    else return false;

  }
  catch (error) {
    console.error(error);
    return false;
  }

}