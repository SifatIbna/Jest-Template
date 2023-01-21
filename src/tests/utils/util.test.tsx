import * as CustomError from '../../utils/CustomError';
import { Utils } from '../../utils/url'

// const foo = {CustomError}

// jest.mock('../../utils/CustomError',()=>{
//     // return {
//     //     CustomError: return jest.fn().mockImplementation(()=>{
//     //         // return {
//     //         //     mockConstructor: jest.fn(),
//     //         //     getData : ()=>{
//     //         //         return {
//     //         //             "status":404,
//     //         //             "statusText":"hello world"
//     //         //         }
//     //         //     }
//     //         // }
//     //         return jest.fn()
//     //     })
//     // }
//     return jest.fn().mockImplementation(()=>{
//         return {getData : jest.fn()}
//     })
// })



//

describe('Utils test suite', () => {

    test('first test', () => {
        const result = Utils.toUpperCase('abc');
        expect(result).toBe('ABC');
    });

    test('parse simple URL', () => {
        const parsedUrl = Utils.parseUrl('http://localhost:8080/login');
        expect(parsedUrl.href).toBe('http://localhost:8080/login');
        expect(parsedUrl.port).toBe('8080');
        expect(parsedUrl.protocol).toBe('http:');
        expect(parsedUrl.query).toEqual({});
    });

    test('parse URL with query', () => {
        const parsedUrl = Utils.parseUrl('http://localhost:8080/login?user=user&password=pass');
        const expectedQuery = {
            user: 'user',
            password: 'pass'
        }
        expect(parsedUrl.query).toEqual(expectedQuery);
        expect(expectedQuery).toBe(expectedQuery);
    })

    test('test invalid URL', () => {
        function expectError() {
            Utils.parseUrl('')
        }
        expect(expectError).toThrow();
    });

    test.skip('test invalid URL with arrow function', () => {
        expect(() => {
            Utils.parseUrl('')
        }).toThrow('Empty url');
    });

    test('test invalid URL with try catch', () => {
        // jest.spyOn(foo,'CustomError')
        try {
            Utils.parseUrl('');
        } catch (error) {
            console.log(error)
            expect(error).toBeInstanceOf(CustomError.CustomError)
            // expect(CustomError.CustomError).toHaveBeenCalled();
        }
    });

    test("checking constructor",()=>{
        const customErrorConstructorMock = jest.spyOn(CustomError,'CustomError')
        const testData = {
            statusCode:404,
            statusText:"heeloo"
        }

        new CustomError.CustomError(testData)
        expect(customErrorConstructorMock).toHaveBeenCalledWith(testData)
    })

    test('another test',()=>{

        const customErrorMock = jest.spyOn(CustomError.CustomError.prototype,'getData').mockImplementation(()=>{return{
            statusCode:404,
            statusText:"return"
        }})

        const errorObj = new CustomError.CustomError({
            statusCode:303,
            statusText:"text"
        })

        errorObj.getData()
        expect(customErrorMock).toHaveBeenCalled();
    })
});