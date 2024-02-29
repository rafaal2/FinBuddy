package com.Fwp.financeWebApi.model;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serial;
import java.io.Serializable;
import java.util.Date;

@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Entity
@ToString
@Table(name = "User")

public class User implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;
    @Column(name = "name", nullable = false, length = 200)
    private String name;
    @Column(name = "balance", nullable = false, length = 80)
    private double balance;
    @Column(name = "Month_balance", nullable = false, length = 80)
    private double monthBalance;
}