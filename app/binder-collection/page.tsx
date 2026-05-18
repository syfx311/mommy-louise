import { Header } from '@/components/header'
import { BinderCollectionPreview } from '@/components/binder-collection-preview'
import { Contact, Footer } from '@/components/contact'

export default function BinderCollectionPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-20">
        <BinderCollectionPreview />
        <Contact />
      </div>
      <Footer />
    </main>
  )
}
