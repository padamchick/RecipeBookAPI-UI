package recipes.recipebook.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class RestExceptionHandler {


    @ExceptionHandler
    public ResponseEntity<ErrorResponse> handleException(EntityNotFoundException ex) {
        ErrorResponse error = new ErrorResponse();
        error.setStatus(HttpStatus.NOT_FOUND.value());
        error.setMessage(ex.getMessage());
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }

//    @ExceptionHandler
//    public ResponseEntity<CustomResponse> handleException(Exception ex) {
//        CustomResponse error = new CustomResponse();
//        error.setStatus(HttpStatus.BAD_REQUEST.value());
//        error.setMessage(ex.getMessage());
//        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
//    }
}
