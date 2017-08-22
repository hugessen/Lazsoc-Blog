import { LazNavbar } from './nav-bar/laz-navbar';

import { HttpModule } from '@angular/http';

import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

import { AppComponent } from './app.component';
import { NewsfeedComponent } from './newsfeed/newsfeed.component';
import { RouterModule, Routes, Router } from '@angular/router';
import { HiringComponent } from './hiring/hiring.component';
import { ClubsComponent } from './clubs/clubs.component';
import { OurTeamComponent } from './our-team/our-team.component';
import { ClubResourcesComponent } from './club-resources/club-resources.component';
import { EventPageComponent } from './event-page/event-page.component';
import { LoginComponent } from './login/login.component';
import { SidebarComponent,ProfileSidebar } from './sidebar/sidebar.component';
import { BeansComponent } from './beans/beans.component';
import { ArticleComposerComponent } from './article-composer/article-composer.component';

//Modules
import { FormsModule }   from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//Pipes
import { GetLongDate } from './pipes/get-long-date.pipe';
import { MapToIterablePipe } from './pipes/mapToIterablePipe';

//Services
import { Angular2TokenService } from 'angular2-token';
import { AuthService } from './services/auth.service';
import { WebAPI } from './services/web-api.service';
import { JobDetailPageComponent } from './job-detail-page/job-detail-page.component';
import { ProfileComponent } from './profile/profile.component';
import { ClubDetailPageComponent } from './club-detail-page/club-detail-page.component';

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
    MapToIterablePipe,
    EventPageComponent,
    LoginComponent,
    SidebarComponent,
    ProfileSidebar,
    BeansComponent,
    ArticleComposerComponent,
    JobDetailPageComponent,
    ProfileComponent,
    ClubDetailPageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot()
  ],
  providers: [WebAPI, Angular2TokenService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
