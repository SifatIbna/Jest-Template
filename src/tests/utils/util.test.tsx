import * as CustomError from "../../utils/CustomError";
import { Utils } from "../../utils/url";

//Consts
const parsedUrl = Utils.parseUrl("http://localhost:8080/login?username=nestgo");

jest.mock("../../utils/CustomError")

describe("Utils test suite", () => {
  describe("Utils", () => {
    test("first test", () => {
      const result = Utils.toUpperCase("abc");
      expect(result).toBe("ABC");
    });
    it.each([
      [parsedUrl.href,'http://localhost:8080/login?username=nestgo'],
      [parsedUrl.port,'8080'],
      [parsedUrl.protocol,"http:"],
      [parsedUrl.query,{
        username: "nestgo",
      }]
    ])("given an url,returns the property (%p) of url",(check,expected)=>{
      if( typeof expected === 'object'){
        expect(check).toEqual(expected)
      }
      else{
        expect(check).toBe(expected)
      }
    })

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

    it("given invalid url throws custom error, sets the proper data", () => {
      const customErrorMock = jest
        .spyOn(CustomError.CustomError.prototype, "setData")
        .mockImplementation(() => {});
      const mockData = {
        statusCode: 303,
        statusText: "text",
      }

      const errorObj = new CustomError.CustomError(mockData);

      errorObj.setData(mockData);
      expect(customErrorMock).toHaveBeenCalled();
    });
  });
});
