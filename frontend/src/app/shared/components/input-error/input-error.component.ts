import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {AbstractControl} from "@angular/forms";
import {InputErrorModel} from "./input-error.model";
import {inputErrorsData} from "./input-errors.data";
import {Observable} from "rxjs";

@Component({
  selector: 'app-input-error',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input-error.component.html',
  styleUrls: ['./input-error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

// ! Triggers twice as many change detection cycles than the basic inline version
// Tested with Angular Profiler dev tool

export class InputErrorComponent implements OnInit{
  @Input() control$!: Observable<AbstractControl<any, any> | null>;
  ngOnInit() {
    this.control$.subscribe({
      next: (data) => {
        console.log(data);
      }
    })
  }

  errors: InputErrorModel[] = inputErrorsData;
  getCondition(index: number, error: InputErrorModel, control: AbstractControl<any, any>) {
    if(index == 0) {
      return control?.errors![error.errorName]
    } else {
      return !this.errors.slice(0, index).some((err) => control?.errors![err.errorName]) && control?.errors![error.errorName]
    }
  }

  trackByFn(index: number, item: InputErrorModel) {
    return item.errorName;
  }
}
