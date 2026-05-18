import { Header } from '@/components/header'
import { ProductsGallery } from '@/components/products-gallery'
import { Contact, Footer } from '@/components/contact'

export default function ProductsPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-20">
        <ProductsGallery />
        <Contact />
      </div>
      <Footer />
    </main>
  )
}
