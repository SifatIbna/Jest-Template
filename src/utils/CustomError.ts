interface CustomErrorProps {
    statusCode: number;
    statusText: string;
  }

  export class CustomError extends Error {
    private data: CustomErrorProps;
    constructor(data: CustomErrorProps, ...params:any) {
      super(...params);

      // if (Error.captureStackTrace) {
      //   Error.captureStackTrace(this, CustomError);
      // }

      this.name = "CustomError";
      this.data = data;
      Object.setPrototypeOf(this, CustomError.prototype);
    }

    public getData(){
      return this.data
    }

    public setData(data:CustomErrorProps){
      this.data = data
    }
  }
