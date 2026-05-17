import { createClient } from '@/utils/supabase/server'
import Image from 'next/image'
import Link from 'next/link'
import { Utensils, Truck, Wallet, MessageSquare } from 'lucide-react' // Necesitas instalar lucide-react

export default async function PublicPage() {
  const supabase = await createClient()
  const { data: productos } = await supabase
    .from('productos')
    .select('*, categorias(nombre)')
    .eq('activo', true)

  const whatsappNumber = "5492213541722"

  return (
    <div className="min-h-screen bg-black text-zinc-100 selection:bg-red-600">
      
      {/* --- HERO SECTION --- */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden border-b border-zinc-800">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2069&auto=format&fit=crop')] bg-cover bg-center opacity-40 grayscale hover:grayscale-0 transition-all duration-1000" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        
        <div className="relative z-10 text-center px-6">
          <div className="mb-6 inline-block p-4 border-2 border-sky-400 rounded-full bg-black/50 backdrop-blur-sm">
            {/* Representación visual de la escarapela del logo */}
            <span className="text-sky-400 font-black text-xl tracking-tighter">MAX PREMIUM</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-white mb-4">
            CARNES <span className="text-red-600">MAX</span>
          </h1>
          <p className="text-xl md:text-2xl font-light text-zinc-400 max-w-3xl mx-auto leading-relaxed">
            Un puente entre la calidad y el disfrute. Sabores que nos regalaban nuestros abuelos, con el mismo amor.
          </p>
        </div>
      </section>

      {/* --- VALORES (Info de las imágenes) --- */}
      <section className="py-16 bg-zinc-950 border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-center text-center p-4">
            <Truck className="text-red-600 mb-4" size={32} />
            <h3 className="font-bold uppercase text-sm mb-2">Envío Sin Cargo</h3>
            <p className="text-zinc-500 text-xs">Directo a tu puerta en el horario pactado.</p>
          </div>
          <div className="flex flex-col items-center text-center p-4">
            <Wallet className="text-red-600 mb-4" size={32} />
            <h3 className="font-bold uppercase text-sm mb-2">Precios Reales</h3>
            <p className="text-zinc-500 text-xs">Sin especulaciones. Valor directo de familia.</p>
          </div>
          <div className="flex flex-col items-center text-center p-4">
            <Utensils className="text-red-600 mb-4" size={32} />
            <h3 className="font-bold uppercase text-sm mb-2">Calidad Premium</h3>
            <p className="text-zinc-500 text-xs">La verdadera carne argentina en tu mesa.</p>
          </div>
          <div className="flex flex-col items-center text-center p-4">
            <MessageSquare className="text-red-600 mb-4" size={32} />
            <h3 className="font-bold uppercase text-sm mb-2">Cuenta DNI</h3>
            <p className="text-zinc-500 text-xs">Aceptamos efectivo y pagos digitales.</p>
          </div>
        </div>
      </section>

      {/* --- CATÁLOGO --- */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-4xl font-black uppercase italic tracking-tighter mb-2">Nuestras Listas</h2>
            <div className="h-1 w-24 bg-red-600" />
          </div>
          <p className="text-zinc-500 max-w-md text-right border-r-2 border-zinc-800 pr-4">
            Seleccioná tus cortes y envianos un mensaje con tu nombre y dirección completa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {productos?.map((prod) => (
            <div key={prod.id} className="group bg-zinc-900/50 border border-zinc-800 rounded-3xl overflow-hidden hover:border-red-600/50 transition-all">
              <div className="relative h-64 overflow-hidden">
                <Image 
                  src={prod.url_imagen || '/placeholder-meat.jpg'} 
                  alt={prod.titulo} 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-zinc-700 text-[10px] font-bold uppercase tracking-widest text-sky-400">
                  {prod.categorias?.nombre}
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2 uppercase">{prod.titulo}</h3>
                <p className="text-zinc-500 text-sm mb-6 line-clamp-2 leading-relaxed italic">
                  "{prod.descripcion}"
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-black text-white">${prod.precio_base}</span>
                  <Link 
                    href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`¡Hola! Quiero pedir ${prod.titulo}. Mi nombre es: \nMi dirección es:`)}`}
                    className="bg-white text-black hover:bg-red-600 hover:text-white font-bold px-6 py-3 rounded-xl transition-colors uppercase text-xs"
                  >
                    Pedir Ahora
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- FOOTER / CONTACTO --- */}
      <footer className="bg-zinc-950 border-t border-zinc-900 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-black mb-8 uppercase tracking-widest">¿Contamos con vos?</h2>
          <div className="bg-red-600 inline-block px-8 py-4 rounded-2xl mb-8 transform -rotate-1">
            <span className="text-2xl font-bold italic">CONTACTO: 221 354 1722</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-zinc-500 text-sm mt-8">
            <p>📍 Envíos en toda la zona</p>
            <p>🥩 Productos de Calidad Real</p>
            <p>💳 Efectivo o Cuenta DNI</p>
          </div>
        </div>
      </footer>
    </div>
  )
}