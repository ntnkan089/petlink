import './globals.css'
import Nav from '@/app/components/Nav'
import AuthProvider from './context/AuthProvider'
import Footer from '@/app/components/Footer'

export const metadata = {
  title: 'PetLink',
  description: 'Adopt a smile',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">  
      <body className='flex flex-col min-h-screen'>
        <AuthProvider>
          <div className='flex flex-grow'>
            <Nav /> 
            <main className='ml-64 p-4 w-full flex-grow'>
              {children}
            </main>
          </div>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}
