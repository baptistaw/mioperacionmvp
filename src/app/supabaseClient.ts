import { createClient } from '@supabase/supabase-js';

// Extraer las variables de entorno
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Verificar que ambas variables estén definidas
if (!supabaseUrl) {
  throw new Error("La variable de entorno NEXT_PUBLIC_SUPABASE_URL no está definida.");
}
if (!supabaseAnonKey) {
  throw new Error("La variable de entorno NEXT_PUBLIC_SUPABASE_ANON_KEY no está definida.");
}

// Crear y exportar el cliente de Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

