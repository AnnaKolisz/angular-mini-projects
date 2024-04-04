import { NgModule } from "@angular/core";
import { OnlyNumbersDirective } from "./only-numbers.directive";

const directives = [
    OnlyNumbersDirective
]

@NgModule({
    imports: [],
    declarations: [...directives],
    exports: [...directives]
  })
  export class DirectiveModule { }