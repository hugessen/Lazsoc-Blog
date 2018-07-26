import { NgModule }              from '@angular/core';
import { RouterModule, Routes, Router }  from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { NewsfeedContainerComponent } from './newsfeed-container/newsfeed-container.component';
import { BeansComponent } from './beans/beans.component';
import { LazNavbar } from './nav-bar/laz-navbar';
import { HiringComponent } from './hiring/hiring.component';
import { ClubsComponent } from './clubs/clubs.component';
import { LoginComponent } from './login/login.component';
import { ResourcesComponent } from './resources/resources.component';
import { EventPageComponent } from './event-page/event-page.component';
import { ArticleComposerComponent } from './article-composer/article-composer.component';
import { JobDetailPageComponent} from './job-detail-page/job-detail-page.component';
import { ProfileComponent } from './profile/profile.component';
import { ClubDetailComponent } from './club-detail/club-detail.component';
import { UpdateComponent } from './update/update.component';
import { ArticleComponent } from './article/article.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AuthGuard } from './guards/auth.guard';
import { CanDeactivateUpdate } from './guards/can-deactivate.guard';
import { ClubDetailResolve } from './services/club-detail-resolve.service';
import { NewsfeedResolve } from './services/newsfeed-resolve.service';

const appRoutes: Routes = [
  { path: 'newsfeed',   component: NewsfeedContainerComponent, resolve: { feeds: NewsfeedResolve } },
  { path: 'hiring',     component: HiringComponent },
  { path: 'clubs',      component: ClubsComponent },
  { path: 'resources',  component: ResourcesComponent },
  { path: 'home',  component: LandingPageComponent },
  { path: 'beans', canActivate: [AuthGuard], component: BeansComponent },
  { path: 'compose', canActivate: [AuthGuard], component: ArticleComposerComponent },
  { path: 'profile', canActivate: [AuthGuard],  component: ProfileComponent },
  { path: 'profile/:id', canActivate: [AuthGuard],  component: ProfileComponent },
  { path: 'update', canActivate: [AuthGuard], canDeactivate: [CanDeactivateUpdate],  component: UpdateComponent },
  { path: 'login',   component: LoginComponent },
  { path: 'events/:id', component: EventPageComponent },
  { path: 'hiring/:id', component: JobDetailPageComponent},
  { path: 'clubs/:id', component: ClubDetailComponent, resolve: { clubAndEvents: ClubDetailResolve } },
  { path: 'article/:id', component: ArticleComponent},
  { path: '',   redirectTo: '/home', pathMatch: 'full' }
  //{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
  public route: Observable<any>;
  constructor(r: Router) {
    // r.events.subscribe((url:any) => console.log("URL", url.url));
  }
}
