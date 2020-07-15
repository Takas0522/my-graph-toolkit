import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    imports: [
        MatCardModule,
        MatIconModule,
        HttpClientModule
    ],
    exports: [
        MatCardModule,
        MatIconModule
    ]
})
export class MaterialModule {}
