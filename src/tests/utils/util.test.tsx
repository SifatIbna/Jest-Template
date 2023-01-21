import * as CustomError from "../../utils/CustomError";
import { Utils } from "../../utils/url";

//Consts
const parsedUrl = Utils.parseUrl("http://localhost:8080/login?username=nestgo");

describe("Utils test suite", () => {
  describe("Utils", () => {
    test("first test", () => {
      const result = Utils.toUpperCase("abc");
      expect(result).toBe("ABC");
    });

    it("given an url,retruns the href", () => {
      const href = parsedUrl.href;
      const expectedHref = "http://localhost:8080/login?username=nestgo";

      expect(href).toBe(expectedHref);
    });

    it("given a url, return the port", () => {
      const port = parsedUrl.port;
      expect(parsedUrl.port).toBe("8080");
    });

    it("given a url, return the protocol", () => {
      const protocol = parsedUrl.protocol;
      expect(parsedUrl.protocol).toBe("http:");
    });

    it("given a url, return the query", () => {
      const query = parsedUrl.query;
      const expectedObj = {
        username: "nestgo",
      };
      expect(query).toEqual(expectedObj); // deep equality
    });

    it("given an url, thorws error", () => {
      function expectError() {
        Utils.parseUrl("");
      }
      expect(expectError).toThrow();
    });

    it.skip("test invalid URL with arrow function", () => {
      expect(() => {
        Utils.parseUrl("");
      }).toThrow("Empty url");
    });

    it("given an url, throws Custom Error", () => {
      try {
        Utils.parseUrl("");
      } catch (error) {
        console.log(error);
        expect(error).toBeInstanceOf(CustomError.CustomError);
      }
    });
  });
  describe("CustomError", () => {
    it("given invalid url, throws custom error with proper parameters", () => {
      const customErrorConstructorMock = jest.spyOn(CustomError, "CustomError");
      const testData = {
        statusCode: 404,
        statusText: "heeloo",
      };

      new CustomError.CustomError(testData);
      expect(customErrorConstructorMock).toHaveBeenCalledWith(testData);
    });

    it("given invalid url throws custom error, gets the proper data from getData method", () => {
      const customErrorMock = jest
        .spyOn(CustomError.CustomError.prototype, "getData")
        .mockImplementation(() => {
          return {
            statusCode: 404,
            statusText: "return",
          };
        });

      const errorObj = new CustomError.CustomError({
        statusCode: 303,
        statusText: "text",
      });

      errorObj.getData();
      expect(customErrorMock).toHaveBeenCalled();
    });
  });
});
