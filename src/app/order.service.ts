import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order, OrderRequest } from './types';

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()\\[\\]\\\\/+^])/g, '\\$1') + '=([^;]*)'));
  return match ? decodeURIComponent(match[1]) : null;
}

const httpOptions = () => {
  const xsrf = getCookie('XSRF-TOKEN');
  let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  if (xsrf) {
    headers = headers.set('X-XSRF-TOKEN', xsrf);
  }
  return { headers, withCredentials: true };
};

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: HttpClient) { }

  getOrders(): Observable<Order[]> {
    return this.httpClient.get<Order[]>('/orders', { withCredentials: true });
  }

  submitOrder(orderRequest: OrderRequest): Observable<any> {
    return this.httpClient.post<any>(`/orders`, orderRequest, httpOptions());
  }
}
