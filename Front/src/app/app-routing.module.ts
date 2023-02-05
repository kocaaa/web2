import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditMovieComponent } from './components/edit-movie/edit-movie.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NewMovieComponent } from './components/new-movie/new-movie.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'add-movie', component: NewMovieComponent, canActivate: [AuthGuard] },
  { path: 'edit-movie/:id', component: EditMovieComponent },
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
