'use client';
import { useDrag, useDrop } from 'react-dnd';

export const ITEM_TYPE = 'SECTION';

export default function DraggableSection({
  id,
  index,
  moveSection,
  children,
}: any) {
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

  return (
    <div ref={(node) => drag(drop(node))} className="cursor-move">
      {children}
    </div>
  );
}
