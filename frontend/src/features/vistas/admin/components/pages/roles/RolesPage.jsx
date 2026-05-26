import { useState } from "react"
import { Plus, ShieldCheck, KeyRound, Users } from "lucide-react"

import StatCard        from "../shared/StatCard"
import RolesTable      from "./components/RolesTable"
import RoleFormModal   from "./components/RoleFormModal"
import DeleteRoleModal from "./components/DeleteRoleModal"

const INITIAL_ROLES = [
  { id: 1, rol: "Administrador", descripcion: "Acceso completo al sistema",       usuarios: 4,  permisos: ["Gestionar usuarios", "Configurar sistema", "Asignar permisos"] },
  { id: 2, rol: "Gerente",       descripcion: "Gestión operativa y reportes",      usuarios: 5,  permisos: ["Ver reportes", "Aprobar solicitudes"]                          },
  { id: 3, rol: "Director",      descripcion: "Supervisión estratégica",           usuarios: 1,  permisos: ["Gestionar equipo", "Tomar decisiones estratégicas"]             },
  { id: 4, rol: "Supervisor",    descripcion: "Control de operaciones",            usuarios: 8,  permisos: ["Registrar producción", "Reportar incidencias"]                 },
  { id: 5, rol: "Asistente",     descripcion: "Apoyo operativo",                   usuarios: 12, permisos: ["Registrar producción"]                                         },
]

const EMPTY_ROLE = { rol: "", descripcion: "", permisos: [], usuarios: 0 }

export default function RolesPage() {
  const [roles,        setRoles]        = useState(INITIAL_ROLES)
  const [createOpen,   setCreateOpen]   = useState(false)
  const [editTarget,   setEditTarget]   = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)

  // ── Derived ──────────────────────────────────────────────
  const permisosUnicos    = [...new Set(roles.flatMap((r) => r.permisos))].length
  const totalUsuarios     = roles.reduce((acc, r) => acc + r.usuarios, 0)

  // ── Handlers ─────────────────────────────────────────────
  const handleCreate = (data) => {
    setRoles((prev) => [...prev, { ...data, id: Date.now() }])
    setCreateOpen(false)
  }

  const handleSave = (updated) => {
    setRoles((prev) => prev.map((r) => (r.id === updated.id ? updated : r)))
    setEditTarget(null)
  }

  const handleDelete = (id) => {
    setRoles((prev) => prev.filter((r) => r.id !== id))
    setDeleteTarget(null)
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck className="w-6 h-6 text-red-900" />
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
              Roles y Permisos
            </h1>
          </div>
          <p className="text-sm text-gray-500 max-w-2xl">
            Administra los accesos, permisos y niveles de autorización dentro del sistema.
          </p>
        </div>

        <button
          onClick={() => setCreateOpen(true)}
          className="inline-flex items-center justify-center gap-2 bg-red-700/90 hover:bg-red-800 text-white font-medium px-5 py-2.5 rounded-xl transition-all text-sm shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Nuevo Rol
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Roles registrados"  value={roles.length}   icon={ShieldCheck} />
        <StatCard label="Permisos activos"    value={permisosUnicos} icon={KeyRound}    />
        <StatCard label="Usuarios asignados"  value={totalUsuarios}  icon={Users}       />
      </div>

      {/* TABLE */}
      <RolesTable
        roles={roles}
        onEdit={setEditTarget}
        onDelete={setDeleteTarget}
      />

      {/* MODALS */}
      {createOpen && (
        <RoleFormModal
          title="Nuevo rol"
          initialData={EMPTY_ROLE}
          onClose={() => setCreateOpen(false)}
          onSave={handleCreate}
          submitLabel="Crear rol"
          submitClass="bg-red-700 hover:bg-red-800"
        />
      )}

      {editTarget && (
        <RoleFormModal
          key={editTarget.id}
          title="Editar rol"
          initialData={editTarget}
          onClose={() => setEditTarget(null)}
          onSave={handleSave}
          submitLabel="Guardar cambios"
          submitClass="bg-amber-600 hover:bg-amber-700"
        />
      )}

      <DeleteRoleModal
        role={deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
      />
    </div>
  )
}