'use client'

import { useState } from 'react'
import { Building2, FileText, MapPin, Package, User, Send, ArrowLeft } from 'lucide-react'

export default function MayoristasPage() {
  const [datos, setDatos] = useState({
    local: '',
    cuit: '',
    direccion: '',
    encargado: '',
    volumen: 'Menos de 50kg'
  })

  const whatsappNumber = "5492213541722"

  const enviarFormulario = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!datos.local || !datos.cuit || !datos.direccion || !datos.encargado) {
      alert("Por favor, completá todos los campos obligatorios.")
      return
    }

    const texto = `🏢 *SOLICITUD DE ALTA COMERCIAL* 🏢\n\n` +
      `¡Hola MAX Carnes! Solicito acceso a la lista de precios mayoristas para mi negocio. Dejo mis datos:\n\n` +
      `*Nombre del Local:* ${datos.local}\n` +
      `*CUIT:* ${datos.cuit}\n` +
      `*Dirección:* ${datos.direccion}\n` +
      `*Responsable:* ${datos.encargado}\n` +
      `*Volumen Semanal Estimado:* ${datos.volumen}\n\n` +
      `Quedo a la espera de la evaluación. ¡Gracias!`

    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(texto)}`, '_blank')
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-red-600 selection:text-white">
      
      {/* BARRA SUPERIOR SIMPLIFICADA */}
      <nav className="border-b border-zinc-800 bg-black/80 backdrop-blur-md sticky top-0 z-50 py-4 px-6">
        <div className="max-w-3xl mx-auto flex justify-between items-center">
          <a href="/" className="text-zinc-400 hover:text-white flex items-center gap-2 text-sm uppercase tracking-widest font-bold transition-colors">
            <ArrowLeft size={16} /> Volver al Inicio
          </a>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border-2 border-red-600 bg-white flex items-center justify-center overflow-hidden">
              <span className="text-black font-black text-[8px]">MAX</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-16">
        
        {/* ENCABEZADO */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">
            Alta <span className="text-red-600">Comercial</span>
          </h1>
          <p className="text-zinc-400 text-lg font-light leading-relaxed max-w-xl mx-auto">
            Completá este formulario para evaluar el perfil de tu negocio. Si cumplís con los requisitos de volumen, te enviaremos nuestra lista de precios y condiciones B2B.
          </p>
        </div>

        {/* FORMULARIO */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 md:p-10 shadow-2xl">
          <form onSubmit={enviarFormulario} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nombre del Local */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                  <Building2 size={14} className="text-sky-400" /> Nombre del Local *
                </label>
                <input 
                  type="text" 
                  required
                  placeholder="Ej: Parrilla El Buen Fuego"
                  value={datos.local}
                  onChange={(e) => setDatos({...datos, local: e.target.value})}
                  className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-3 text-sm focus:border-red-600 outline-none transition-colors"
                />
              </div>

              {/* CUIT */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                  <FileText size={14} className="text-sky-400" /> CUIT del Comercio *
                </label>
                <input 
                  type="text" 
                  required
                  placeholder="Sin guiones"
                  value={datos.cuit}
                  onChange={(e) => setDatos({...datos, cuit: e.target.value})}
                  className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-3 text-sm focus:border-red-600 outline-none transition-colors"
                />
              </div>
            </div>

            {/* Dirección */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                <MapPin size={14} className="text-sky-400" /> Dirección de Entrega *
              </label>
              <input 
                type="text" 
                required
                placeholder="Calle, número, localidad"
                value={datos.direccion}
                onChange={(e) => setDatos({...datos, direccion: e.target.value})}
                className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-3 text-sm focus:border-red-600 outline-none transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Encargado */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                  <User size={14} className="text-sky-400" /> Nombre del Responsable *
                </label>
                <input 
                  type="text" 
                  required
                  placeholder="Tu nombre y apellido"
                  value={datos.encargado}
                  onChange={(e) => setDatos({...datos, encargado: e.target.value})}
                  className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-3 text-sm focus:border-red-600 outline-none transition-colors"
                />
              </div>

              {/* Volumen */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                  <Package size={14} className="text-sky-400" /> Volumen Semanal Estimado *
                </label>
                <select 
                  value={datos.volumen}
                  onChange={(e) => setDatos({...datos, volumen: e.target.value})}
                  className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-3 text-sm focus:border-red-600 outline-none transition-colors text-white"
                >
                  <option value="Menos de 50kg">Menos de 50 kg</option>
                  <option value="50kg a 100kg">Entre 50 y 100 kg</option>
                  <option value="100kg a 200kg">Entre 100 y 200 kg</option>
                  <option value="Más de 200kg">Más de 200 kg</option>
                </select>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-4 rounded-xl transition-colors uppercase tracking-widest flex items-center justify-center gap-2 mt-8 text-sm"
            >
              <Send size={18} /> Enviar Solicitud de Alta
            </button>
          </form>
        </div>
      </main>

    </div>
  )
}