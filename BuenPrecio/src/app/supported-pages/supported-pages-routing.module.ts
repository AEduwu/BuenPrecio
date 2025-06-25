import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SupportedPagesPage } from './supported-pages.page';

const routes: Routes = [
  {
    path: '',
    component: SupportedPagesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SupportedPagesPageRoutingModule {}
