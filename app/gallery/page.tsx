import { Header } from '@/components/header'
import { GalleryShowcase } from '@/components/gallery-showcase'
import { Contact, Footer } from '@/components/contact'

export default function GalleryPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-20">
        <GalleryShowcase />
        <Contact />
      </div>
      <Footer />
    </main>
  )
}
