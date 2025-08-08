/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useRef, useEffect } from 'react';

interface Owner {
  _id: string;
  email: string;
}

interface Props {
  owners: Owner[];
  onSelect: (id: string) => void;
}

const CustomSearchDropdown = ({ owners, onSelect }: Props) => {
  const [query, setQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [selected, setSelected] = useState<Owner | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredOwners = owners.filter((owner) =>
    owner.email.toLowerCase().includes(query.toLowerCase())
  );

  // close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (owner: Owner) => {
    setSelected(owner);
    setQuery(owner.email);
    setShowDropdown(false);
    onSelect(owner._id);
  };

  return (
    <div className="relative w-full mb-5" ref={dropdownRef}>
      <label className="block font-semibold text-gray-700 mb-1">Owner*</label>
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setShowDropdown(true);
        }}
        placeholder="Search Owner by email"
        className="w-full border border-gray-300 rounded-md p-2"
      />

      {showDropdown && (
        <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-auto shadow-md">
          {filteredOwners.length > 0 ? (
            filteredOwners.map((owner) => (
              <div
                key={owner._id}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelect(owner)}
              >
                {owner.email}
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-gray-500">No owners found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomSearchDropdown;
