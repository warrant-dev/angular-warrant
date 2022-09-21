import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { WarrantService } from './warrant.service';
import { WarrantCheck } from '@warrantdev/warrant-js';

@Injectable({
  providedIn: 'root'
})
export class WarrantGuard implements CanActivate, CanActivateChild {
  constructor(private warrantService: WarrantService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let warrantCheck = route.data["warrantCheck"] as WarrantCheck;

    return this.warrantService
      .isAuthorized(warrantCheck);
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let warrantCheck = childRoute.data["warrantCheck"] as WarrantCheck;

    return this.warrantService
      .isAuthorized(warrantCheck);
  }
}
