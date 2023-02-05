import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient,
    private cookie: CookieService,
    private router: Router
  ) { }

  getMyMovies() {
    return this.http.get<Movie[]>(environment.apiUrl + "/movie/" + this.cookie.get("_id"))
  }

  getMovieById(id: string) {
    return this.http.get<Movie>(environment.apiUrl + "/movie/get-one/" + id)
  }

  addNewMovie(title: string, director: string, genre: string, description: string, rating: Number) {
    var json = {
      _id: this.cookie.get("_id"),
      title: title,
      director: director,
      genre: genre,
      description: description,
      rating: rating
    }

    this.http.post<boolean>(environment.apiUrl + "/movie", json).subscribe(res => {
      this.router.navigate([""])
    })
  }

  deleteMovie(id: string) {
    return this.http.delete<boolean>(environment.apiUrl + "/movie/" + id)
  }

  editMovie(_id: string, title: string, director: string, genre: string, description: string, rating: Number) {

    var json = {
      _id: _id,
      title: title,
      director: director,
      genre: genre,
      description: description,
      rating: rating
    }

    return this.http.put<boolean>(environment.apiUrl + "/movie", json)
  }
}