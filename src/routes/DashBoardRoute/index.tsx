"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Layers, CheckSquare, Eye, Beaker } from "lucide-react";
import { Link } from "react-router-dom";

export function DashboardRoute() {
  const routes = [
    { name: "Separar", path: "/separar", icon: Layers },
    { name: "Conferir", path: "/conferir", icon: CheckSquare },
    { name: "Visualizar", path: "/show", icon: Eye },
    { name: "Teste", path: "/teste", icon: Beaker },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl sm:text-3xl font-bold text-center">
            Sistema de Gerenciamento
          </CardTitle>
          <CardDescription className="text-center">
            Selecione uma opção para continuar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {routes.map((route) => (
              <Link
                to={route.path}
                className="h-24 text-lg justify-start space-x-4"
              >
                <Button
                  key={route.path}
                  variant="outline"
                  className="h-full w-full"
                >
                  <route.icon className="w-6 h-6" />
                  <span>{route.name}</span>
                </Button>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
