'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ShoppingCart, Plus, Minus, X, MessageSquare } from 'lucide-react'

// Definimos la forma de los datos
type Producto = {
  id: string
  titulo: string
  descripcion: string
  precio_base: number
  url_imagen: string
}

type ItemCarrito = Producto & { cantidad: number }

export default function Catalogo({ productos }: { productos: Producto[] }) {
  const [carrito, setCarrito] = useState<ItemCarrito[]>([])
  const [mostrarCarrito, setMostrarCarrito] = useState(false)
  const [nombre, setNombre] = useState('')
  const [direccion, setDireccion] = useState('')

  const whatsappNumber = "5492213541722"

  // Función para sumar productos
  const agregarAlCarrito = (producto: Producto) => {
    setCarrito(prev => {
      const existe = prev.find(item => item.id === producto.id)
      if (existe) {
        return prev.map(item => 
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        )
      }
      return [...prev, { ...producto, cantidad: 1 }]
    })
  }

  // Función para restar productos
  const restarDelCarrito = (id: string) => {
    setCarrito(prev => 
      prev.map(item => 
        item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item
      ).filter(item => item.cantidad > 0)
    )
  }

  // Cálculos automáticos
  const total = carrito.reduce((acc, item) => acc + (item.precio_base * item.cantidad), 0)
  const cantidadTotal = carrito.reduce((acc, item) => acc + item.cantidad, 0)

  // Enviar mensaje estructurado
  const enviarPedido = () => {
    if (!nombre || !direccion) {
      alert("Por favor, completá tu nombre y dirección para armar el envío.")
      return
    }

    let texto = `¡Hola MAX Carnes! Te paso mi pedido:\n\n`
    carrito.forEach(item => {
      texto += `🥩 ${item.cantidad}x ${item.titulo} ($${item.precio_base * item.cantidad})\n`
    })
    texto += `\n💰 *TOTAL ESTIMADO: $${total}*\n\n`
    texto += `👤 Nombre: ${nombre}\n`
    texto += `📍 Dirección: ${direccion}\n`
    texto += `\n¡Aguardo confirmación, gracias!`

    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(texto)}`, '_blank')
  }

  return (
    <>
      {/* 1. LA GRILLA DE PRODUCTOS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {productos?.map((p) => (
          <div key={p.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-red-600/50 transition-colors flex flex-col group">
            <div className="h-64 relative bg-zinc-800 overflow-hidden">
              <Image 
                src={p.url_imagen || '/placeholder-meat.jpg'} 
                alt={p.titulo} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-zinc-700">
                  <span className="text-sky-400 text-[10px] font-black uppercase tracking-widest">Premium</span>
              </div>
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <h4 className="text-2xl font-black uppercase mb-2 tracking-tighter">{p.titulo}</h4>
              <p className="text-zinc-400 text-sm mb-6 flex-grow italic line-clamp-3">"{p.descripcion}"</p>
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-zinc-800">
                <span className="text-3xl font-black text-white">${p.precio_base}</span>
                <button 
                  onClick={() => agregarAlCarrito(p)}
                  className="bg-white text-black font-black px-6 py-3 rounded-xl hover:bg-red-600 hover:text-white transition-colors uppercase text-xs tracking-wider flex items-center gap-2"
                >
                  <Plus size={16} /> Agregar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 2. BOTÓN FLOTANTE DEL CARRITO (Solo aparece si hay productos) */}
      {cantidadTotal > 0 && (
        <button 
          onClick={() => setMostrarCarrito(true)}
          className="fixed bottom-8 right-8 bg-red-600 text-white p-4 rounded-full shadow-[0_0_20px_rgba(220,38,38,0.5)] hover:scale-110 transition-transform z-40 flex items-center gap-3"
        >
          <ShoppingCart size={24} />
          <div className="flex flex-col text-left">
            <span className="text-[10px] uppercase font-black tracking-widest leading-none mb-1">{cantidadTotal} Cortes</span>
            <span className="text-sm font-bold leading-none">${total}</span>
          </div>
        </button>
      )}

      {/* 3. PANEL LATERAL (DRAWER) DEL CARRITO */}
      {mostrarCarrito && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-zinc-950 h-full border-l border-zinc-800 flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
            
            <div className="p-6 border-b border-zinc-800 flex justify-between items-center bg-zinc-900">
              <h3 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-2">
                <ShoppingCart className="text-red-600" /> Tu Pedido
              </h3>
              <button onClick={() => setMostrarCarrito(false)} className="text-zinc-500 hover:text-white">
                <X size={24} />
              </button>
            </div>

            <div className="p-6 flex-grow overflow-y-auto space-y-4">
              {carrito.map(item => (
                <div key={item.id} className="flex justify-between items-center bg-zinc-900 p-4 rounded-xl border border-zinc-800">
                  <div>
                    <h4 className="font-bold uppercase text-sm">{item.titulo}</h4>
                    <span className="text-zinc-500 text-xs">${item.precio_base} x kg/u</span>
                  </div>
                  <div className="flex items-center gap-3 bg-black rounded-lg border border-zinc-800 p-1">
                    <button onClick={() => restarDelCarrito(item.id)} className="p-1 text-zinc-400 hover:text-red-600"><Minus size={16} /></button>
                    <span className="font-black w-4 text-center">{item.cantidad}</span>
                    <button onClick={() => agregarAlCarrito(item)} className="p-1 text-zinc-400 hover:text-green-500"><Plus size={16} /></button>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 bg-zinc-900 border-t border-zinc-800">
              <div className="flex justify-between items-end mb-6">
                <span className="text-zinc-400 uppercase text-xs font-bold tracking-widest">Total Estimado</span>
                <span className="text-4xl font-black text-white">${total}</span>
              </div>
              
              <div className="space-y-4 mb-6">
                <input 
                  type="text" 
                  placeholder="Tu Nombre Completo" 
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-3 text-sm focus:border-red-600 outline-none"
                />
                <input 
                  type="text" 
                  placeholder="Dirección Exacta de Envío" 
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                  className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-3 text-sm focus:border-red-600 outline-none"
                />
              </div>

              <button 
                onClick={enviarPedido}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-black py-4 rounded-xl transition-colors uppercase tracking-widest flex items-center justify-center gap-2 text-sm"
              >
                <MessageSquare size={18} /> Enviar Pedido a WhatsApp
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  )
}