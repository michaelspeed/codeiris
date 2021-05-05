# CODEIRIS
Three lazy programmer create tech post app for other lazy programmers. Build with NestJS.

# Links
## Production
https://codeiris.dev/
## Developement
https://dev.codeiris.dev/

# Features
- **Password less Login and Signup:** User should be able to login with Google, GitHub etc. using their email address
- **Link Posts:** User should be able to create link posts and add tags.
- **Ask HN Posts:** User should be able to create Ask HN post and add tags
- **Paid Job Posting:** Users can pay certain amount to post their job (Use RazorPay's test environment) and add tags
- **Can edit and delete their own posts:** User can edit and delete their own posts. Deleting posts won't delete the comments or replies on that post.
- **Real time replies with 3 level comments:** User should be able to reply and other users wherever they are should be able to see the reply immediately ( Use WebSockets or Pusher or SSE)
- **Reply notifications:** When a user's post is replied by someone they should get a notification on bell icon and through email.
- **Email Digest of Top posts, Top Ask HN, Top Jobs:** Users should be able to receive a daily email digest that has information of top posts, top ask HN posts and top job postings.
- **Filter by tags:** User should be able to filter by tag.
- **Sort by Published date:** User should be able sort posts by published date with in the page (expecting client side sorting, feel free to have server side sorting)
- **Sort by top votes:** User should be able to sort by top votes (expecting client side sorting, feel free to have server side sorting)
- **Full Text Search:** User should be able to do full text search on all posts and comments in the database. ([Meilisearch](https://www.meilisearch.com/))
- **Filter by date range:** User should be able to filter using a date range.
- **Pagination for posts:** User should be able to go to next page using pagination navigation
- **Lazy loading for discussions:** Discussions on post should load lazily
- **Flag Inappropriate posts:** Users with role of Moderators can flag discussions when they are inappropriate.
- **Flag Inappropriate users:** Users with role of Moderators can flag users when they are creating inappropriate posts.
- **Admin can Delete and edit any posts:** User with role of admin can delete posts if they are inappropriate and edit posts if they want to. They can also delete and edit flagged posts.
- **Admin can disable users:** User with role of admin can disable a user if they create inappropriate posts and flagged users
=======
