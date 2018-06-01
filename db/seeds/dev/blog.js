let post;

exports.seed = (knex, Promise) =>
  knex('posts')
    .del()
    .then(() => knex('tags').del())
    .then(() => knex('users').del())
    .then(() => knex('post_tags').del())
    .then(() =>
      knex('users')
        .insert(
          [{ name: 'Patrick Rivera' }, { name: 'Leo DaVinci' }, { name: 'Will Shakespeare' }],
          'id'
        )
        .then(([patrick, leo]) =>
          knex('posts').insert(
            [
              { userId: patrick, text: `Just coding and stuff. Having a good ole' time.` },
              { userId: patrick, text: 'Still coding. Still fun!!!' },
              { userId: leo, text: `Painting a cool painting. It's cool and stuff.` }
            ],
            'id'
          )
        )
        .then((createdPosts) => {
          post = createdPosts;
          return knex('tags').insert(
            [{ tag: 'Programming' }, { tag: 'Fun' }, { tag: 'Art' }],
            'id'
          );
        })
        .then(([programming, fun, art]) =>
          knex('post_tags').insert([
            { postId: post[0], tagId: programming },
            { postId: post[0], tagId: fun },
            { postId: post[1], tagId: programming },
            { postId: post[1], tagId: fun },
            { postId: post[2], tagId: art }
          ])
        )
        .then(() => console.log('Seeding complete!'))
        .catch((err) => console.log(`Error => ${err}`))
    );
