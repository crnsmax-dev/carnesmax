import { createClient } from '@/utils/supabase/server'
import Image from 'next/image'
import Link from 'next/link'

export default async function CatalogoPage() {
  // Inicializamos el cliente de Supabase en el servidor
  const supabase = await createClient()

  // Traemos los productos activos y sus categorías
  const { data: productos, error } = await supabase
    .from('productos')
    .select(`
      id,
      titulo,
      descripcion,
      precio_base,
      url_imagen,
      categorias (nombre)
    `)
    .eq('activo', true)

  if (error) {
    console.error('Error cargando productos:', error)
  }

  // Número de WhatsApp de MAX Carnes Premium
  const telefonoWsp = "5492213541722"

  return (
    <main className="min-h-screen bg-black text-white font-sans selection:bg-red-600 selection:text-white">
      {/* HEADER / HERO SECTION */}
      <header className="border-b border-red-900/50 py-12 px-6 text-center">
        <h1 className="text-5xl md:text-6xl font-black text-red-600 tracking-tighter mb-4 uppercase">
          MAX <br className="md:hidden" />
          <span className="text-white text-3xl md:text-5xl">Carnes Premium</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
          Volver a disfrutar de la verdadera carne argentina. 
          <br />Calidad directa, sin especulaciones.
        </p>
      </header>

      {/* GRILLA DE CATÁLOGO */}
      <section className="max-w-7xl mx-auto py-12 px-6">
        <h2 className="text-2xl font-bold mb-8 border-l-4 border-red-600 pl-4 uppercase">
          Nuestro Catálogo
        </h2>

        {(!productos || productos.length === 0) ? (
          <div className="text-center py-20 bg-zinc-900/50 rounded-xl border border-zinc-800">
            <p className="text-zinc-500">Aún no hay productos cargados en el inventario.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {productos.map((producto) => {
              // Generamos el mensaje predeterminado para WhatsApp
              const mensajeWsp = encodeURIComponent(
                `¡Hola! Me interesa pedir el producto: ${producto.titulo}.`
              )

              return (
                <article 
                  key={producto.id} 
                  className="group bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-red-600/50 transition-all duration-300 flex flex-col"
                >
                  {/* Imagen del Producto */}
                  <div className="relative w-full h-56 bg-zinc-800 overflow-hidden">
                    {producto.url_imagen ? (
                      <Image 
                        src={producto.url_imagen} 
                        alt={producto.titulo}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-zinc-600">
                        <span>Sin imagen</span>
                      </div>
                    )}
                    {/* Badge de Categoría */}
                    {producto.categorias && (
                      <span className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                        {producto.categorias.nombre}
                      </span>
                    )}
                  </div>

                  {/* Info del Producto */}
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold mb-2">{producto.titulo}</h3>
                    <p className="text-zinc-400 text-sm mb-4 line-clamp-2">
                      {producto.descripcion}
                    </p>
                    
                    <div className="mt-auto">
                      <p className="text-2xl font-black text-white mb-4">
                        ${producto.precio_base.toLocaleString('es-AR')}
                      </p>
                      
                      {/* Botón CTA WhatsApp */}
                      <Link 
                        href={`https://wa.me/${telefonoWsp}?text=${mensajeWsp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-bold text-center rounded-xl transition-colors"
                      >
                        Pedir por WhatsApp
                      </Link>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </section>
    </main>
  )
}