export interface MenuItem {
    id: number;
    name: string;
    value: string;
    level: number;
    children?: MenuItem;
}
export declare const defaultMenu: MenuItem[];
