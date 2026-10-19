import { NextResponse } from "next/server";

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  statusCode: number;
}

export function apiSuccess<T>(data: T, status = 200, headers?: HeadersInit): NextResponse {
  return NextResponse.json(data, {
    status,
    headers,
  });
}

export function apiError(message: string, status = 500, headers?: HeadersInit): NextResponse {
  return NextResponse.json(
    { error: message, success: false },
    { status, headers }
  );
}

export function apiUnauthorized(message = "Unauthorized"): NextResponse {
  return apiError(message, 401);
}

export function apiForbidden(message = "Forbidden"): NextResponse {
  return apiError(message, 403);
}

export function apiNotFound(message = "Resource not found"): NextResponse {
  return apiError(message, 404);
}

export function apiBadRequest(message = "Invalid request"): NextResponse {
  return apiError(message, 400);
}

export function apiRateLimited(message = "Too many requests. Please try again later.", retryAfterSeconds = 900): NextResponse {
  return NextResponse.json(
    { error: message, success: false },
    {
      status: 429,
      headers: { "Retry-After": String(retryAfterSeconds) },
    }
  );
}
