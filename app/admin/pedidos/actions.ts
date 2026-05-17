'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function crearPedido(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // 1. Extraer datos básicos
  const nombre_cliente = formData.get('nombre_cliente') as string
  const telefono = formData.get('telefono') as string
  const direccion = formData.get('direccion') as string
  const metodo_pago = formData.get('metodo_pago') as string
  
  // En un entorno real, esto vendría de un array de items seleccionados
  // Para este MVP, tomamos un producto y una cantidad del form
  const variante_id = formData.get('variante_id') as string
  const cantidad = parseInt(formData.get('cantidad') as string)
  const precio_unitario = parseFloat(formData.get('precio_unitario') as string)

  const total = cantidad * precio_unitario

  // 2. Insertar el Pedido
  const { data: pedido, error: errorPedido } = await supabase
    .from('pedidos')
    .insert({
      nombre_cliente,
      telefono,
      direccion,
      metodo_pago,
      total,
      admin_id: user?.id,
      estado: 'confirmado'
    })
    .select()
    .single()

  if (errorPedido) throw new Error("Error al crear pedido")

  // 3. Insertar la Línea de Pedido
  await supabase.from('lineas_pedido').insert({
    pedido_id: pedido.id,
    variante_id,
    cantidad,
    precio_unitario
  })

  // 4. DESCUENTO DE STOCK (Trazabilidad por eventos)
  // Registramos un movimiento negativo
  await supabase.from('movimientos_inventario').insert({
    variante_id,
    cantidad: -cantidad, // Negativo para descontar
    tipo_movimiento: 'venta',
    admin_id: user?.id
  })

  revalidatePath('/admin')
  redirect('/admin')
}