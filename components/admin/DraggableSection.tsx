'use client';
import { useDrag, useDrop } from 'react-dnd';
import { useRef } from 'react';

export const ITEM_TYPE = 'SECTION';

export default function DraggableSection({
  id,
  index,
  moveSection,
  children,
}: any) {
  const ref = useRef<HTMLDivElement>(null);
  
  const [, drag] = useDrag({
    type: ITEM_TYPE,
    item: { id, index },
  });

  const [, drop] = useDrop({
    accept: ITEM_TYPE,
    hover(item: any) {
      if (item.index !== index) {
        moveSection(item.index, index);
        item.index = index;
      }
    },
  });

  drag(drop(ref));

  return (
    <div ref={ref} className="cursor-move">
      {children}
    </div>
  );
}
