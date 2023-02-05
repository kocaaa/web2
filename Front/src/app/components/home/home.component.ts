import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Movie } from 'src/app/models/movie';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  movies: Movie[] = []
  username: string = ""
  sort: string = "newest"

  constructor(private router: Router,
    private movieService: MovieService,
    private cookieService: CookieService) { }

  ngOnInit(): void {

    this.username = this.cookieService.get("username")

    this.movieService.getMyMovies().subscribe(response => {
      this.movies = response.reverse()
    })
  }

  addNewMovie() {
    this.router.navigate(["/add-movie"])
  }

  deleteMovie(id: string) {
    this.movieService.deleteMovie(id).subscribe(response => {
      this.ngOnInit()
    })
  }

  editMovie(id: string) {
    this.router.navigate(["/edit-movie/" + id])
  }

  sortMovies(): void {

    console.log(this.sort)

    if (this.sort == "newest") {
      this.movieService.getMyMovies().subscribe(response => {
        this.movies = response.reverse()
      })
    } else
      if (this.sort == "best") {
        this.movieService.getMyMovies().subscribe(response => {
          this.movies = response
          this.movies.sort((a, b) => (a.rating > b.rating) ? -1 : 1)
        })
      }
      else
        if (this.sort == "worst") {
          this.movieService.getMyMovies().subscribe(response => {
            this.movies = response
            this.movies.sort((a, b) => (a.rating > b.rating) ? 1 : -1)
          })
        }
  }
}
