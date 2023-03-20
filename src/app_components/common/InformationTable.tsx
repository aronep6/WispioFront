export interface SingleInformationTableRowInterface {
    key: string;
    value: any;
}

const InformationTable = ({ table }: { table: SingleInformationTableRowInterface[] }) => {
    return <table className="w-full font-medium">
        <tbody>
            {table.map((row, index) => {
                return <tr key={index} className="border-b border-gray-200 hover:bg-slate-200">
                    <td className="py-2.5 px-1 text-left text-slate-600 text-sm"> {row.key} </td>
                    <td className="py-2.5 px-1 text-left text-sm"> {row.value} </td>
                </tr>
            })}
        </tbody>
    </table>
};

export default InformationTable;