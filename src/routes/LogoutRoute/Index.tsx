import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function LogoutRoute() {
  const navigate = useNavigate();

  useEffect(() => {
    // Remove o token de autenticação
    localStorage.removeItem("authToken");

    // Redireciona o usuário para a página de login
    navigate("/login");
  }, [navigate]);

  // Retorna vazio pois não há conteúdo a ser renderizado
  return null;
}
