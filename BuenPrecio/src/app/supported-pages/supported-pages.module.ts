import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SupportedPagesPageRoutingModule } from './supported-pages-routing.module';

import { SupportedPagesPage } from './supported-pages.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SupportedPagesPageRoutingModule
  ],
  declarations: [SupportedPagesPage]
})
export class SupportedPagesPageModule {}
