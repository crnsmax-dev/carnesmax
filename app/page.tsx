import { createClient } from '@/utils/supabase/server'
import Image from 'next/image'
import Catalogo from '@/components/Catalogo'

export default async function PublicPage() {
  const supabase = await createClient()
  
  // Traemos los productos activos de la base de datos
  const { data: productos } = await supabase
    .from('productos') 
    .select('*')
    .eq('activo', true)

  const whatsappNumber = "5492213541722"

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-red-600 selection:text-white scroll-smooth">
      
      {/* HEADER CON IDENTIDAD */}
      <nav className="border-b border-zinc-800 bg-black/80 backdrop-blur-md sticky top-0 z-50 py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full border-4 border-sky-400 bg-white flex items-center justify-center overflow-hidden shadow-[0_0_15px_rgba(56,189,248,0.5)]">
              <span className="text-black font-black text-xs">MAX</span>
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tighter leading-none">MAX CARNES</h1>
              <span className="text-[10px] text-sky-400 uppercase font-bold tracking-widest">Premium</span>
            </div>
          </div>
          <div className="hidden md:flex gap-6 text-xs font-bold uppercase tracking-widest text-zinc-400">
            <a href="#historia" className="hover:text-red-600 transition-colors">Nuestra Historia</a>
            <a href="#productos" className="hover:text-red-600 transition-colors">Listas</a>
            <a href="#mayoristas" className="hover:text-red-600 transition-colors">Mayoristas</a>
            <a href="#contacto" className="hover:text-red-600 transition-colors">Contacto</a>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative py-32 px-6 flex flex-col items-center text-center overflow-hidden border-b border-zinc-900">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/20 blur-[120px] rounded-full -z-10" />
        
        <h2 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter text-white mb-6 leading-none">
          VOLVER A <br />
          <span className="text-red-600">DISFRUTAR</span>
        </h2>
        <p className="max-w-2xl text-zinc-400 text-lg md:text-xl font-light leading-relaxed mb-10">
          La verdadera carne argentina, directo a tu mesa. Sin especulaciones, con el valor de la familia.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="#productos" className="bg-red-600 hover:bg-red-700 text-white font-black px-8 py-3 rounded-full text-sm uppercase transition-colors">Ver Cortes</a>
          <a href="#historia" className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white font-bold px-8 py-3 rounded-full text-sm uppercase transition-colors">Conocenos</a>
        </div>
      </section>

      {/* SECCIÓN: CARTA DE PRESENTACIÓN / HISTORIA */}
      <section id="historia" className="py-24 bg-zinc-950 px-6 border-b border-zinc-900">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="space-y-8">
            <div className="inline-block border-l-4 border-sky-400 pl-4">
              <h3 className="text-sm font-bold text-sky-400 uppercase tracking-widest mb-1">Nuestra Esencia</h3>
              <h4 className="text-3xl font-black uppercase tracking-tighter">El puente hacia <span className="text-red-600">el buen fuego</span></h4>
            </div>
            
            <div className="space-y-6 text-zinc-400 font-light leading-relaxed">
              <p>
                <strong className="text-white font-bold">MAX CARNES PREMIUM</strong> es un emprendimiento familiar que nació con un propósito claro: facilitar a todos el acceso directo a productos de calidad a precios reales. <span className="text-red-500 font-medium">Sin especulaciones.</span>
              </p>
              <p>
                Buscamos generar una red de reciprocidad. Nuestro objetivo es ser el puente entre la calidad y el disfrute. Un puente para llegar con lo mejor a ese asado de amigos, ser un puente para que las pibas le metan a ese fuego.
              </p>
              <blockquote className="border-l-2 border-red-600 pl-6 py-2 my-8 text-white italic text-lg bg-zinc-900/50 rounded-r-lg">
               "Que nuestros hijos disfruten los platos que nuestros padres y abuelos nos regalaban, con esos sabores, con el mismo amor."
              </blockquote>
              <p>
                Respetando el esfuerzo ajeno, entendiendo que todo cuesta y que cada momento vale. Sabiendo que merecemos lo mejor, porque producimos lo mejor.
              </p>
            </div>
          </div>

          <div className="relative h-full min-h-[400px] rounded-2xl overflow-hidden border border-zinc-800 group">
            <Image 
              src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1000&auto=format&fit=crop" 
              alt="Fuego y Asado" 
              fill
              className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/60 backdrop-blur-md p-4 rounded-xl border border-zinc-700">
                  <h5 className="text-sky-400 font-black text-sm uppercase mb-1">Envío</h5>
                  <p className="text-xs text-zinc-300">Sin cargo, horario pactado</p>
                </div>
                <div className="bg-black/60 backdrop-blur-md p-4 rounded-xl border border-zinc-700">
                  <h5 className="text-sky-400 font-black text-sm uppercase mb-1">Pagos</h5>
                  <p className="text-xs text-zinc-300">Efectivo / Cuenta DNI</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* GRILLA DE PRODUCTOS - AHORA CON EL CARRITO INTELIGENTE */}
      <section id="productos" className="max-w-7xl mx-auto py-24 px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 border-b border-zinc-800 pb-8">
          <div>
            <h3 className="text-3xl font-black uppercase tracking-tighter mb-2">Nuestras Listas</h3>
            <div className="h-1 w-16 bg-red-600" />
          </div>
          <p className="text-zinc-500 max-w-sm text-right text-sm">
            Elegí tus cortes, armá tu carrito, y envianos un WhatsApp directo para coordinar el envío.
          </p>
        </div>
        
        {/* ACÁ ESTÁ LA MAGIA DEL NUEVO COMPONENTE */}
        <Catalogo productos={productos || []} />

      </section>

      {/* SECCIÓN COMERCIAL / MAYORISTAS */}
      <section id="mayoristas" className="relative py-24 border-t border-zinc-900 overflow-hidden bg-zinc-950">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1603048297172-c92544798d5e?q=80&w=2069&auto=format&fit=crop')] bg-cover bg-center opacity-10 grayscale" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-2xl">
            <div className="inline-block border-l-4 border-red-600 pl-4 mb-6">
              <h3 className="text-sm font-bold text-red-600 uppercase tracking-widest mb-1">División Comercial</h3>
              <h4 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white">
                Proveedor para <span className="text-sky-400">Gastronomía</span>
              </h4>
            </div>
            
            <p className="text-zinc-400 text-lg font-light leading-relaxed mb-8">
              Abastecemos a <strong className="text-white">carnicerías, restaurantes, parrillas y servicios de catering</strong> con mercadería de calidad innegociable. Garantizamos continuidad, volumen y el respeto por el producto que tu negocio necesita para destacarse.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              <div className="flex items-center gap-3 bg-zinc-900/50 p-3 rounded-lg border border-zinc-800">
                <div className="w-2 h-2 bg-red-600 rounded-full shadow-[0_0_8px_rgba(220,38,38,0.8)]" />
                <span className="text-xs font-bold text-zinc-300 uppercase tracking-widest">Atención Personalizada</span>
              </div>
              <div className="flex items-center gap-3 bg-zinc-900/50 p-3 rounded-lg border border-zinc-800">
                <div className="w-2 h-2 bg-red-600 rounded-full shadow-[0_0_8px_rgba(220,38,38,0.8)]" />
                <span className="text-xs font-bold text-zinc-300 uppercase tracking-widest">Lista de Precios Especial</span>
              </div>
            </div>

            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('¡Hola MAX Carnes! Me contacto por compras mayoristas para mi local gastronómico/carnicería. Me gustaría conocer su lista de precios y condiciones.')}`}
              className="inline-flex items-center justify-center bg-white text-black font-black px-8 py-4 rounded-xl hover:bg-sky-400 transition-all duration-300 uppercase text-sm tracking-wider hover:scale-105"
            >
              Contactar a Ventas Mayoristas
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER - INFO DE CONTACTO */}
      <footer id="contacto" className="bg-black border-t border-zinc-900 py-20 px-6 text-center">
        <p className="text-zinc-500 uppercase tracking-widest text-xs mb-6">¿Contamos con vos?</p>
        <div className="text-5xl md:text-7xl font-black text-red-600 mb-8 tracking-tighter">
          221 354 1722
        </div>
        <p className="text-zinc-500 text-sm uppercase tracking-widest font-bold">Raíces Tech © {new Date().getFullYear()}</p>
      </footer>

    </div>
  )
}