import { DomainError } from "../../domain/errors";
import { created, handleRequestError, ok } from "./http.helper";

describe("HttpHelper unit tests", () => {
  describe("HandleRequestError", () => {
    it("should return expected result to domainError when called", () => {
      // Act
      const result = handleRequestError(
        new DomainError("The name must be valid")
      );

      // Assert
      expect(result.statusCode).toBe(401);
      expect(result.body).toBe("The name must be valid");
    });

    it("should return generic result to generic error when called", () => {
      // Act
      const result = handleRequestError(new Error("Generic message error"));

      // Assert
      expect(result.statusCode).toBe(500);
      expect(result.body).toBe("Generic message error");
    });

    it("should return server error to unexpected error when called", () => {
        // Act
        const result = handleRequestError(undefined);
  
        // Assert
        expect(result.statusCode).toBe(500);
        expect(result.body).toBe("Server error");
      });
  });

  describe("ok helper", () => {
    it("should return expected result to ok call", () => {
      // Act
      const result = ok({
        message: "success",
      });

      // Assert
      expect(result.statusCode).toBe(200);
      expect(result.body).toStrictEqual({
        message: "success",
      });
    });
  });

  describe("ok helper", () => {
    it("should return expected result to created call", () => {
      // Act
      const result = created({
        message: "created",
      });

      // Assert
      expect(result.statusCode).toBe(201);
      expect(result.body).toStrictEqual({
        message: "created",
      });
    });
  });
});
