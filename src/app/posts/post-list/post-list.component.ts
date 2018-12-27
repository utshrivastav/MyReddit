import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from '../post.model';
import { PostService } from '../posts.service';

@Component ({
  selector : 'app-post-list',
  templateUrl : './post-list.component.html',
  styleUrls: ['./post-list.component.css'],

})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  private postsSub: Subscription;
  isLoading = false;
  constructor(public postService: PostService) {

  }
  ngOnInit() {
    this.postService.getPosts();
    this.isLoading = true;
    this.postsSub = this.postService.getPostUpdateListner()
      .subscribe((posts: Post[]) => {
        this.isLoading = false;
        this.posts = posts;
      });
  }
  onDelete(postId: string) {
    this.postService.deletePost(postId);
  }
  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
