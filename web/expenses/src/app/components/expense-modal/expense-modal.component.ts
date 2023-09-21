import { CommonModule } from '@angular/common';
import { Component, Input, NgModule } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  ReactiveFormsModule,
  FormControl,
  Validators,
} from '@angular/forms';
import { SafeUrl } from '@angular/platform-browser';
import { Capacitor } from '@capacitor/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { Expense } from 'src/app/models/expense';
import { ExpenseService } from 'src/app/services/expense.service';

@Component({
  selector: 'app-expense-modal',
  templateUrl: './expense-modal.component.html',
  styleUrls: ['./expense-modal.component.scss'],
})
export class ExpenseModalComponent {
  @Input() existingExpenseId?: number;

  public form!: FormGroup;
  public safeReceipt!: SafeUrl;

  constructor(
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private expenseService: ExpenseService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      merchant: new FormControl('', [Validators.required]),
      cost: new FormControl(null, [Validators.required]),
      note: new FormControl(undefined),
      category: new FormControl('Other', [Validators.required]),
      date: new FormControl(new Date().toJSON(), [Validators.required]),
      photo: new FormControl(undefined),
    });

    let foundExpense: Expense | undefined;
    if (this.existingExpenseId) {
      foundExpense = this.expenseService.getExpense(this.existingExpenseId);
    }

    if (foundExpense) {
      this.populateForm(foundExpense);
      this.setReceiptImage(foundExpense.receipt?.webviewPath || undefined);
    } else {
      this.setReceiptImage();
    }
  }

  public get f() {
    return this.form.controls;
  }

  private populateForm(exp: Expense) {
    for (const [key, value] of Object.entries(exp)) {
      // console.log(key, value);
      if (this.form.get(key)) {
        let keyval = {
          [key.valueOf()]: value,
        };
        // console.log(keyval);
        this.form.patchValue(keyval, { emitEvent: false });
      }
    }
  }

  async submit() {
    // console.log(this.form.value);
    const isNew = this.existingExpenseId === undefined;
    const exp: Expense = {
      id: this.existingExpenseId || this.expenseService.createExpenseId(),
      merchant: this.f.merchant.value,
      cost: Number(this.f.cost.value),
      note: this.f.note.value,
      category: this.f.category.value,
      date: this.f.date.value,
    };

    if (this.f.photo.value) {
      const imgName = `${exp.id}.jpeg`;
      const savedReceipt = await this.expenseService.savePicture(
        imgName,
        this.f.photo.value
      );
      exp.receipt = {
        name: imgName,
        filePath: savedReceipt.filepath,
        webviewPath: savedReceipt.webviewPath,
      };
    }

    await this.expenseService.saveExpense(exp, isNew).then(() => {
      this.close();
    });
  }

  setReceiptImage(imgStr?: string) {
    if (imgStr) {
      this.safeReceipt = this.expenseService.sanitizeImagePath(imgStr);
    } else {
      this.safeReceipt = Capacitor.isNativePlatform()
        ? Capacitor.convertFileSrc('assets/image-placeholder.jpg')
        : 'assets/image-placeholder.jpg';
    }
  }

  async captureReceipt() {
    const image = await this.expenseService.captureExpenseReceipt();
    console.log(image);
    this.f.photo.setValue(image.filepath);
    this.safeReceipt = image.sanitizedPath;
  }

  close() {
    return this.modalCtrl.dismiss();
  }
}

@NgModule({
  declarations: [ExpenseModalComponent],
  exports: [ExpenseModalComponent],
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
})
export class ExpenseModalModule {}
