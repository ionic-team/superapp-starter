import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import { Expense } from '@data/types';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { DomSanitizer } from '@angular/platform-browser';
import { StorageService } from './storage.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  public expenses$ = new BehaviorSubject<Array<Expense>>([]);
  private EXPENSES: string = 'EXPENSES';

  constructor(
    private sanitizer: DomSanitizer,
    private storageService: StorageService
  ) {
    this.loadSaved();
  }

  async loadSaved() {
    const { value } = await this.storageService.get(this.EXPENSES);
    this.expenses$.next((value ? JSON.parse(value) : []) as Expense[]);
    // console.log(this.expenses$.value);

    if (Capacitor.getPlatform() === 'web') {
      // Display the photo by reading into base64 format
      for (let expense of this.expenses$.value) {
        // Read each saved photo's data from the Filesystem
        if (expense.receipt) {
          const readFile = await Filesystem.readFile({
            path: expense.receipt.filePath,
            directory: Directory.Data,
          });

          expense.receipt.webviewPath = `data:image/jpeg;base64,${readFile.data}`;
        }
      }
    }
  }

  getExpense(id: number): Expense | undefined {
    return this.expenses$.value.find((expense) => expense.id === id);
  }

  // Capture receipt image, stored in temporary storage on the device.
  async captureExpenseReceipt() {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri, // file-based data; provides best performance
      source: CameraSource.Camera, // automatically take a new photo with the camera
      quality: 100, // highest quality (0 to 100)
    });

    const receiptPath = Capacitor.isNativePlatform()
      ? capturedPhoto.path!
      : capturedPhoto.webPath!;

    return {
      sanitizedPath: this.sanitizeImagePath(
        Capacitor.convertFileSrc(receiptPath)
      ),
      filepath: receiptPath,
    };
  }

  public sanitizeImagePath(imagePath: string) {
    return this.sanitizer.bypassSecurityTrustUrl(imagePath);
  }

  async saveExpense(expense: Expense, isNew: boolean) {
    if (isNew) {
      this.expenses$.value.unshift(expense);
    } else {
      const idx = this.expenses$.value.findIndex((e) => e.id == expense.id);
      this.expenses$.value[idx] = expense;
    }

    await this.storageService.set(
      this.EXPENSES,
      JSON.stringify(this.expenses$.value)
    );
  }

  // Remove expense from local copy and Storage
  async removeExpense(expense: Expense) {
    let idx = this.expenses$.value.findIndex((e) => e.id == expense.id);
    this.expenses$.value.splice(idx, 1);

    await this.storageService.set(
      this.EXPENSES,
      JSON.stringify(this.expenses$.value)
    );

    // Delete Receipt file on disk
    if (expense.receipt) {
      await Filesystem.deleteFile({
        path: expense.receipt.name,
        directory: Directory.Data,
      });
    }
  }

  // Save picture to file on device
  async savePicture(name: string, imgPath: string) {
    // Convert photo to base64 format, required by Filesystem API to save
    const base64Data = await this.readAsBase64(imgPath);

    // Write the file to the data directory
    const savedFile = await Filesystem.writeFile({
      path: name,
      data: base64Data,
      directory: Directory.Data,
    });

    if (Capacitor.isNativePlatform()) {
      // Display the new image by rewriting the 'file://' path to HTTP
      // Details: https://ionicframework.com/docs/building/webview#file-protocol
      return {
        filepath: savedFile.uri,
        webviewPath: Capacitor.convertFileSrc(savedFile.uri),
      };
    } else {
      // Use webPath to display the new image instead of base64 since it's
      // already loaded into memory
      return {
        filepath: name,
        webviewPath: imgPath,
      };
    }
  }

  // Read camera photo into base64 format based on the platform the app is running on
  private async readAsBase64(filepath: string) {
    // ios/android
    if (Capacitor.isNativePlatform()) {
      // Read the file into base64 format
      const file = await Filesystem.readFile({
        path: filepath,
      });

      return file.data;
    } else {
      // Fetch the photo, read as a blob, then convert to base64 format
      const response = await fetch(filepath);
      const blob = await response.blob();

      return (await this.convertBlobToBase64(blob)) as string;
    }
  }

  convertBlobToBase64 = (blob: Blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });

  createExpenseId() {
    return new Date().getTime();
  }
}
