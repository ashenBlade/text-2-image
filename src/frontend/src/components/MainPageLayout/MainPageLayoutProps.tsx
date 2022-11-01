import React, {ReactNode} from "react";
import MenuElement from "./MenuElement";

export interface MainPageLayoutProps {
    buttons?: {
        name: string
        onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
        variant?: "text" | "outlined" | "contained"
        color: "secondary" | "success" | "inherit" | "warning" | "error" | "primary" | "info"
        disabled?: boolean
    }[]
    menuElements?: MenuElement[]
    children?: ReactNode | ReactNode[]
    error?: string
}

export {}