import { UrlWithParsedQuery, parse } from "url";
import {CustomError} from './CustomError'


export class Utils {


    public static parseUrl(url: string): UrlWithParsedQuery {
        if (!url) {
            throw new CustomError({
                statusCode:404,
                statusText:"error"
            });

        }
        return parse(url, true);
    }


    public static toUpperCase(arg: string): string {
        return arg.toUpperCase();
    }
}