package com.squadly.Entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.util.Objects;

@Entity
@Table(name="sport")
@Getter
@Setter
public class Sport  implements java.io.Serializable {
    @Id
    @Enumerated
    private Sport name;

    public Sport() {
    }

    public Sport(Sport name) {
       this.name = name;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Sport sport = (Sport) o;
        return Objects.equals(name, sport.name);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(name);
    }
}


