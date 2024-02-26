import { Injectable, inject } from '@angular/core'
import { DOCUMENT } from '@angular/common'

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private document = inject(DOCUMENT)
  private storage = this.document.defaultView?.localStorage

  set(key: string, value: unknown) {
    if (this.storage) {
      this.storage.setItem(key, JSON.stringify(value))
    }
  }

  get(key: string) {
    if (this.storage) {
      return this.storage.getItem(key)
    }
    return null
  }

  remove(key: string) {
    if (this.storage) {
      this.storage.removeItem(key)
    }
  }

  clear() {
    if (this.storage) {
      this.storage.clear()
    }
  }
}
