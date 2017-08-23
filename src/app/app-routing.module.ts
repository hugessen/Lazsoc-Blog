import { NgModule }              from '@angular/core';
import { RouterModule, Routes, Router }  from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { NewsfeedComponent } from './newsfeed/newsfeed.component';
import { BeansComponent } from './beans/beans.component';
import { LazNavbar } from './nav-bar/laz-navbar';
import { HiringComponent } from './hiring/hiring.component';
import { ClubsComponent } from './clubs/clubs.component';
import { LoginComponent } from './login/login.component';
import { OurTeamComponent } from './our-team/our-team.component';
import { ClubResourcesComponent } from './club-resources/club-resources.component';
import { EventPageComponent } from './event-page/event-page.component';
import { ArticleComposerComponent } from './article-composer/article-composer.component';
import { JobDetailPageComponent} from './job-detail-page/job-detail-page.component';
import { ProfileComponent } from './profile/profile.component';
import { ClubDetailComponent } from './club-detail/club-detail.component';

const appRoutes: Routes = [
  { path: 'newsfeed',   component: NewsfeedComponent },
  { path: 'hiring',     component: HiringComponent },
  { path: 'clubs',      component: ClubsComponent },
  { path: 'fullteam',   component: OurTeamComponent },
  { path: 'resources',  component: ClubResourcesComponent },
  { path: 'beans',  component: BeansComponent },
  // { path: 'compose',  component: ArticleComposerComponent },
  { path: 'profile',  component: ProfileComponent },
  { path: 'login/:state',   component: LoginComponent },
  { path: 'events/:id', component: EventPageComponent },
  { path: 'hiring/:id', component: JobDetailPageComponent},
  { path: 'clubs/:id', component: ClubDetailComponent},
  { path: '',   redirectTo: '/newsfeed', pathMatch: 'full' }
  //{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
  public route:Observable<any>;
  constructor(r:Router){
    // r.events.subscribe((url:any) => console.log("URL", url.url));
  }
}
