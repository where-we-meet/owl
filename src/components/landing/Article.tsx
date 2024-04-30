import { Image } from '@nextui-org/react';
import styles from './Article.module.css';

export const Article = ({
  image_url,
  subtitle,
  contents,
  width,
  height
}: {
  image_url: string;
  subtitle: string;
  contents: string;
  width: number;
  height: number;
}) => {
  return (
    <article className={styles.article}>
      <Image
        src={image_url}
        alt={subtitle}
        width={width}
        height={height}
        className={`${styles.image} ${styles.item}`}
      />
      <span className={`${styles.description} ${styles.item}`}>
        <h2 className={styles.subtitle}>{subtitle}</h2>
        <p className={styles.use_case}>{contents}</p>
      </span>
    </article>
  );
};
