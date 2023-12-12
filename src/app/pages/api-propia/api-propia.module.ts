import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApiPropiaPageRoutingModule } from './api-propia-routing.module';

import { ApiPropiaPage } from './api-propia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApiPropiaPageRoutingModule
  ],
  declarations: [ApiPropiaPage]
})
export class ApiPropiaPageModule {}
