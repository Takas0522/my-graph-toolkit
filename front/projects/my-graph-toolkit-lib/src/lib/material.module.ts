import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
    imports: [
        MatCardModule,
        MatIconModule,
        MatButtonModule,
        MatTooltipModule
    ],
    exports: [
        MatCardModule,
        MatIconModule,
        MatButtonModule,
        MatTooltipModule
    ]
})
export class MaterialModule {}
