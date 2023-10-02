import css from './ShowPostsBtn.module.css';

export default function ShowPostsBtn({
  id,
  text,
  action,
  onClick,
}) {
  console.count('ShowPosts-button render');
  return (
    <button
      className={css.postsShowBtn}
      data-id={id}
      data-action={action}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
