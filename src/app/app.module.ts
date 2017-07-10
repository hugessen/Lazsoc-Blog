import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PostingCard } from './posting-card/posting-card';
import { LazNavbar } from './nav-bar/laz-navbar';
import { HiringContainer } from './hiring-container/hiring-container';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NewsfeedComponent } from './newsfeed/newsfeed.component';
import { RouterModule, Routes, Router } from '@angular/router';
import { HiringComponent } from './hiring/hiring.component';
import { ClubsComponent } from './clubs/clubs.component';

@NgModule({
  declarations: [
    AppComponent,
    LazNavbar,
    HiringContainer,
    PostingCard,
    NewsfeedComponent,
    HiringComponent,
    ClubsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
