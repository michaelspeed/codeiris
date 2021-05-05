import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MeiliSearch } from 'meilisearch';
import { EventBus } from '../event-bus/event-bus';
import {
  CreatePostEvents,
  UpdatePostEvent,
} from '../event-bus/events/post.events';
import { merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Post } from '../models/post.model';

@Injectable()
export class MeilisearchService implements OnModuleInit {
  private meiliInstance: MeiliSearch;

  constructor(
    private readonly config: ConfigService,
    private eventBus: EventBus,
  ) {}

  onModuleInit() {
    this.meiliInstance = new MeiliSearch({
      host: this.config.get<string>('MEILI'),
    });
    // TODO remove this if index is already created
    // this.meiliInstance.createIndex('posts');
    const postCreateEvent$ = this.eventBus.ofType(CreatePostEvents);
    const postUpdateEvent$ = this.eventBus.ofType(UpdatePostEvent);
    merge(postCreateEvent$)
      .pipe(debounceTime(50))
      .subscribe(async (event) => {
        await this.addPostToMeilisearchIndex(event.post);
      });
    merge(postUpdateEvent$)
      .pipe(debounceTime(50))
      .subscribe(async (event) => {
        await this.updatePostToMeilisearchIndex(event.post);
      });
  }

  async updatePostToMeilisearchIndex(post: Post) {
    const { id, body, type, url, slug, title } = post;
    return this.meiliInstance
      .index('posts')
      .updateDocuments([{ id, body, type, url, slug, title }]);
  }

  async addPostToMeilisearchIndex(post: Post) {
    const { id, body, type, url, slug, title } = post;
    return this.meiliInstance
      .index('posts')
      .addDocuments([{ id, body, type, url, slug, title }]);
  }
}
