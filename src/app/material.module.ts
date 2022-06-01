import { NgModule } from "@angular/core";
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';

const modules = [
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule
]

@NgModule({
    imports: [...modules
    ],
    exports: [...modules
    ]
})
export class MaterialModule { }