import SidebarItem from './sidebar-item';

export default function SidebarSection({ section, collapsed, mobileMenuOpen, isMobile }) {
  return (
    <div className="mb-6">
      {section.title && (
        <h3 
          className={`
            px-4 mb-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider
            transition-opacity duration-200 ${collapsed && !mobileMenuOpen && !isMobile ? 'opacity-0' : 'opacity-100'}
          `}
        >
          {section.title}
        </h3>
      )}
      <ul>
        {section.items.map((item) => (
          <SidebarItem 
            key={item.name} 
            item={item} 
            collapsed={collapsed}
            mobileMenuOpen={mobileMenuOpen}
            isMobile={isMobile}
          />
        ))}
      </ul>
    </div>
  );
}