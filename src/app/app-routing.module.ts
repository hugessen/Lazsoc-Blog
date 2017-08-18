import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

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

const appRoutes: Routes = [
  { path: 'newsfeed',   component: NewsfeedComponent },
  { path: 'hiring',     component: HiringComponent },
  { path: 'clubs',      component: ClubsComponent },
  { path: 'fullteam',   component: LoginComponent },
  { path: 'resources',  component: ClubResourcesComponent },
  { path: 'beans',  component: ArticleComposerComponent },
  { path: 'events/:id', component: EventPageComponent },
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
export class AppRoutingModule {}
