export default function SectionTitle({ tag, title, subtitle, light = false, center = true }) {
  return (
    <div className={`mb-14 ${center ? 'text-center' : ''}`}>
      {tag && (
        <span className={`inline-block text-xs font-bold uppercase tracking-widest mb-4 px-4 py-2 rounded-full border ${
          light
            ? 'text-[#5cbf1a] bg-[#5cbf1a]/10 border-[#5cbf1a]/20'
            : 'text-[#3a7d0a] bg-green-50 border-green-200'
        }`}>
          {tag}
        </span>
      )}
      <h2 className={`text-2xl sm:text-3xl md:text-4xl font-black mb-4 leading-tight ${light ? 'text-white' : 'text-[#2d6208]'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-lg max-w-2xl leading-relaxed ${center ? 'mx-auto' : ''} ${light ? 'text-white/55' : 'text-gray-500'}`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
