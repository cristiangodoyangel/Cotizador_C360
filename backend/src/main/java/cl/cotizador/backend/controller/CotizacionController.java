package cl.cotizador.backend.controller;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/cotizacion")
@CrossOrigin(origins = "*") 
public class CotizacionController {
    public CotizacionController() {
        System.out.println("✅ CotizacionController cargado");
    }
    
    public record Seccion(String nombre, int precio) {}
    public record CotizacionRequest(List<Seccion> seleccionadas, int total) {}

    @PostMapping
    public String recibirCotizacion(@RequestBody CotizacionRequest cotizacion) {
        System.out.println("📥 Cotización recibida:");
        cotizacion.seleccionadas().forEach(s ->
            System.out.printf("• %s - $%d%n", s.nombre(), s.precio())
        );
        System.out.println("💰 Total: $" + cotizacion.total());
        return "Cotización recibida correctamente.";
    }
}
