import React, {ReactNode} from "react";

export interface MainPageLayoutProps {
    actionButtons?: React.ReactNode[]
    selectedMenuKeys?: string[]
    children?: ReactNode | ReactNode[]
}

export {}