import React from 'react';

interface Props {
  children: React.ReactNode
}

function CardListItem({children}: Props) {
  return (
    <div className="mb-2">
      {children}
    </div>
  );
}

export default CardListItem;