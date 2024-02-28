import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { FormControl } from '@angular/forms'

import { FilterAdmin } from '@@models/filter-admin.models'

@Injectable({
  providedIn: 'root',
})
export class FilterAdminService {
  private hasFilter$ = new BehaviorSubject<FilterAdmin | null>(null)
  private openModal$ = new BehaviorSubject<boolean>(false)

  public searchForm = new FormControl<string>('')

  get getHasFilter() {
    return this.hasFilter$.asObservable()
  }

  set setHasFilter(value: FilterAdmin | null) {
    this.hasFilter$.next(value)
  }

  get getOpenModal() {
    return this.openModal$.asObservable()
  }

  set setOpenModal(value: boolean) {
    this.openModal$.next(value)
  }
}
