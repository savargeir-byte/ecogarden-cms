import { Suspense } from "react";
import LoginClient from "./LoginClient";

export const dynamic = 'force-dynamic';

export default function Login() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 animate-pulse">
            🌱
          </div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <LoginClient />
    </Suspense>
  );
}
