import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginformComponent } from './components/loginform/loginform.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

import {UserService} from './services/user.service';
import {AuthenticationGuard} from './services/authentication.guard';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { UserComponent } from './components/user/user.component';
import { UserdetailComponent } from './components/userdetail/userdetail.component';
import { HomeComponent } from './components/home/home.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { TeacherComponent } from './components/teacher/teacher.component';
import { StaticsComponent } from './components/statics/statics.component';
import { InvoicedetailComponent } from './components/invoicedetail/invoicedetail.component';
import { ExpanceComponent } from './components/expance/expance.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NguiAutoCompleteModule} from '@ngui/auto-complete';
import {HttpModule} from '@angular/http';
import {StudentService} from './services/student.service';
import {TeacherService} from './services/teacher.service';

const appRoutes: Routes = [
  {path: '', component: HomeComponent, children: [
    {path: 'invoice', component: InvoiceComponent},
    {path: 'invoice/:no', component: InvoicedetailComponent},
    {path: 'statistic', component: StaticsComponent},
    {path: 'teacher', component: TeacherComponent},
    {path: 'user', component: UserComponent},
    {path: 'user/:id', component: UserdetailComponent},
    {path: 'expense', component: ExpanceComponent}
  ]},
  {path: 'login', component: LoginformComponent},
  {path: 'login/:username', component: LoginformComponent},
  {path: '**', component: NotfoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginformComponent,
    HeaderComponent,
    FooterComponent,
    NotfoundComponent,
    UserComponent,
    UserdetailComponent,
    HomeComponent,
    InvoiceComponent,
    TeacherComponent,
    StaticsComponent,
    InvoicedetailComponent,
    ExpanceComponent,
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    NguiAutoCompleteModule,
    HttpModule
  ],
  providers: [UserService, AuthenticationGuard, StudentService, TeacherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
