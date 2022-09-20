import { InjectionToken } from '@angular/core';
import { WarrantConfiguration } from './warrant.config';

export const WarrantConfigurationService = new InjectionToken<WarrantConfiguration>(
    'AngularWarrantConfiguration'
);
