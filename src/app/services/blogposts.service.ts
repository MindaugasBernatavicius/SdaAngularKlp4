import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BlogpostsService {

  url = 'http://localhost:8081/api/posts'

  constructor(private httpClient: HttpClient) { }

  getBlogPosts(): any {
    // return [
    //   {id: 1, author: 'Jonas', post: 'Labai gerai!'},
    //   {id: 2, author: 'Petras', post: 'Labai blogai!'}
    // ];
    return this.httpClient.get(this.url);
  }

  createPost(author: string, text: string) {
    return this.httpClient.post<any>(this.url, { 'author': author, 'post': text });
  }

  deletePost(id: number) {
    return this.httpClient.delete(this.url + '/' + id)
  }
}
