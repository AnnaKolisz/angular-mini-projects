import { Directive, ElementRef, HostListener } from "@angular/core";

@Directive({
    selector: '[onlyNumbers]',
})
export class OnlyNumbersDirective {

    regex = '^[0-9]+$';

    constructor(
        private elem: ElementRef
    ) { }

    @HostListener('keypress', ['$event'])
    onKeyPress(event) {
        return new RegExp(this.regex).test(event.key)
    }

    // // block from copy paste
    // @HostListener('paste', ['$event'])
    // blockPaste(event: ClipboardEvent) {
    //     this.validateFields(event);
    // }

    // validateFields(event: ClipboardEvent) {
    //     event.preventDefault();
    //     const pasteData = event.clipboardData.getData('text/plain').replace(/[^0-9]/g, '');
    //     document.execCommand('insertHTML', false, pasteData);
    // }

}