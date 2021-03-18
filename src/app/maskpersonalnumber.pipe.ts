import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maskpersonalnumber'
})
export class MaskpersonalnumberPipe implements PipeTransform {
  transform(value: string): string {
    if (value.length > 8) {
      let visibleDigitstemp = 8 - value.length;
      let maskedSectiontemp = value.slice(visibleDigitstemp);
      if (maskedSectiontemp){
        maskedSectiontemp = maskedSectiontemp.replace(/\*/g, '');
      }
  }
  let maskedSection = value.slice(8);
  let visibleSection = value.slice(0,8);
  return visibleSection+maskedSection.replace(/./g, '*');
}

}
