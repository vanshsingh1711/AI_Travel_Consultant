import { CategoryCarousel } from '../components/CategoryCarousel'
import { Gallery } from '../components/Gallery'
import { Hero } from '../components/Hero'
import { Stats } from '../components/Stats'
import { StaySection } from '../components/StaySection'

export function Home() {
  return (
    <>
      <Hero />
      <CategoryCarousel />
      <StaySection />
      <Gallery />
      <Stats />
    </>
  )
}
