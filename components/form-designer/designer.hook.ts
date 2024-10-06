"use client"

import { useContext } from "react"
import { DesignerContext, DesignerContextType } from "./designer.context"
import { FieldValues } from "react-hook-form"

const useDesigner = <T extends FieldValues>() => {
    const context = useContext(DesignerContext) as DesignerContextType<T>

    if(!context){
        throw new Error("useDesigner must be used within DesignerContext")
    }

    return context
}

export default useDesigner