import { Image } from '@nextui-org/react';
import styles from './Article.module.css';

const IMAGE_WIDTH_SIZE = 270;
export const Article = ({
  image_url,
  subtitle,
  contents
}: {
  image_url: string;
  subtitle: string;
  contents: string;
}) => {
  return (
    <article className={styles.article}>
      <Image src={image_url} width={IMAGE_WIDTH_SIZE} className={`${styles.image} ${styles.item}`} />
      <span className={`${styles.description} ${styles.item}`}>
        <h3 className={styles.subtitle}>{subtitle}</h3>
        <p className={styles.use_case}>{contents}</p>
      </span>
    </article>
  );
};
