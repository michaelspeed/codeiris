import { CodeirisEvents } from '../codeiris-events';
import { Post } from '../../models/post.model';

export class CreatePostEvents extends CodeirisEvents {
  constructor(public post: Post) {
    super();
  }
}

export class UpdatePostEvent extends CodeirisEvents {
  constructor(public post: Post) {
    super();
  }
}
