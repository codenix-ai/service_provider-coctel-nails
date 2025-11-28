import { NextResponse } from 'next/server';

/**
 * API Route to fetch restaurant configuration
 * GET /api/config
 *
 * In production, this would fetch from a database or external CMS
 * For now, it returns the JSON file
 */

/**
 * API Route to update restaurant configuration
 * PUT /api/config
 *
 * This would be protected and only accessible to admins
 */
export async function PUT(request: Request) {
  try {
    const body = await request.json();

    // TODO: Add authentication/authorization
    // TODO: Validate the configuration against schema
    // TODO: Save to database/CMS
    // Example:
    // await prisma.restaurantConfig.update({
    //   where: { id: 1 },
    //   data: body
    // });

    return NextResponse.json({ success: true, config: body });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update configuration' }, { status: 500 });
  }
}
