import {Component, OnInit} from '@angular/core';
import {BlogpostsService} from "../../services/blogposts.service";

@Component({
  selector: 'app-blogposts',
  template: `
    <table class="table">
      <thead>
      <tr>
        <th>Id</th>
        <th>Author</th>
        <th>Text</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr *ngFor='let blogpost of blogposts'>
        <td>{{ blogpost.id }}</td>
        <td>{{ blogpost.author }}</td>
        <td>{{ blogpost.post }}</td>
        <td>
          <button class="btn btn-warning me-2">Edit</button>
          <button class="btn btn-danger me-2">Delete</button>
        </td>
      </tr>
      </tbody>
      <tfoot>
      <tr>
        <td></td>
        <td><input name="author" class="form-control" [(ngModel)]="author"></td>
        <td><input name="text" class="form-control" [(ngModel)]="text"></td>
        <td>
          <button (click)="createPost()" class="btn btn-dark me-2">Create</button>
        </td>
      </tr>
      </tfoot>
    </table>
  `,
  styleUrls: ['./blogposts.component.css']
})
export class BlogpostsComponent implements OnInit {
  blogposts: any = [];
  author = ``;
  text = ``;

  constructor(private blogpostsService: BlogpostsService) {
  }

  ngOnInit(): void {
    this.blogpostsService.getBlogPosts().subscribe(
      (res: any) => this.blogposts = res,
      (err: any) => console.log(err)
    );
  }

  createPost(): void {
    // console.log(`${this.author} : ${this.text}`);
    this.blogpostsService.createPost(this.author, this.text).subscribe(
      (res: any) => {
        this.blogpostsService.getBlogPosts().subscribe(
          (res: any) => this.blogposts = res,
          (err: any) => console.log(err)
        );
        this.author = ``;
        this.text = ``;
      },
      (err: any) => console.log(err)
    );
  }
}
