import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css']
})
export class EditMovieComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private movieService: MovieService,
    private router: Router) { }

  _id: string = ""
  title: string = ""
  director: string = ""
  genre: string = ""
  description: string = ""
  rating: Number = 0

  error: boolean = false
  errorMessage: string = ""

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.movieService.getMovieById(params["id"]).subscribe(movie => {
        this._id = movie._id
        this.title = movie.title
        this.director = movie.director
        this.genre = movie.genre
        this.description = movie.description
        this.rating = movie.rating
      })
    })
  }

  editMovie() {
    if (this.validateInputs()) {
      var response = this.movieService.editMovie(this._id, this.title, this.director, this.genre, this.description, this.rating).subscribe(res => {
        this.router.navigate([""])
      })
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