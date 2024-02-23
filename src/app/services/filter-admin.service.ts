import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class FilterAdminService {
  private hasFilter: boolean = false
  private hasFilter$: BehaviorSubject<boolean>

  constructor() {
    this.hasFilter$ = new BehaviorSubject<boolean>(false)
  }

  get getHasFilter() {
    return this.hasFilter$.asObservable()
  }

  set setHasFilter(value: boolean) {
    this.hasFilter = value
    this.hasFilter$.next(this.hasFilter)
  }
}
