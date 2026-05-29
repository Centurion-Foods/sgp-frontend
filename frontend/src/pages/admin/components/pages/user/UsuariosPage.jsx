import { useState } from "react"
import { Plus, Users, UserCheck, ShieldCheck } from "lucide-react"
import StatCard from "../shared/StatCard"
import UserSearch from "./components/UserSearch"
import UserTable from "./components/UserTable"
import CreateUserModal from "./components/CreateUserModal"
import EditUserModal from "./components/EditUserModal"
import DeleteUserModal from "./components/DeleteUserModal"

const INITIAL_USUARIOS = [
  { id: 1, nombre: "Jhoan Quintero", email: "jhoan.quintero@centurionfoods.com", rol: "Administrador", estado: "Activo" },
  { id: 2, nombre: "Gerente", email: "gerente@centurionfoods.com", rol: "Gerencia", estado: "Activo" },
  { id: 3, nombre: "director", email: "director@centurionfoods.com", rol: "Director", estado: "Inactivo" },
]

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState(INITIAL_USUARIOS)
  const [searchTerm, setSearchTerm] = useState("")

  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [editTarget, setEditTarget] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)

  const usuariosFiltrados = usuarios.filter(u =>
    u.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  )
  const rolesUnicos = [...new Set(usuarios.map(u => u.rol))].length

  const handleCreate = (data) => {
    setUsuarios(prev => [...prev, { ...data, id: Date.now() }])
    setIsCreateOpen(false)
  }

  const handleSave = (updated) => {
    setUsuarios(prev => prev.map(u => u.id === updated.id ? updated : u))
    setIsEditOpen(false)
    setTimeout(() => setEditTarget(null), 200)
  }

  const handleDelete = (id) => {
    setUsuarios(prev => prev.filter(u => u.id !== id))
    setIsDeleteOpen(false)
    setTimeout(() => setDeleteTarget(null), 200)
  }

  const openEdit = (u) => { setEditTarget(u); setIsEditOpen(true) }
  const openDelete = (u) => { setDeleteTarget(u); setIsDeleteOpen(true) }

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-6 h-6 text-red-900" />
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Gestión de Usuarios</h1>
          </div>
          <p className="text-sm text-gray-500 max-w-2xl">
            Administra los accesos, estados y roles del personal dentro del sistema.
          </p>
        </div>
        <button
          onClick={() => setIsCreateOpen(true)}
          className="inline-flex items-center justify-center gap-2 bg-red-700/90 hover:bg-red-800 text-white font-medium px-5 py-2.5 rounded-xl transition-all text-sm shadow-sm"
        >
          <Plus className="w-4 h-4" /> Nuevo Usuario
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Usuarios registrados" value={usuarios.length} icon={Users} />
        <StatCard label="Usuarios activos" value={usuarios.filter(u => u.estado === "Activo").length} icon={UserCheck} />
        <StatCard label="Roles asignados" value={rolesUnicos} icon={ShieldCheck} />
      </div>

      <UserSearch value={searchTerm} onChange={setSearchTerm} />
      <UserTable usuarios={usuariosFiltrados} onEdit={openEdit} onDelete={openDelete} />

      <CreateUserModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSave={handleCreate}
      />
      <EditUserModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSave={handleSave}
        usuario={editTarget}
      />
      <DeleteUserModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDelete}
        usuario={deleteTarget}
      />
    </div>
  )
}