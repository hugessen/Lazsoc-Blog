import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { NewsfeedComponent } from './newsfeed/newsfeed.component';
import { PostingCard } from './posting-card/posting-card';
import { LazNavbar } from './nav-bar/laz-navbar';
import { HiringComponent } from './hiring/hiring.component';
import { ClubsComponent } from './clubs/clubs.component';
import { OurTeamComponent } from './our-team/our-team.component';
import { ClubResourcesComponent } from './club-resources/club-resources.component';
import { EventPageComponent } from './event-page/event-page.component';

const appRoutes: Routes = [
  { path: 'newsfeed',   component: NewsfeedComponent },
  { path: 'hiring',     component: HiringComponent },
  { path: 'clubs',      component: ClubsComponent },
  { path: 'fullteam',   component: OurTeamComponent },
  { path: 'resources',  component: ClubResourcesComponent },
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
