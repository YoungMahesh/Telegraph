## :point_right: Why I created this site :question:

- I truly love [Telegra.ph](https://telegra.ph/), but the only feature I does not like on Telegraph is that you cannot provide your custom-url, it gets generated automatically for you based on title of your post and date of your post.
- And also if you created page on Telegraph without logging in to the Telegram, then the content on that page cannot be edited. ( I know there are specific reasons for that )
- So, I created my own clone of Telegraph, although currently it does not have same quality as original Telegraph (such as - image-upload, video-embed, beatiful UI) but it completes the need -
    - you can provide your custom url for your post
    - you can edit or delete your post even if you are not logged in anywhere.

## :point_right: System Design

- You write your post - Title, Post; then provide custom-url; and if that URL is not already in use then post is published
- On posting your content, you get a key, which can be used in future to edit or delete your post.
- ReactJS is used as frontend
- NodeJS is used as backend
- FaunaDB is used as database for storing post-data.
