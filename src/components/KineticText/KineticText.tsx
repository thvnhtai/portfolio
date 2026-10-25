import s from './KineticText.module.css';

type Props = { as?: 'h1' | 'h2' | 'span'; text: string; className?: string; accentLast?: boolean };

export function KineticText({ as: Tag = 'span', text, className, accentLast }: Props) {
  return (
    <Tag className={className}>
      <span className={s.srOnly}>{text}</span>
      <span aria-hidden="true">
        {text.split(' ').map((word, w, words) => (
          <span key={w}>
            {w > 0 && ' '}
            <span className={s.word}>
              {[...word].map((ch, i) => <span key={i} className={s.ch} data-accent={accentLast && w === words.length - 1 && i === word.length - 1 ? '' : undefined}>{ch}</span>)}
            </span>
          </span>
        ))}
      </span>
    </Tag>
  );
}
