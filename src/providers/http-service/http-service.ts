import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { UserProvider } from '../user/user';

/**
 * Objeto JSON que maneja las cabeceras
 */
const httpHeaders = {
  headers : new HttpHeaders(
    {
      'Content-Type' : 'application/json',
    })
};

/**
 * Url del servidor
 */
const urlApi ="http://192.168.43.179:8080";

@Injectable()
export class HttpServiceProvider {

  constructor(public http: HttpClient, public user : UserProvider) {
  }

  /**
   * Metodo para manejar errores.
   * @param error Recibe como parametro el error que proviene de la peticion.
   */
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Maneja un error del lado del cliente o problemas de red
      console.error('An error occurred:', error.error.message);
    } else {
      // El Back-End devolvera un codigo de error
      // El body de respuesta puede manejar dichos errores
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Retorna un observable con un mensaje de error.
    return ('Something bad happened; please try again later.');
  }

  /**
   * Metodo de enviar la peticion para registrar un usuario
   * @param body Recibe como parametro un Objeto JSON con la data que va a la BD
   * @returns Observable con la respuesta del servidor
   */
  postSignUp(body) : Observable<any> {
    const url = `${urlApi}/SignUp`;
    return this.http.post(url,body,httpHeaders)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Metodo de enviar la peticion para iniciar sesion
   * @param body Recibe como parametro un Objeto JSON con la data que va a la BD
   * @returns Observable con la respuesta del servidor
   */
  login(body) : Observable<any> {
    const url = `${urlApi}/Login`;
    return this.http.post(url,body,httpHeaders)
    .pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Metodo de enviar la peticion para cerrar sesion
   * @returns Observable con la respuesta del servidor
   */
  logout() : Observable<any> {
    const url = `${urlApi}/Logout`;
    return this.http.get(url,httpHeaders)
    .pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Metodo de enviar la peticion para crear una nota
   * @param body Recibe como parametro un Objeto JSON con la data que va a la BD
   * @returns Observable con la respuesta del servidor
   */
  createNote(body) : Observable<any> {
    const url = `${urlApi}/CRUDNote`;
    return this.http.post(url,body,httpHeaders)
    .pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Metodo de enviar la peticion para obtener las notas de un usuario
   * @returns Observable con la respuesta del servidor
   */
  getNote() : Observable<any> {
    const url = `${urlApi}/CRUDNote?user_id=${this.user.id[0]}`;
    console.log(url);
    return this.http.get(url,httpHeaders)
    .pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Metodo de enviar la peticion para eliminar una nota
   * @param body Recibe como parametro un Objeto JSON con la data que va a la BD
   * @returns Observable con la respuesta del servidor
   */
  deleteNote(body) : Observable<any> {
    const url = `${urlApi}/CRUDNote?note_id=${body}`;
    return this.http.delete(url,httpHeaders)
    .pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Metodo de enviar la peticion para actualizar una nota
   * @param body Recibe como parametro un Objeto JSON con la data que va a la BD
   * @returns Observable con la respuesta del servidor
   */
  updateNote(body) : Observable<any> {
    const url = `${urlApi}/CRUDNote`;
    return this.http.put(url,body,httpHeaders)
    .pipe(
      catchError(this.handleError)
    );
  }
}
