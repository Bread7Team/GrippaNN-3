import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Folder, FolderOpen } from 'lucide-react';

interface TreeItem {
  id: number;
  name: string;
  children?: TreeItem[];
}

interface TreeViewProps {
  data: TreeItem[];
  onSelect?: (item: TreeItem) => void;
}

const TreeNode = ({ item, onSelect }: { item: TreeItem, onSelect?: (item: TreeItem) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  return (
    <div className="ml-4">
      <div 
        className="flex items-center gap-2 py-1 px-2 hover:bg-gray-100 rounded-md cursor-pointer transition-colors"
        onClick={() => {
          setIsOpen(!isOpen);
          if (onSelect) onSelect(item);
        }}
      >
        {hasChildren ? (
          isOpen ? <ChevronDown className="w-4 h-4 text-gray-500" /> : <ChevronRight className="w-4 h-4 text-gray-500" />
        ) : (
          <div className="w-4" />
        )}
        {isOpen ? <FolderOpen className="w-4 h-4 text-blue-500" /> : <Folder className="w-4 h-4 text-blue-500" />}
        <span className="text-sm text-gray-700">{item.name}</span>
      </div>
      
      {isOpen && hasChildren && (
        <div className="border-l border-gray-200 ml-2">
          {item.children!.map((child) => (
            <TreeNode key={child.id} item={child} onSelect={onSelect} />
          ))}
        </div>
      )}
    </div>
  );
};

export default function TreeView({ data, onSelect }: TreeViewProps) {
  return (
    <div className="py-2">
      {data.map((item) => (
        <TreeNode key={item.id} item={item} onSelect={onSelect} />
      ))}
    </div>
  );
}
