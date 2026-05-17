import { createClient } from '@/utils/supabase/server'
import { crearPedido } from '../actions'

export default async function NuevoPedidoPage() {
  const supabase = await createClient()
  const { data: productos } = await supabase.from('productos').select('id, titulo, precio_base')

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="max-w-2xl mx-auto bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
        <h1 className="text-2xl font-black text-red-600 uppercase mb-6">Registrar Pedido WhatsApp</h1>
        
        <form action={crearPedido} className="space-y-6">
          {/* Datos del Cliente */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-zinc-500 uppercase mb-2">Cliente</label>
              <input name="nombre_cliente" required className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2" placeholder="Nombre completo" />
            </div>
            <div>
              <label className="block text-xs font-bold text-zinc-500 uppercase mb-2">WhatsApp</label>
              <input name="telefono" required className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2" placeholder="221..." />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-500 uppercase mb-2">Dirección de Entrega</label>
            <input name="direccion" required className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2" placeholder="Calle, Nro, Piso..." />
          </div>

          {/* Selección de Producto */}
          <div className="border-t border-zinc-800 pt-6">
            <label className="block text-xs font-bold text-zinc-500 uppercase mb-2">Corte Seleccionado</label>
            <select name="variante_id" className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 mb-4">
              {productos?.map(p => (
                <option key={p.id} value={p.id}>{p.titulo} (${p.precio_base})</option>
              ))}
            </select>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase mb-2">Cantidad (kg/un)</label>
                <input name="cantidad" type="number" required className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2" />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase mb-2">Precio Pactado</label>
                <input name="precio_unitario" type="number" step="0.01" required className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2" />
              </div>
            </div>
          </div>

          <div className="pt-6">
            <label className="block text-xs font-bold text-zinc-500 uppercase mb-2">Método de Pago</label>
            <select name="metodo_pago" className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2">
              <option value="efectivo">Efectivo</option>
              <option value="cuenta_dni">Cuenta DNI</option>
            </select>
          </div>

          <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl transition-all">
            Confirmar y Descontar Stock
          </button>
        </form>
      </div>
    </main>
  )
}