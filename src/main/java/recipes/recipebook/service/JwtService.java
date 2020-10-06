package recipes.recipebook.service;

import recipes.recipebook.dto.JwtRequest;
import recipes.recipebook.dto.JwtResponse;

public interface JwtService {
    void authenticate(String username, String password) throws Exception;
    JwtResponse createAuthenticationToken(JwtRequest request) throws Exception;
}
