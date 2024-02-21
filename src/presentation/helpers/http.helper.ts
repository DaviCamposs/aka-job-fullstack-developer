import { DomainError, InvalidCredentialsError } from "../../domain/errors";
import { IHttpResponse } from "../protocols";

export const handleRequestError = (error: unknown): IHttpResponse => {
  try {
    const message = error instanceof Error ? error.message : "Server error";
    let statusCode = 500;

    if (error instanceof DomainError) {
      statusCode = 400;
    }

    if (error instanceof InvalidCredentialsError) {
      statusCode = 401;
    }

    return { statusCode, body: message };
  } catch (error) {
    return { statusCode: 500, body: "Server Error" };
  }
};

export const ok = (data?: unknown): IHttpResponse => ({
  statusCode: 200,
  body: data,
});

export const created = (
  data: Record<string, unknown> | Record<string, unknown>[]
): IHttpResponse => ({
  statusCode: 201,
  body: data,
});

