'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function crearProducto(formData: FormData, imageUrl: string) {
  const supabase = await createClient()

  const titulo = formData.get('titulo') as string
  const descripcion = formData.get('descripcion') as string
  const precio_base = parseFloat(formData.get('precio_base') as string)
  const categoria_id = formData.get('categoria_id') as string

  const { error } = await supabase
    .from('productos')
    .insert({
      titulo,
      descripcion,
      precio_base,
      categoria_id,
      url_imagen: imageUrl, // Aquí guardamos la URL que nos da el Storage
      activo: true
    })

  if (error) {
    console.error("Error al crear producto:", error)
    return { error: "No se pudo crear el producto" }
  }

  // Refrescamos las páginas para que aparezca el nuevo producto
  revalidatePath('/')
  revalidatePath('/admin')
  redirect('/admin')
}