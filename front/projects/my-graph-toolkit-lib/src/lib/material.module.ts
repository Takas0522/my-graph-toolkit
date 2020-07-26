import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
    imports: [
        MatCardModule,
        MatIconModule,
        MatButtonModule,
        MatTooltipModule,
        MatSnackBarModule
    ],
    exports: [
        MatCardModule,
        MatIconModule,
        MatButtonModule,
        MatTooltipModule,
        MatSnackBarModule
    ]
})
export class MaterialModule {}
