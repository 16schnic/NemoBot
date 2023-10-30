import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';

const URL = 'http://localhost:50543/';

@Injectable({
  providedIn: 'root',
})
export class CommandsService {
  constructor(private http: HttpClient) {}
}
