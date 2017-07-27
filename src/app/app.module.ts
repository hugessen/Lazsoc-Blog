import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PostingCard } from './posting-card/posting-card';
import { LazNavbar } from './nav-bar/laz-navbar';
import { HiringContainer } from './hiring-container/hiring-container';
import { AppRoutingModule } from './app-routing.module';
import { WebAPI } from './web-api.service';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NewsfeedComponent } from './newsfeed/newsfeed.component';
import { RouterModule, Routes, Router } from '@angular/router';
import { HiringComponent } from './hiring/hiring.component';
import { ClubsComponent } from './clubs/clubs.component';
import { OurTeamComponent } from './our-team/our-team.component';
import { ClubResourcesComponent } from './club-resources/club-resources.component';
import { GetLongDate } from './get-long-date.pipe';
import { EventPageComponent } from './event-page/event-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LazNavbar,
    HiringContainer,
    PostingCard,
    NewsfeedComponent,
    HiringComponent,
    ClubsComponent,
    OurTeamComponent,
    ClubResourcesComponent,
    GetLongDate,
    EventPageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpModule
  ],
  providers: [WebAPI],
  bootstrap: [AppComponent]
})
export class AppModule { }
