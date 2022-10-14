import React, {ReactNode} from "react";
import {ItemType} from "antd/es/menu/hooks/useItems";

export interface MainPageLayoutProps {
    actionButtons?: React.ReactNode[]
    menuItems?: ItemType[]
    selectedMenuKeys?: string[]
    children?: ReactNode | ReactNode[]
}