import { createClient } from '@/utils/supabase/server'
import Image from 'next/image'

export default async function PublicPage() {
  const supabase = await createClient()
  
  // Consulta simplificada para evitar el error PGRST125 mientras testeamos
  const { data: productos, error } = await supabase
    .from('productos') 
    .select('*')
    .eq('activo', true)

  if (error) console.error("Error Supabase:", error)

  const whatsappNumber = "5492213541722"

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      
      {/* HEADER CON IDENTIDAD (LOGO ESCARAPELA) */}
      <nav className="border-b border-zinc-800 bg-black/80 backdrop-blur-md sticky top-0 z-50 py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            {/* Círculo celeste/blanco simulando el logo de la imagen */}
            <div className="w-12 h-12 rounded-full border-4 border-sky-400 bg-white flex items-center justify-center overflow-hidden shadow-[0_0_15px_rgba(56,189,248,0.5)]">
              <span className="text-black font-black text-xs">MAX</span>
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tighter leading-none">MAX CARNES</h1>
              <span className="text-[10px] text-sky-400 uppercase font-bold tracking-widest">Premium</span>
            </div>
          </div>
          <div className="hidden md:flex gap-6 text-xs font-bold uppercase tracking-widest text-zinc-400">
            <a href="#productos" className="hover:text-red-600 transition-colors">Productos</a>
            <a href="#contacto" className="hover:text-red-600 transition-colors">Contacto</a>
          </div>
        </div>
      </nav>

      {/* HERO CON EL SPLASH ROJO (Como en el flyer) */}
      <section className="relative py-24 px-6 flex flex-col items-center text-center overflow-hidden">
        {/* El "Splash" rojo de fondo que aparece en tus imágenes */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/20 blur-[120px] rounded-full -z-10" />
        
        <h2 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter text-white mb-6">
          LA VERDADERA <br />
          <span className="text-red-600">CARNE ARGENTINA</span>
        </h2>
        <p className="max-w-2xl text-zinc-400 text-lg md:text-xl font-light leading-relaxed mb-10">
          "Un puente entre la calidad y el disfrute. Sabores con el mismo amor que nos regalaban nuestros abuelos."
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <div className="bg-sky-500 text-black font-black px-6 py-2 rounded-full text-sm uppercase">Envío Sin Cargo</div>
          <div className="bg-white text-black font-black px-6 py-2 rounded-full text-sm uppercase">Cuenta DNI</div>
        </div>
      </section>

      {/* GRILLA DE PRODUCTOS */}
      <section id="productos" className="max-w-7xl mx-auto py-20 px-6">
        <h3 className="text-2xl font-black uppercase mb-12 border-l-4 border-red-600 pl-4">Nuestras Listas</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {productos?.map((p) => (
            <div key={p.id} className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:scale-[1.02] transition-transform">
              <div className="h-64 bg-zinc-800 relative">
                {p.url_imagen && <img src={p.url_imagen} alt={p.titulo} className="w-full h-full object-cover" />}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black p-4">
                   <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded">PREMIUM</span>
                </div>
              </div>
              <div className="p-6">
                <h4 className="text-2xl font-bold uppercase mb-2">{p.titulo}</h4>
                <p className="text-zinc-500 text-sm mb-6 h-10 line-clamp-2">{p.descripcion}</p>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-black">${p.precio_base}</span>
                  <a 
                    href={`https://wa.me/${whatsappNumber}?text=Hola! Quiero pedir: ${p.titulo}`}
                    className="bg-white text-black font-black px-4 py-2 rounded hover:bg-sky-400 transition-colors uppercase text-xs"
                  >
                    Pedir
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER - INFO DE CONTACTO */}
      <footer id="contacto" className="bg-zinc-950 border-t border-zinc-900 py-16 px-6 text-center">
        <p className="text-zinc-500 uppercase tracking-widest text-xs mb-4">¿Contamos con vos?</p>
        <div className="text-4xl md:text-6xl font-black text-red-600 mb-8 tracking-tighter">
          221 354 1722
        </div>
        <p className="text-zinc-600 text-sm italic">"Respetando el esfuerzo ajeno, entendiendo que todo cuesta."</p>
      </footer>

    </div>
  )
}