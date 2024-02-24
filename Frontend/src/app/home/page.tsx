import { Metadata } from 'next';
import styles from './home.module.css';

export const metadata: Metadata = {
  title: 'Home - Blog'
};

export default function Page() {
  return (
    <>
      <WideContent></WideContent>
      <NarrowContent></NarrowContent>
    </>
  )
}

function WideContent() {
  return (
    <div className='max-md:hidden grid grid-cols-3 gap-x-12'>
      <div className={`card col-span-2`}>
        <PinnedPageComponent />
      </div>
      <div className={`card col-span-1`}>
        <HelloComponent />
      </div>
      <div className={`card col-span-1`}>
        <LinksComponent />
      </div>
      <div className={`card col-span-2`}>
        <LatestPostsComponent />
      </div>
    </div>
  )
}

function NarrowContent() {
  return (
    <div className='md:hidden max-w-lg mx-auto mt-6'>
      <div className='mb-4'>
        <HelloComponent />
      </div>
      <div className='mb-4'>
        <PinnedPageComponent />
      </div>
      <div className='mb-4'>
        <LatestPostsComponent />
      </div>
      <div className='mb-4'>
        <LinksComponent />
      </div>
    </div>
  )
}

function HelloComponent() {
  return (
    <>
      <h2 className={styles.cardTitle}>Hello</h2>
    </>
  )
}

function PinnedPageComponent() {
  return (
    <>
      <h2 className={styles.cardTitle}>Pinned page</h2>
    </>
  )
}

function LatestPostsComponent() {
  return (
    <>
      <h2 className={styles.cardTitle}>Latest posts</h2>
    </>
  )
}

function LinksComponent() {
  return (
    <>
      <h2 className={styles.cardTitle}>Links</h2>
    </>
  )
}
