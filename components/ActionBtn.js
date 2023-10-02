import css from './ActionBtn.module.css';

export default function ActionBtn({
  id,
  text,
  action,
  onClick,
}) {
  // console.count('ActionBtn render');
  return (
    <button
      className={css.userRowBtn}
      data-id={id}
      data-action={action}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
