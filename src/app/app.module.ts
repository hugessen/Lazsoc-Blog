import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LazNavbar } from './nav-bar/laz-navbar';
import { AppRoutingModule } from './app-routing.module';
import { WebAPI } from './services/web-api.service';
import { HttpModule } from '@angular/http';
import { AuthService } from './services/auth.service';

import { AppComponent } from './app.component';
import { NewsfeedComponent } from './newsfeed/newsfeed.component';
import { RouterModule, Routes, Router } from '@angular/router';
import { HiringComponent } from './hiring/hiring.component';
import { ClubsComponent } from './clubs/clubs.component';
import { OurTeamComponent } from './our-team/our-team.component';
import { ClubResourcesComponent } from './club-resources/club-resources.component';
import { GetLongDate } from './get-long-date.pipe';
import { EventPageComponent } from './event-page/event-page.component';
import { Angular2TokenService } from 'angular2-token';
import { LoginComponent } from './login/login.component';
import { SidebarComponent,ProfileSidebar } from './sidebar/sidebar.component';
import { BeansComponent } from './beans/beans.component';

@NgModule({
  declarations: [
    AppComponent,
    LazNavbar,
    NewsfeedComponent,
    HiringComponent,
    ClubsComponent,
    OurTeamComponent,
    ClubResourcesComponent,
    GetLongDate,
    EventPageComponent,
    LoginComponent,
    SidebarComponent,
    ProfileSidebar,
    BeansComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpModule
  ],
  providers: [WebAPI, Angular2TokenService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
