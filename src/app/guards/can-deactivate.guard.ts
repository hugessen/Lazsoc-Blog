import { Injectable }     from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UpdateComponent } from '../update/update.component';
import { ArticleComposerComponent } from '../article-composer/article-composer.component';
import { Observable } from 'rxjs';

@Injectable()
export class CanDeactivateUpdate implements CanDeactivate<UpdateComponent> {
  constructor(private authService: AuthService) {}

  canDeactivate(
    component: UpdateComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot
  ): Observable<boolean>|Promise<boolean>|boolean {
  	return component.canDeactivate()
  }
}
@Injectable()
export class CanDeactivateCompose implements CanDeactivate<ArticleComposerComponent> {
  constructor(private authService: AuthService) {
  }

  canDeactivate(
    component: ArticleComposerComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot
  ): Observable<boolean>|Promise<boolean>|boolean {
  	return component.canDeactivate()
  }
}
