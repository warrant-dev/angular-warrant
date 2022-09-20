import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { WarrantService } from './warrant.service';

@Injectable({
  providedIn: 'root'
})
export class WarrantGuard implements CanActivate, CanActivateChild {
  constructor(private warrantService: WarrantService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let op = route.data["op"] as string;
    let warrants = route.data["warrants"] as Array<any>;

    return this.warrantService
      .isAuthorized(op, warrants)
      .pipe(map(resp => {
        return resp.result === "Authorized";
      }));
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let op = childRoute.data["op"] as string;
    let warrants = childRoute.data["warrants"] as Array<any>;

    return this.warrantService
      .isAuthorized(op, warrants)
      .pipe(map(resp => {
        return resp.result === "Authorized";
      }));
  }
}
