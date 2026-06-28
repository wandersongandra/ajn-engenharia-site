import { FaChevronRight } from 'react-icons/fa'

/**
 * Table of Contents – renders a list of h2 headings found in the post content.
 * Each heading gets an auto‑generated id (`toc-{index}`) that the article
 * component also uses, enabling smooth scrolling with `scroll-behavior: smooth`.
 */
export default function TableOfContents({ content }) {
  // Ensure headings have ids – the article component will create the same ids.
  // No state needed; we only render the list.

  return (
    <nav className="sticky top-24 self-start max-w-xs ml-4 hidden lg:block">
      <h3 className="text-sm font-semibold text-[#2d6208] mb-3">Sumário</h3>
      <ul className="space-y-2 text-sm text-gray-600">
        {content.map((block, i) => {
          if (block.type !== 'h2') return null
          const id = `toc-${i}`
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                className="flex items-center gap-1 text-gray-600 hover:text-[#3a7d0a] transition-colors"
              >
                <FaChevronRight size={10} className="flex-shrink-0" />
                <span>{block.text}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
