import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule, MatButtonModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule
  ],
  exports: [
    MatInputModule,
    MatCardModule,
    MatButtonModule
  ],
  declarations: []
})
export class AppMaterialModule { }
