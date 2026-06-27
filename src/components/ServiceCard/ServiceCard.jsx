import { Link } from 'react-router-dom'
import {
  FaHardHat, FaLeaf, FaClipboardCheck, FaFileAlt, FaUserMd,
  FaSearch, FaFire, FaBolt, FaChalkboardTeacher, FaTools,
  FaArrowRight,
} from 'react-icons/fa'

const iconMap = {
  FaHardHat, FaLeaf, FaClipboardCheck, FaFileAlt, FaUserMd,
  FaSearch, FaFire, FaBolt, FaChalkboardTeacher, FaTools,
}

const colorMap = {
  blue:   { bar: 'bg-blue-500',   icon: 'bg-blue-50 text-blue-600',   link: 'text-blue-600' },
  green:  { bar: 'bg-[#4a9e10]',  icon: 'bg-[#e8f5d8] text-[#4a9e10]', link: 'text-[#4a9e10]' },
  indigo: { bar: 'bg-indigo-500', icon: 'bg-indigo-50 text-indigo-600', link: 'text-indigo-600' },
  purple: { bar: 'bg-purple-500', icon: 'bg-purple-50 text-purple-600', link: 'text-purple-600' },
  teal:   { bar: 'bg-teal-500',   icon: 'bg-teal-50 text-teal-600',   link: 'text-teal-600' },
  orange: { bar: 'bg-orange-500', icon: 'bg-orange-50 text-orange-600', link: 'text-orange-600' },
  red:    { bar: 'bg-red-500',    icon: 'bg-red-50 text-red-600',     link: 'text-red-600' },
  yellow: { bar: 'bg-yellow-500', icon: 'bg-yellow-50 text-yellow-600', link: 'text-yellow-600' },
  gray:   { bar: 'bg-gray-400',   icon: 'bg-gray-50 text-gray-600',   link: 'text-gray-600' },
}

export default function ServiceCard({ service }) {
  const Icon = iconMap[service.icon] || FaHardHat
  const c = colorMap[service.color] || colorMap.blue

  return (
    <Link
      to={`/servicos/${service.slug}`}
      className="group flex flex-col bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-gray-200/80 hover:-translate-y-1.5 transition-all duration-300"
    >
      {/* Barra colorida topo */}
      <div className={`h-1 w-full ${c.bar} group-hover:h-1.5 transition-all`} />

      <div className="p-7 flex flex-col flex-1">
        {/* Ícone */}
        <div className={`w-13 h-13 w-12 h-12 rounded-xl ${c.icon} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
          <Icon size={22} />
        </div>

        {/* Título */}
        <h3 className="text-[#071828] font-black text-[1.05rem] mb-3 leading-snug group-hover:text-[#3a7d0a] transition-colors">
          {service.shortTitle}
        </h3>

        {/* Linha decorativa */}
        <div className={`h-0.5 w-8 ${c.bar} rounded mb-4 group-hover:w-12 transition-all duration-300`} />

        {/* Descrição */}
        <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-6">
          {service.summary}
        </p>

        {/* Rodapé do card */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-50">
          <span className={`flex items-center gap-1.5 text-sm font-bold ${c.link} group-hover:gap-3 transition-all`}>
            Saiba mais <FaArrowRight size={11} />
          </span>
        </div>
      </div>
    </Link>
  )
}
