'use client';
import AdminLayout from '@/components/admin/AdminLayout';
import { getProductAnalytics } from '@/lib/analytics';
import { useEffect, useState } from 'react';

export default function AnalyticsPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  async function loadAnalytics() {
    const analytics = await getProductAnalytics();
    setData(analytics);
    setLoading(false);
  }

  // Group by product_id and count
  const productViews = data.reduce((acc: any, item) => {
    if (!acc[item.product_id]) {
      acc[item.product_id] = 0;
    }
    acc[item.product_id]++;
    return acc;
  }, {});

  if (loading) {
    return (
      <AdminLayout>
        <div className="p-6">Loading...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-6 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Product Analytics</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="text-sm text-gray-500">Total Events</div>
            <div className="text-3xl font-bold mt-2">{data.length}</div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="text-sm text-gray-500">Unique Products</div>
            <div className="text-3xl font-bold mt-2">{Object.keys(productViews).length}</div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="text-sm text-gray-500">Avg Views/Product</div>
            <div className="text-3xl font-bold mt-2">
              {Object.keys(productViews).length > 0 
                ? Math.round(data.length / Object.keys(productViews).length)
                : 0}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Product Views</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {Object.entries(productViews).map(([productId, count]: any) => (
                <div key={productId} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-medium">Product ID: {productId}</div>
                    <div className="text-sm text-gray-500">{count} views</div>
                  </div>
                  <div className="text-2xl font-bold text-green-600">{count}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Recent Events</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Product ID</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Event</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {data.slice(0, 20).map((item, i) => (
                  <tr key={i}>
                    <td className="px-6 py-4 text-sm">{item.product_id}</td>
                    <td className="px-6 py-4 text-sm">{item.event}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(item.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
