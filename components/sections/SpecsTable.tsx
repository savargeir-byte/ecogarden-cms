export default function SpecsTable({ data }: any) {
  if (!Array.isArray(data)) return null;

  return (
    <section className="bg-white" aria-label="Product specifications">
      <div className="container">
        <div className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
          <table className="w-full">
            <tbody className="divide-y divide-gray-200">
              {data.map((item: any, i: number) => (
                <tr key={i} className="hover:bg-gray-100 transition">
                  <th 
                    scope="row" 
                    className="px-6 py-4 text-left font-semibold text-gray-900 w-1/2"
                  >
                    {item.label}
                  </th>
                  <td className="px-6 py-4 text-gray-700">
                    {item.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
