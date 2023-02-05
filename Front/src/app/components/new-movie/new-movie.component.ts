import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-new-movie',
  templateUrl: './new-movie.component.html',
  styleUrls: ['./new-movie.component.css']
})
export class NewMovieComponent {
  title: string = ""
  director: string = ""
  genre: string = "action"
  description: string = ""
  rating: Number = 10

  error: boolean = false
  errorMessage: string = ""

  constructor(private movieService: MovieService,
    private router: Router) { }

  addMovie() {
    if (this.validateInputs()) {
      var response = this.movieService.addNewMovie(this.title, this.director, this.genre, this.description, this.rating)
    }
  }

  validateInputs(): boolean {
    return this.checkTitle() && this.checkDirector() && this.checkDescription();
  }

  private checkTitle(): boolean {
    if (this.title == "") {
      this.error = true
      this.errorMessage = "Title is empty"
      return false
    }
    else {
      return true
    }
  }

  private checkDirector(): boolean {
    if (this.director == "") {
      this.error = true
      this.errorMessage = "Director is empty"
      return false
    }
    else {
      return true
    }
  }

  private checkDescription(): boolean {
    if (this.description == "") {
      this.error = true
      this.errorMessage = "Description is empty"
      return false
    }
    else {
      return true
    }
  }

  discard() {
    this.router.navigate(["/"])
  }
}