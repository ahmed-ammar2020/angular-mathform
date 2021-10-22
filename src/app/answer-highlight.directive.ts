import { Directive, ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appAnswerHighlight]',
})
export class AnswerHighlightDirective {
  constructor(private el: ElementRef, private controlName: NgControl) {}

  ngOnInit() {
    // access the whole form from a custom directive
    this.controlName.control?.parent?.valueChanges.subscribe(
      ({ a, b, answer }) => {
        if (
          ((a + b) / +answer >= 0.8 && (a + b) / +answer < 1) ||
          ((a + b) / +answer <= 1.2 && (a + b) / +answer > 1)
        ) {
          this.el.nativeElement.classList.add('highlight');
        } else {
          this.el.nativeElement.classList.remove('highlight');
        }
      }
    );
  }
}
