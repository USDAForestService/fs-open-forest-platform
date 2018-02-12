import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";
import { AuthenticationService } from "./authentication.service";
import { environment } from "../../environments/environment";
import { UtilService } from "./util.service";

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(
    private router: Router,
    private authentication: AuthenticationService,
    public util: UtilService
  ) {}

  canActivate(route: ActivatedRouteSnapshot) {
    // force login and dont use cached user for authenticated routes
    return this.authentication
      .getAuthenticatedUser(true, true)
      .map((user: any) => {
        return this.validateUser(user, route);
      });
  }

  validateUser(user, route) {
    localStorage.removeItem("requestingUrl");
    const requestingUrl = window.location.pathname;
    let isAdminRoute = false;
    if (route.data) {
      isAdminRoute = route.data.admin;
    }
    let authorized = false;
    if (user && user.email && user.role) {
      authorized = true;
      if (isAdminRoute && user.role !== "admin") {
        authorized = false;
        this.navigate(["/access-denied"]);
      }
    } else {
      this.sendToAuthentication(isAdminRoute, requestingUrl);
    }
    return authorized;
  }

  sendToAuthentication(isAdminRoute, requestingUrl) {
    localStorage.setItem("requestingUrl", requestingUrl);
    let authEndpoint = "login-gov/openid/login";
    if (isAdminRoute) {
      authEndpoint = "usda-eauth/saml/login";
    }
    this.util.setLoginRedirectMessage();
    setTimeout(() => {
      this.redirect(environment.apiUrl + "auth/" + authEndpoint);
    }, 1000);
  }

  navigate(route) {
    this.router.navigate(route);
  }

  redirect(url) {
    window.location.href = url;
  }
}
