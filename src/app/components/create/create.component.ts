import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { differenceInCalendarDays, setHours } from 'date-fns';

import { Features } from './../../../utils/features';
import format from 'date-fns/format';
import parseDate from 'date-fns/parse';

export type slot = {
  date: string;
  parsedDate: string;
};

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  today = new Date();

  selectedDates = new Set<string>();

  data: slot[] = [];

  createEventForm: FormGroup;

  maxLimit = Features.maxDaysLimit;

  private readonly longDateFormat = 'EEEE - do MMMM, yyyy';
  private readonly shortDateFormat = 'dd.MM.yyyy';

  constructor(private fb: FormBuilder) {
    this.createEventForm = this.fb.group({
      title: [null, [Validators.required]],
      description: [null, [Validators.required]],
      eventLink: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {}

  disabledDate = (current: Date): boolean =>
    // Can not select days before today and today
    differenceInCalendarDays(current, this.today) < 1;

  onChange(result: Date): void {
    let resultDate = format(result, this.shortDateFormat);
    if (this.selectedDates.has(resultDate)) {
      this.selectedDates.delete(resultDate);
    } else {
      this.selectedDates.add(resultDate);
    }

    this.data = [];
    this.selectedDates.forEach((date) => {
      let parsedDate = parseDate(date, this.shortDateFormat, new Date());
      this.data.push({
        date: date,
        parsedDate: format(parsedDate, this.longDateFormat),
      });
    });

    this.today = new Date();
  }

  setDateSelection(current: any) {
    return this.selectedDates.has(format(current, this.shortDateFormat));
  }

  submitForm(): void {
    console.log('submit', this.createEventForm.value);
  }

  cancelSlot(cancelledSlotDate: string) {
    this.data = this.data.filter((x) => x.date !== cancelledSlotDate);
    this.selectedDates.delete(cancelledSlotDate);
  }
}
