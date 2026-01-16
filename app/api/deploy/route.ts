import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // Check if Vercel deploy hook is configured
    const deployHookUrl = process.env.VERCEL_DEPLOY_HOOK;

    if (!deployHookUrl) {
      return NextResponse.json(
        { 
          error: 'Deploy hook not configured',
          message: 'Please add VERCEL_DEPLOY_HOOK to your environment variables'
        },
        { status: 500 }
      );
    }

    // Trigger Vercel deployment
    const response = await fetch(deployHookUrl, {
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error('Failed to trigger deployment');
    }

    const data = await response.json();

    return NextResponse.json({
      success: true,
      message: 'Deployment triggered successfully',
      url: 'https://vercel.com/dashboard',
      job: data.job || null,
    });
  } catch (error: any) {
    console.error('Deploy error:', error);
    return NextResponse.json(
      { 
        error: 'Deployment failed',
        message: error.message || 'An unknown error occurred'
      },
      { status: 500 }
    );
  }
}
