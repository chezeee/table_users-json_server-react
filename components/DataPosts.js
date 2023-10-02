import css from './DataPosts.module.css';

export default function DataPosts({ posts, userId }) {
  console.count('Posts render');

  return (
    <fieldset className={css.fieldView}>
      <h2>{`Posts by User #${userId}`}</h2>
      <div className={css.flexField}>
        {posts.map((post) => {
          const { id, title, body } = post;
          return (
            <div key={id}>
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          );
        })}
      </div>
    </fieldset>
  );
}
