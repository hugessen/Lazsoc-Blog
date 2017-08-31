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
import { SidebarComponent,ProfileSidebar, JobPostingSidebar, SocialLinksSidebar } from './sidebar/sidebar.component';
import { BeansComponent } from './beans/beans.component';
import { ArticleComposerComponent } from './article-composer/article-composer.component';
import { AuthGuard } from './guards/auth.guard';

//Modules
import { FormsModule }   from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//Pipes
import { GetLongDate, GetTime,GetMonth,GetDate } from './pipes/get-long-date.pipe';
import { MapToIterablePipe } from './pipes/map-to-iterable.pipe';

//Services
import { Angular2TokenService } from 'angular2-token';
import { AuthService } from './services/auth.service';
import { WebAPI } from './services/web-api.service';
import { JobDetailPageComponent } from './job-detail-page/job-detail-page.component';
import { ProfileComponent } from './profile/profile.component';
import { ClubDetailComponent } from './club-detail/club-detail.component';
import { NewsfeedContainerComponent } from './newsfeed-container/newsfeed-container.component';
import { UpdateComponent } from './update/update.component';

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
    GetMonth,
    GetDate,
    MapToIterablePipe,
    EventPageComponent,
    LoginComponent,
    SidebarComponent,
    ProfileSidebar,
    SocialLinksSidebar,
    BeansComponent,
    ArticleComposerComponent,
    JobDetailPageComponent,
    ProfileComponent,
    ClubDetailComponent,
    JobPostingSidebar,
    NewsfeedContainerComponent,
    UpdateComponent,
    GetTime
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
  providers: [WebAPI, Angular2TokenService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
