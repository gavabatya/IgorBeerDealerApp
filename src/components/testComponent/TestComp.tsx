import React, { FC } from "react";

interface ShoppingProps {
  count: number;
  itemName: string;
}
interface TestComponentProps {
  age: number;
  name: string;
  shopping: ShoppingProps;
}

export const TestComp: FC<TestComponentProps> = ({age,name,shopping}) => {
  return <div>
    {age}
    {name}
    {shopping.count}
    {shopping.itemName}
  </div>;
};
