'use client';

import AdminLayout from '@/components/admin/AdminLayout';
import { useState } from 'react';

export default function DeployPage() {
  const [deploying, setDeploying] = useState(false);
  const [deployStatus, setDeployStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [deployUrl, setDeployUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleDeploy() {
    setDeploying(true);
    setDeployStatus('idle');
    setErrorMessage('');

    try {
      // Trigger Vercel deployment via webhook or API
      const response = await fetch('/api/deploy', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Deployment failed');
      }

      const data = await response.json();
      setDeployUrl(data.url || 'https://vercel.com/dashboard');
      setDeployStatus('success');
    } catch (error: any) {
      console.error('Deploy error:', error);
      setErrorMessage(error.message || 'Failed to trigger deployment');
      setDeployStatus('error');
    } finally {
      setDeploying(false);
    }
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-3xl">🚀</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Deploy to Production</h1>
              <p className="text-gray-600 mt-1">Deploy your latest changes to Vercel</p>
            </div>
          </div>

          {/* Current Status */}
          <div className="mb-8 p-6 bg-gray-50 rounded-lg">
            <h2 className="text-lg font-semibold mb-4 text-gray-900">Deployment Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Environment:</span>
                <span className="font-semibold text-gray-900">Production</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Platform:</span>
                <span className="font-semibold text-gray-900">Vercel</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Branch:</span>
                <span className="font-semibold text-gray-900">main</span>
              </div>
            </div>
          </div>

          {/* Deploy Instructions */}
          <div className="mb-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 text-blue-900">📋 Deployment Steps</h3>
            <ol className="space-y-2 text-sm text-blue-800">
              <li><strong>1.</strong> Commit all your changes to Git</li>
              <li><strong>2.</strong> Push to your main/master branch</li>
              <li><strong>3.</strong> Vercel will automatically deploy</li>
              <li><strong>4.</strong> Or use the button below to trigger manual deployment</li>
            </ol>
          </div>

          {/* Deploy Button */}
          <div className="space-y-4">
            <button
              onClick={handleDeploy}
              disabled={deploying}
              className={`w-full py-4 px-6 rounded-lg font-semibold text-white text-lg transition-all ${
                deploying
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl'
              }`}
            >
              {deploying ? (
                <span className="flex items-center justify-center gap-3">
                  <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Deploying...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-3">
                  🚀 Deploy Now
                </span>
              )}
            </button>

            {/* Status Messages */}
            {deployStatus === 'success' && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">✅</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-900">Deployment Triggered Successfully!</p>
                    <p className="text-sm text-green-700 mt-1">
                      Your site is being deployed. This usually takes 1-2 minutes.
                    </p>
                  </div>
                </div>
                {deployUrl && (
                  <a
                    href={deployUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-medium"
                  >
                    View Deployment Status →
                  </a>
                )}
              </div>
            )}

            {deployStatus === 'error' && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">❌</span>
                  <div>
                    <p className="font-semibold text-red-900">Deployment Failed</p>
                    <p className="text-sm text-red-700 mt-1">{errorMessage}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Manual Deploy Instructions */}
          <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="font-semibold mb-3 text-gray-900">💡 Manual Deployment via Git</h3>
            <div className="space-y-2 text-sm text-gray-700">
              <p>Run these commands in your terminal:</p>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto mt-3">
{`git add .
git commit -m "Deploy latest changes"
git push origin main`}
              </pre>
              <p className="mt-3 text-xs text-gray-600">
                Vercel will automatically detect the push and start deployment.
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href="https://vercel.com/dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-lg hover:shadow-md transition text-center"
            >
              <span className="text-2xl mb-2 block">📊</span>
              <span className="font-semibold text-gray-900">Vercel Dashboard</span>
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-lg hover:shadow-md transition text-center"
            >
              <span className="text-2xl mb-2 block">💻</span>
              <span className="font-semibold text-gray-900">GitHub Repository</span>
            </a>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
