'use client';

import { useState, useMemo } from 'react';
import * as LucideIcons from 'lucide-react';

export default function IconPicker({ value, onChange }: { value: string, onChange: (val: string) => void }) {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');

    const iconList = useMemo(() => {
        return Object.keys(LucideIcons)
            .filter(key => {
                // Filter out non-component exports (like createLucideIcon function, etc.)
                // Lucide icons are functional components.
                // We also filter out any numeric keys just in case.
                const item = (LucideIcons as any)[key];
                return isNaN(Number(key)) && typeof item === 'object' && !!item?.render;
                // Lucide React icons are ForwardRef exotic components, so they are objects with a render function.
                // Or standard functions. Let's start with basic check.
                // Actually, lucide-react exports are ForwardRef components.
            });
        // Better safety check: checking if it looks like a component.
        // Actually, simplest is just filtering for uppercase start (convention) and excluding known non-icons.
        // But 'createLucideIcon' is lowercase.
        // Let's rely on keys starting with uppercase.
    }, []);

    // Improved filter:
    const safeIconList = useMemo(() => {
        return Object.keys(LucideIcons).filter(key =>
            key !== 'icons' &&
            key !== 'createLucideIcon' &&
            key !== 'default' &&
            isNaN(Number(key)) &&
            /^[A-Z]/.test(key) // React components usually start with Uppercase
        );
    }, []);


    const filteredIcons = useMemo(() => {
        return safeIconList.filter(name => name.toLowerCase().includes(search.toLowerCase()));
    }, [safeIconList, search]);

    const handleSelect = (icon: string) => {
        onChange(icon);
        setIsOpen(false);
    };

    // Dynamically render the selected icon
    const SelectedIcon = (LucideIcons as any)[value] || LucideIcons.HelpCircle;

    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-3 bg-[#070a13] border border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500 hover:bg-white/5 transition-all text-gray-200"
            >
                <div className="flex items-center gap-3">
                    <SelectedIcon className="w-5 h-5 text-blue-400" />
                    <span>{value || 'Select an icon'}</span>
                </div>
                <LucideIcons.ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 w-full mt-2 z-50 bg-[#0b1021] border border-white/10 rounded-lg shadow-2xl max-h-80 overflow-hidden flex flex-col">
                    <div className="p-3 border-b border-white/10 sticky top-0 bg-[#0b1021]">
                        <div className="relative">
                            <LucideIcons.Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search icons..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-9 pr-3 py-2 bg-[#000000]/50 border border-white/10 rounded text-sm text-gray-200 focus:border-blue-500 outline-none"
                                autoFocus
                            />
                        </div>
                    </div>

                    <div className="overflow-y-auto flex-1 p-2 grid grid-cols-4 gap-2">
                        {filteredIcons.slice(0, 100).map(iconName => {
                            const Icon = (LucideIcons as any)[iconName];
                            if (!Icon) return null;

                            return (
                                <button
                                    key={iconName}
                                    type="button"
                                    onClick={() => handleSelect(iconName)}
                                    className={`flex flex-col items-center justify-center p-3 rounded hover:bg-white/10 transition-colors gap-2 ${value === iconName ? 'bg-blue-500/20 text-blue-400' : 'text-gray-400'}`}
                                    title={iconName}
                                >
                                    <Icon className="w-6 h-6" />
                                    <span className="text-[10px] truncate w-full text-center">{iconName}</span>
                                </button>
                            );
                        })}
                        {filteredIcons.length > 100 && (
                            <div className="col-span-4 p-2 text-center text-gray-500 text-xs">
                                + {filteredIcons.length - 100} more (refine search)
                            </div>
                        )}
                        {filteredIcons.length === 0 && (
                            <div className="col-span-4 p-4 text-center text-gray-500">
                                No icons found
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
