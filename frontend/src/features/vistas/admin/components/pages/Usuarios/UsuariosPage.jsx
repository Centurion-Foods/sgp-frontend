import { useState } from "react"
import { Plus, Users, UserCheck, ShieldCheck } from "lucide-react"

import StatCard        from "../shared/StatCard"
import UserSearch      from "./components/UserSearch"
import UserTable       from "./components/UserTable"
import CreateUserModal from "./components/CreateUserModal"
import EditUserModal   from "./components/EditUserModal"
import DeleteUserModal from "./components/DeleteUserModal"

const INITIAL_USUARIOS = [
  { id: 1, nombre: "Jhoan Quintero", email: "jhoan.quintero@centurionfoods.com", rol: "Administrador",  estado: "Activo"   },
  { id: 2, nombre: "Silvana Osorio", email: "silvana.osorio@centurionfoods.com", rol: "Gerencia",       estado: "Activo"   },
  { id: 3, nombre: "Jaime Alcalá",   email: "jaime.alcala@centurionfoods.com",   rol: "Director",       estado: "Inactivo" },
]

export default function UsuariosPage() {
  const [usuarios,      setUsuarios]      = useState(INITIAL_USUARIOS)
  const [searchTerm,    setSearchTerm]    = useState("")
  const [createOpen,    setCreateOpen]    = useState(false)
  const [editTarget,    setEditTarget]    = useState(null)
  const [deleteTarget,  setDeleteTarget]  = useState(null)

  // ── Derived ──────────────────────────────────────────────
  const usuariosFiltrados = usuarios.filter(
    (u) =>
      u.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const rolesUnicos = [...new Set(usuarios.map((u) => u.rol))].length

  // ── Handlers ─────────────────────────────────────────────
  const handleCreate = (data) => {
    const nuevo = { ...data, id: Date.now() }
    setUsuarios((prev) => [...prev, nuevo])
    setCreateOpen(false)
  }

  const handleSave = (updated) => {
    setUsuarios((prev) => prev.map((u) => (u.id === updated.id ? updated : u)))
    setEditTarget(null)
  }

  const handleDelete = (id) => {
    setUsuarios((prev) => prev.filter((u) => u.id !== id))
    setDeleteTarget(null)
  }

  // ── Render ────────────────────────────────────────────────
  return (
    <div className="space-y-6 animate-fade-in">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-6 h-6 text-red-900" />
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
              Gestión de Usuarios
            </h1>
          </div>
          <p className="text-sm text-gray-500 max-w-2xl">
            Administra los accesos, estados y roles del personal dentro del sistema.
          </p>
        </div>

        <button
          onClick={() => setCreateOpen(true)}
          className="inline-flex items-center justify-center gap-2 bg-red-700/90 hover:bg-red-800 text-white font-medium px-5 py-2.5 rounded-xl transition-all text-sm shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Nuevo Usuario
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Usuarios registrados" value={usuarios.length}                                       icon={Users}       />
        <StatCard label="Usuarios activos"     value={usuarios.filter((u) => u.estado === "Activo").length} icon={UserCheck}   />
        <StatCard label="Roles asignados"      value={rolesUnicos}                                          icon={ShieldCheck} />
      </div>

      {/* SEARCH */}
      <UserSearch value={searchTerm} onChange={setSearchTerm} />

      {/* TABLE */}
      <UserTable
        usuarios={usuariosFiltrados}
        onEdit={setEditTarget}
        onDelete={setDeleteTarget}
      />

      {/* MODALS */}
      <CreateUserModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onSave={handleCreate}
      />

      <EditUserModal
        key={editTarget?.id}
        usuario={editTarget}
        onClose={() => setEditTarget(null)}
        onSave={handleSave}
      />

      <DeleteUserModal
        usuario={deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
      />
    </div>
  )
}