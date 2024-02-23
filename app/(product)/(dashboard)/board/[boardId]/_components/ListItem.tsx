"use client";

import { ListWithCards } from "@/lib/types";
import { ListWrapper } from "./ListWrapper";
import { ListHeader } from "./ListHeader";

type ListItemPropType = {
  index: number;
  data: ListWithCards;
};
export const ListItem = ({ data, index }: ListItemPropType) => {
  return (
    <ListWrapper>
      <div className="w-full rounded-md bg-[#f1f2f4] shadow-md pb-2">
        <ListHeader data={data} />
      </div>
    </ListWrapper>
  );
};
