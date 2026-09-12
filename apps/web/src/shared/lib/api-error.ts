export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export async function toApiError(response: Response) {
  let message = response.statusText;
  try {
    const body = (await response.json()) as { message?: string | string[] };
    if (Array.isArray(body.message)) message = body.message.join('. ');
    else if (body.message) message = body.message;
  } catch {
    // The API always answers JSON, but a proxy or a network error may not.
  }
  return new ApiError(response.status, message);
}
