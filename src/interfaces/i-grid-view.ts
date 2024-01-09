import { Cell } from "../logic/entities/cell";

export interface IGridView {
    show(cell: Cell): void;
    help(cell: Cell, hint: string): void;
} 

