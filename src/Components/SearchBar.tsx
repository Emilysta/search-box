import { useState } from "react"
export type SearchBarProps = {
    data: any[],
    filterFunction: (object: any) => string,
    filtersChanged?: (data: any[]) => void,
}

export default function SearchBar(props: SearchBarProps) {
    const [convertedData, setConvertedData] = useState<any[]>();
    const [filters, setFilters] = useState<any[]>();
    return (
        <div>SearchBar</div>
    )
}
