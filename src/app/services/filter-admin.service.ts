import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

import { FilterAdmin } from '@@models/filter-admin.models'

@Injectable({
  providedIn: 'root',
})
export class FilterAdminService {
  private hasFilter: FilterAdmin | null = null
  private hasFilter$: BehaviorSubject<FilterAdmin | null>

  constructor() {
    this.hasFilter$ = new BehaviorSubject<FilterAdmin | null>(null)
  }

  get getHasFilter() {
    return this.hasFilter$.asObservable()
  }

  set setHasFilter(value: FilterAdmin | null) {
    this.hasFilter = value
    this.hasFilter$.next(this.hasFilter)
  }
}
