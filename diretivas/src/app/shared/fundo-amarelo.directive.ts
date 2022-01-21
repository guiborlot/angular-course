import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[fundoAmarelo]'
})
export class FundoAmareloDirective {

  constructor(
    private _elementRef: ElementRef,
    private _renderer: Renderer2) {
    // console.log(this.elementRef);
    // this.elementRef.nativeElement.style.backgroundColor = 'yellow';
      this._renderer.setStyle(this._elementRef.nativeElement, 
        'background-color',
        'yellow');
   }

}
