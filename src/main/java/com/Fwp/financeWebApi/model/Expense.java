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
@Table(name = "Expense")

public class Expense implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "name", nullable = false, length = 200)
    private String name;
    @Column(name = "price", nullable = false, length = 80)
    private double price;
    @Column( length = 80)
    private Date date;
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User userId;
}
