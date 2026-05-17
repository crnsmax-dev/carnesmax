'use client'
import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Upload, Loader2, CheckCircle2 } from 'lucide-react'

export default function ImageUpload({ onUpload }: { onUpload: (url: string) => void }) {
  const [uploading, setUploading] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success'>('idle')
  const supabase = createClient()

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true)
      const file = event.target.files?.[0]
      if (!file) return

      // Generamos un nombre único para que no se pisen las fotos
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${fileName}`

      // Subimos al bucket de Supabase que creamos antes
      const { error: uploadError } = await supabase.storage
        .from('imagenes-productos')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      // Obtenemos la URL pública para guardarla en la tabla de productos
      const { data } = supabase.storage
        .from('imagenes-productos')
        .getPublicUrl(filePath)

      onUpload(data.publicUrl)
      setStatus('success')
    } catch (error) {
      alert('Error al subir la imagen. Revisá si el Bucket en Supabase es Público.')
      console.error(error)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className={`flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-8 transition-all ${
      status === 'success' ? 'border-green-500 bg-green-500/10' : 'border-zinc-700 bg-zinc-900/50 hover:border-red-600'
    }`}>
      {uploading ? (
        <div className="flex flex-col items-center">
          <Loader2 className="animate-spin text-red-600 mb-2" size={32} />
          <span className="text-xs font-bold text-zinc-400 uppercase italic">Subiendo corte...</span>
        </div>
      ) : status === 'success' ? (
        <div className="flex flex-col items-center">
          <CheckCircle2 className="text-green-500 mb-2" size={32} />
          <span className="text-xs font-bold text-green-500 uppercase">¡Imagen lista!</span>
        </div>
      ) : (
        <label className="cursor-pointer flex flex-col items-center">
          <Upload className="text-zinc-500 mb-2" size={32} />
          <span className="text-xs font-bold uppercase text-zinc-400 tracking-tighter">Seleccionar Foto Real</span>
          <input 
            type="file" 
            className="hidden" 
            onChange={handleUpload} 
            disabled={uploading} 
            accept="image/*" 
          />
        </label>
      )}
    </div>
  )
}