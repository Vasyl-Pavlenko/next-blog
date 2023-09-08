import Image from 'next/image'
import styles from './page.module.css'
import Button from '@/components/Button/Button'
import { items } from './data'
import { notFound } from 'next/navigation';

export const metadata = {
  title: "Portfolio",
};

const getData = (categories) => items[categories] || notFound();

const Category = ({ params }) => {
  const data = getData(params.category)

  return (
    <div className={styles.container}>
      <h1 className={styles.catTitle}>
        {params.category}
      </h1>

      {data.map(({ id, title, desc, image }) => (
        <div
          key={id}
          className={styles.item}
        >
          <div className={styles.imgContainer}>
            <Image
              className={styles.img}
              width={500}
              height={400}
              src={image}
              alt={title}
            />
          </div>

          <div className={styles.content}>
            <h1 className={styles.title}>
              {title}
            </h1>

            <p className={styles.desc}>
              {desc}
            </p>

            <Button
              text="See More"
              url="#"
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export default Category