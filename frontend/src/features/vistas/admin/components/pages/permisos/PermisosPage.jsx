import { useState } from "react"
import { Plus, LockKeyhole, ShieldCheck, CheckCircle2 } from "lucide-react"

import StatCard            from "../shared/StatCard"
import PermisosTable       from "./components/PermisosTable"
import PermisoFormModal    from "./components/PermisoFormModal"
import DeletePermisoModal  from "./components/DeletePermisoModal"

const INITIAL_PERMISOS = [
  { id: 1, permiso: "Crear Usuarios",       descripcion: "Permite registrar nuevos usuarios en el sistema.",    categoria: "Usuarios",   roles: ["Administrador"]                          },
  { id: 2, permiso: "Editar Usuarios",      descripcion: "Permite modificar información de usuarios existentes.", categoria: "Usuarios",  roles: ["Administrador", "Gerente"]               },
  { id: 3, permiso: "Eliminar Usuarios",    descripcion: "Permite eliminar usuarios del sistema.",               categoria: "Usuarios",   roles: ["Administrador"]                          },
  { id: 4, permiso: "Ver Reportes",         descripcion: "Acceso a reportes y estadísticas.",                    categoria: "Reportes",   roles: ["Administrador", "Gerente", "Director"]   },
  { id: 5, permiso: "Registrar Producción", descripcion: "Permite registrar producción diaria.",                 categoria: "Producción", roles: ["Supervisor", "Asistente"]                },
]

const EMPTY_PERMISO = { permiso: "", descripcion: "", categoria: "", roles: [] }

export default function PermisosPage() {
  const [permisos,      setPermisos]      = useState(INITIAL_PERMISOS)
  const [createOpen,    setCreateOpen]    = useState(false)
  const [editTarget,    setEditTarget]    = useState(null)
  const [deleteTarget,  setDeleteTarget]  = useState(null)

  // ── Derived ──────────────────────────────────────────────
  const categoriasUnicas = [...new Set(permisos.map((p) => p.categoria))].length
  const rolesAsociados   = [...new Set(permisos.flatMap((p) => p.roles))].length

  // ── Handlers ─────────────────────────────────────────────
  const handleCreate = (data) => {
    setPermisos((prev) => [...prev, { ...data, id: Date.now() }])
    setCreateOpen(false)
  }

  const handleSave = (updated) => {
    setPermisos((prev) => prev.map((p) => (p.id === updated.id ? updated : p)))
    setEditTarget(null)
  }

  const handleDelete = (id) => {
    setPermisos((prev) => prev.filter((p) => p.id !== id))
    setDeleteTarget(null)
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <LockKeyhole className="w-6 h-6 text-red-900" />
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
              Gestión de Permisos
            </h1>
          </div>
          <p className="text-sm text-gray-500 max-w-2xl">
            Administra los permisos disponibles y controla qué acciones puede realizar cada rol dentro del sistema.
          </p>
        </div>

        <button
          onClick={() => setCreateOpen(true)}
          className="inline-flex items-center justify-center gap-2 bg-red-700/90 hover:bg-red-800 text-white font-medium px-5 py-2.5 rounded-xl transition-all text-sm shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Nuevo Permiso
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Permisos registrados" value={permisos.length}  icon={LockKeyhole}  />
        <StatCard label="Categorías activas"    value={categoriasUnicas} icon={ShieldCheck}  />
        <StatCard label="Roles asociados"       value={rolesAsociados}   icon={CheckCircle2} />
      </div>

      {/* TABLE */}
      <PermisosTable
        permisos={permisos}
        onEdit={setEditTarget}
        onDelete={setDeleteTarget}
      />

      {/* MODALS */}
      {createOpen && (
        <PermisoFormModal
          title="Nuevo permiso"
          initialData={EMPTY_PERMISO}
          onClose={() => setCreateOpen(false)}
          onSave={handleCreate}
          submitLabel="Crear permiso"
          submitClass="bg-red-700 hover:bg-red-800"
        />
      )}

      {editTarget && (
        <PermisoFormModal
          key={editTarget.id}
          title="Editar permiso"
          initialData={editTarget}
          onClose={() => setEditTarget(null)}
          onSave={handleSave}
          submitLabel="Guardar cambios"
          submitClass="bg-amber-600 hover:bg-amber-700"
        />
      )}

      <DeletePermisoModal
        permiso={deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
      />
    </div>
  )
}