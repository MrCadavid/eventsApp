import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StateService<T> {
  private itemsSubject = new BehaviorSubject<T[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public items$: Observable<T[]> = this.itemsSubject.asObservable();
  public isLoading$: Observable<boolean> = this.loadingSubject.asObservable();

  setItems(items: T[]): void {
    this.itemsSubject.next(items);
  }

  setLoading(isLoading: boolean): void {
    this.loadingSubject.next(isLoading);
  }
}
