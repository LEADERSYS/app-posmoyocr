import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  private sectionSelectedSource = new Subject<string>();
  sectionSelected$ = this.sectionSelectedSource.asObservable();

  selectSection(section: string) {
    this.sectionSelectedSource.next(section);
  }
}
