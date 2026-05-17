'use client'
import { useState } from 'react'
import ImageUpload from '@/components/ImageUpload'
import { crearProducto } from './actions'
import { ChevronLeft, Save } from 'lucide-react'
import Link from 'next/link'

export default function NuevoProductoPage() {
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [isPending, setIsPending] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!imageUrl) return alert("Por favor, subí una foto del producto")
    
    setIsPending(true)
    const formData = new FormData(e.currentTarget)
    await crearProducto(formData, imageUrl)
    setIsPending(false)
  }

  return (
    <main className="min-h-screen bg-black text-white p-6 md:p-12">
      <div className="max-w-2xl mx-auto">
        
        <Link href="/admin" className="flex items-center text-zinc-500 hover:text-red-600 transition-colors mb-8 group">
          <ChevronLeft size={20} />
          <span className="text-sm font-bold uppercase tracking-widest">Volver al Panel</span>
        </Link>

        <h1 className="text-4xl font-black uppercase italic tracking-tighter mb-8">
          Cargar <span className="text-red-600">Nuevo Corte</span>
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8 bg-zinc-900 border border-zinc-800 p-8 rounded-3xl">
          
          {/* Subida de Imagen */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-zinc-500">Imagen del Producto</label>
            {imageUrl ? (
              <div className="relative h-64 w-full rounded-xl overflow-hidden border border-zinc-700">
                <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                <button 
                  onClick={() => setImageUrl(null)}
                  className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full text-xs font-bold"
                >
                  Cambiar
                </button>
              </div>
            ) : (
              <ImageUpload onUpload={(url) => setImageUrl(url)} />
            )}
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="text-xs font-bold uppercase text-zinc-500 block mb-2">Nombre del Corte</label>
              <input 
                name="titulo" 
                required 
                placeholder="Ej: Vacío de Novillito"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 focus:border-red-600 outline-none transition-colors"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold uppercase text-zinc-500 block mb-2">Precio por kg/u</label>
                <input 
                  name="precio_base" 
                  type="number" 
                  step="0.01" 
                  required 
                  placeholder="0.00"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 focus:border-red-600 outline-none transition-colors"
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase text-zinc-500 block mb-2">Categoría (ID)</label>
                <input 
                  name="categoria_id" 
                  required 
                  placeholder="ID de categoría"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 focus:border-red-600 outline-none transition-colors"
                />
                <p className="text-[10px] text-zinc-600 mt-1">Usá el ID que creamos por SQL (1111...)</p>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase text-zinc-500 block mb-2">Descripción / Detalle</label>
              <textarea 
                name="descripcion" 
                rows={3}
                placeholder="Contale al cliente por qué este corte es premium..."
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 focus:border-red-600 outline-none transition-colors"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isPending}
            className="w-full bg-red-600 hover:bg-red-700 disabled:bg-zinc-800 text-white font-black py-4 rounded-xl transition-all flex items-center justify-center gap-2 uppercase tracking-widest"
          >
            {isPending ? "Guardando..." : <><Save size={18} /> Publicar Producto</>}
          </button>

        </form>
      </div>
    </main>
  )
}
