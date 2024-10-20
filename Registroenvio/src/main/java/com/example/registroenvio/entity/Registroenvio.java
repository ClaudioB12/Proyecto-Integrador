package com.example.registroenvio.entity;


import com.example.registroenvio.dto.ClienteDto;
import com.example.registroenvio.dto.VehiculoDto;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
public class Registroenvio  {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String titulo;
    private String descripcion;
    private LocalDateTime fecha;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "registro_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    public List<RegistroDetalle> detalles;

    private Integer VehiculoId;
    @Transient
    private VehiculoDto vehiculoDto;

    private Integer ClienteId;
    @Transient
    private ClienteDto clienteDto;

}