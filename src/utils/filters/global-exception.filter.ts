import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Request, Response } from 'express';
import { TypeORMError } from "typeorm";

@Catch(HttpException, TypeORMError)
export class HttpExceptionFilter implements ExceptionFilter {

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();    
    const status = (typeof exception.getStatus === 'function') ? exception.getStatus() : 500;
    console.log(exception)

    response
      .status(status)
      .json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message: this.generateErrorMessage(status, exception)
      });
  }

  generateErrorMessage(status: number, exception) {       
    if (exception.response) {
      if (exception.response.message) {
        return exception.response.message;
      } else if (exception.response.errors) {        
        return this.concatenateErrorResponses(exception.response.errors);
      }
    }

    return this.setDefaultMessage(status);
  }

  concatenateErrorResponses(errors) {
    return this.collectErrorStrings(errors).join('. ');
  }

  collectErrorStrings(errors: any[]) {
    let stringsArray: string[] = [];
    const valueList = Object.values(errors);

    valueList.forEach(error => {      
      if (typeof error === 'object') {
        stringsArray = stringsArray.concat(this.collectErrorStrings(error)); 
      } else {
        return stringsArray.push(error);
      }
    })

    return stringsArray;
  }

  setDefaultMessage(status: number) {
    switch (status) {
      case 400: {
        return 'La consulta recibida fue considerada invalida.';
      }
      case 401: {
        return 'Autenticación no reconocida.';
      }
      case 403: {
        return 'No posee los permisos necesarios para ingresar.';
      }
      case 404: {
        return 'No se encontró el recurso solicitado.';
      }
      case 422: {
        return 'Los parámetros recibidos no se pudieron procesar.';
      }
      case 500: {
        return 'La petición no se pudo procesar en el servidor.';
      }
      case 503: {
        return 'El servidor no está listo para manejar esta consulta.';
      }
      default: {
        return 'Se encontraron errores no detallados en la petición.';
      }
    }
  }
}