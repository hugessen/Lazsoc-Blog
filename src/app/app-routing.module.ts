import { NgModule }              from '@angular/core';
import { RouterModule, Routes, Router }  from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { NewsfeedContainerComponent } from './newsfeed-container/newsfeed-container.component';
import { BeansComponent } from './beans/beans.component';
import { LazNavbar } from './nav-bar/laz-navbar';
import { HiringContainerComponent } from './hiring-container/hiring-container.component';
import { ClubsComponent } from './clubs/clubs.component';
import { LoginComponent } from './login/login.component';
import { OurTeamComponent } from './our-team/our-team.component';
import { ResourcesComponent } from './resources/resources.component';
import { EventPageComponent } from './event-page/event-page.component';
import { ArticleComposerComponent } from './article-composer/article-composer.component';
import { JobDetailPageComponent} from './job-detail-page/job-detail-page.component';
import { ProfileComponent } from './profile/profile.component';
import { ClubDetailComponent } from './club-detail/club-detail.component';
import { UpdateComponent } from './update/update.component';
import { AuthGuard } from './guards/auth.guard';

const appRoutes: Routes = [
  { path: 'newsfeed',   component: NewsfeedContainerComponent },
  { path: 'hiring',     component: HiringContainerComponent },
  { path: 'clubs',      component: ClubsComponent },
  { path: 'fullteam',   component: OurTeamComponent },
  { path: 'resources',  component: ResourcesComponent },
  { path: 'beans', canActivate: [AuthGuard], component: BeansComponent },
  { path: 'compose',  component: ArticleComposerComponent },
  { path: 'profile', canActivate: [AuthGuard],  component: ProfileComponent },
  { path: 'profile/:id', canActivate: [AuthGuard],  component: ProfileComponent },
  { path: 'update', canActivate: [AuthGuard],  component: UpdateComponent },
  { path: 'login',   component: LoginComponent },
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
      { enableTracing: false } // <-- debugging purposes only
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
