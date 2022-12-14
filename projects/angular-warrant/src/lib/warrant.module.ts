import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { WarrantConfiguration } from './warrant.config';
import { WarrantConfigurationService } from './warrant.config.token';
import { WarrantProtectedComponent } from './warrant-protected/warrant-protected.component';
import { WarrantGuard } from './warrant.guard';
import { WarrantService } from './warrant.service';


@NgModule({
  declarations: [
    WarrantProtectedComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    WarrantProtectedComponent,
  ]
})
export class WarrantModule {
  static forRoot(config: WarrantConfiguration): ModuleWithProviders<WarrantModule> {
    return {
      ngModule: WarrantModule,
      providers: [
        WarrantGuard,
        {
          provide: WarrantConfigurationService,
          useValue: config,
        },
        WarrantService
      ]
    }
  }
}
