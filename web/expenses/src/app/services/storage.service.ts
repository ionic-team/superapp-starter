import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  public get(key: string) {
    return Preferences.get({
      key: key,
    });
  }

  public set(key: string, value: string) {
    return Preferences.set({
      key: key,
      value: value,
    });
  }

  public remove(key: string) {
    return Preferences.remove({
      key: key,
    });
  }

  public clear() {
    return Preferences.clear();
  }

  public keys() {
    return Preferences.keys();
  }

  public has(key: string) {
    return this.keys().then((res) => {
      return res.keys.includes(key);
    });
  }
}
