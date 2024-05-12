import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { Time } from "../../interfaces/time.interface";
import { DndItem } from "../dnd-item/dnd-item";

import "./column.scss";

interface IColumn {
  list: Time[];
}

export const Column = ({ list }: IColumn) => {
  return (
    <div className="column">
      <SortableContext items={list} strategy={verticalListSortingStrategy}>
        {list.map((listItem) => (
          <DndItem key={listItem.id} id={listItem.id} title={listItem.city} />
        ))}
      </SortableContext>
    </div>
  );
};