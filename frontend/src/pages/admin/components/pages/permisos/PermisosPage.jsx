import { useState } from "react"
import { Plus, LockKeyhole, ShieldCheck, CheckCircle2 } from "lucide-react"
import StatCard           from "../shared/StatCard"
import PermisosTable      from "./components/PermisosTable"
import PermisoFormModal   from "./components/PermisoFormModal"
import DeletePermisoModal from "./components/DeletePermisoModal"

const INITIAL_PERMISOS = [
  { id: 1, permiso: "Crear Usuarios",       descripcion: "Permite registrar nuevos usuarios en el sistema.",      categoria: "Usuarios",   roles: ["Administrador"]                        },
  { id: 2, permiso: "Editar Usuarios",      descripcion: "Permite modificar información de usuarios existentes.", categoria: "Usuarios",   roles: ["Administrador", "Gerente"]             },
  { id: 3, permiso: "Eliminar Usuarios",    descripcion: "Permite eliminar usuarios del sistema.",                categoria: "Usuarios",   roles: ["Administrador"]                        },
  { id: 4, permiso: "Ver Reportes",         descripcion: "Acceso a reportes y estadísticas.",                     categoria: "Reportes",   roles: ["Administrador", "Gerente", "Director"] },
  { id: 5, permiso: "Registrar Producción", descripcion: "Permite registrar producción diaria.",                  categoria: "Producción", roles: ["Supervisor", "Asistente"]              },
]

const EMPTY_PERMISO = { permiso: "", descripcion: "", categoria: "", roles: [] }

export default function PermisosPage() {
  const [permisos, setPermisos] = useState(INITIAL_PERMISOS)

  const [isCreateOpen,  setIsCreateOpen]  = useState(false)
  const [isEditOpen,    setIsEditOpen]    = useState(false)
  const [isDeleteOpen,  setIsDeleteOpen]  = useState(false)
  const [editTarget,    setEditTarget]    = useState(null)
  const [deleteTarget,  setDeleteTarget]  = useState(null)

  const categoriasUnicas = [...new Set(permisos.map((p) => p.categoria))].length
  const rolesAsociados   = [...new Set(permisos.flatMap((p) => p.roles))].length

  const openEdit   = (p) => { setEditTarget(p);   setIsEditOpen(true)   }
  const openDelete = (p) => { setDeleteTarget(p); setIsDeleteOpen(true) }

  const handleCreate = (data) => {
    setPermisos((prev) => [...prev, { ...data, id: Date.now() }])
    setIsCreateOpen(false)
  }

  const handleSave = (updated) => {
    setPermisos((prev) => prev.map((p) => (p.id === updated.id ? updated : p)))
    setIsEditOpen(false)
    setTimeout(() => setEditTarget(null), 200)
  }

  const handleDelete = (id) => {
    setPermisos((prev) => prev.filter((p) => p.id !== id))
    setIsDeleteOpen(false)
    setTimeout(() => setDeleteTarget(null), 200)
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <LockKeyhole className="w-6 h-6 text-red-900" />
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Gestión de Permisos</h1>
          </div>
          <p className="text-sm text-gray-500 max-w-2xl">
            Administra los permisos disponibles y controla qué acciones puede realizar cada rol dentro del sistema.
          </p>
        </div>
        <button
          onClick={() => setIsCreateOpen(true)}
          className="inline-flex items-center justify-center gap-2 bg-red-700/90 hover:bg-red-800 text-white font-medium px-5 py-2.5 rounded-xl transition-all text-sm shadow-sm"
        >
          <Plus className="w-4 h-4" /> Nuevo Permiso
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Permisos registrados" value={permisos.length}  icon={LockKeyhole}  />
        <StatCard label="Categorías activas"   value={categoriasUnicas} icon={ShieldCheck}  />
        <StatCard label="Roles asociados"      value={rolesAsociados}   icon={CheckCircle2} />
      </div>

      <PermisosTable permisos={permisos} onEdit={openEdit} onDelete={openDelete} />

      <PermisoFormModal
        isOpen={isCreateOpen}
        title="Nuevo permiso"
        initialData={EMPTY_PERMISO}
        onClose={() => setIsCreateOpen(false)}
        onSave={handleCreate}
        submitLabel="Crear permiso"
        submitClass="bg-red-700 hover:bg-red-800"
      />

      <PermisoFormModal
        isOpen={isEditOpen}
        title="Editar permiso"
        initialData={editTarget ?? EMPTY_PERMISO}
        onClose={() => setIsEditOpen(false)}
        onSave={handleSave}
        submitLabel="Guardar cambios"
        submitClass="bg-amber-600 hover:bg-amber-700"
      />

      <DeletePermisoModal
        isOpen={isDeleteOpen}
        permiso={deleteTarget}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  )
}